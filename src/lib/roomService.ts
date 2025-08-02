// Room Service - Backend Logic for Room Management

export interface RoomData {
  id: string;
  hostUserID: string;
  roomName: string;
  roomType: 'support' | 'chill' | 'focus' | 'meditation';
  privacyType: 'public' | 'invite-only';
  isScheduled: boolean;
  scheduleTime?: string;
  maxParticipants: number;
  roomTheme: string;
  roomDesc: string;
  roomStatus: 'active' | 'scheduled' | 'closed';
  roomLink: string;
  createdAt: Date;
  expiresAt: Date;
  participants: string[];
  analytics: {
    totalJoins: number;
    totalDrops: number;
    averageStayTime: number;
    peakParticipants: number;
  };
}

export interface RoomPermissions {
  canMuteParticipants: boolean;
  canRemoveParticipants: boolean;
  canCloseRoom: boolean;
  canModifySettings: boolean;
}

class RoomService {
  private rooms: Map<string, RoomData> = new Map();
  private scheduledRooms: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Create a new room
   */
  async createRoom(roomData: Omit<RoomData, 'id' | 'createdAt' | 'expiresAt' | 'participants' | 'analytics'>): Promise<RoomData> {
    const id = this.generateRoomId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (90 * 60 * 1000)); // 90 minutes from now

    const room: RoomData = {
      ...roomData,
      id,
      createdAt: now,
      expiresAt,
      participants: [roomData.hostUserID],
      analytics: {
        totalJoins: 1,
        totalDrops: 0,
        averageStayTime: 0,
        peakParticipants: 1
      }
    };

    // Store room
    this.rooms.set(id, room);

    // Handle scheduling
    if (room.isScheduled && room.scheduleTime) {
      await this.scheduleRoom(room);
    } else {
      // Activate room immediately
      room.roomStatus = 'active';
      await this.activateRoom(room);
    }

    // Set auto-expiry
    setTimeout(() => {
      this.closeRoom(id, 'expired');
    }, 90 * 60 * 1000);

    // Track analytics
    this.trackRoomCreation(room);

    return room;
  }

  /**
   * Schedule a room for future activation
   */
  private async scheduleRoom(room: RoomData): Promise<void> {
    if (!room.scheduleTime) return;

    const scheduleDate = new Date(room.scheduleTime);
    const now = new Date();
    const delay = scheduleDate.getTime() - now.getTime();

    if (delay > 0) {
      // Schedule room activation
      const timeoutId = setTimeout(async () => {
        room.roomStatus = 'active';
        await this.activateRoom(room);
        
        // Send notifications 10 minutes before
        setTimeout(() => {
          this.sendRoomNotifications(room, 'starting-soon');
        }, Math.max(0, delay - (10 * 60 * 1000)));
        
        this.scheduledRooms.delete(room.id);
      }, delay);

      this.scheduledRooms.set(room.id, timeoutId);
    }
  }

  /**
   * Activate a room (make it live)
   */
  private async activateRoom(room: RoomData): Promise<void> {
    // Initialize real-time room infrastructure
    await this.initializeVideoAudioRoom(room);
    
    // Add to active rooms registry
    this.addToActiveRooms(room);
    
    // Send activation notifications
    await this.sendRoomNotifications(room, 'activated');
  }

  /**
   * Join a room
   */
  async joinRoom(roomId: string, userId: string): Promise<{ success: boolean; room?: RoomData; error?: string }> {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.roomStatus !== 'active') {
      return { success: false, error: 'Room is not active' };
    }

    if (room.participants.length >= room.maxParticipants) {
      return { success: false, error: 'Room is full' };
    }

    if (room.privacyType === 'invite-only' && !await this.validateInvite(roomId, userId)) {
      return { success: false, error: 'Invalid invite or room is invite-only' };
    }

    // Add participant
    room.participants.push(userId);
    room.analytics.totalJoins++;
    room.analytics.peakParticipants = Math.max(room.analytics.peakParticipants, room.participants.length);

    // Update room
    this.rooms.set(roomId, room);

    // Track join event
    this.trackParticipantJoin(room, userId);

    return { success: true, room };
  }

  /**
   * Leave a room
   */
  async leaveRoom(roomId: string, userId: string): Promise<{ success: boolean }> {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return { success: false };
    }

    // Remove participant
    room.participants = room.participants.filter(id => id !== userId);
    room.analytics.totalDrops++;

    // If host leaves, transfer host or close room
    if (room.hostUserID === userId) {
      if (room.participants.length > 0) {
        room.hostUserID = room.participants[0]; // Transfer to first participant
        await this.notifyHostTransfer(room);
      } else {
        await this.closeRoom(roomId, 'host-left');
        return { success: true };
      }
    }

    // Update room
    this.rooms.set(roomId, room);

    // Track leave event
    this.trackParticipantLeave(room, userId);

    return { success: true };
  }

  /**
   * Host controls - Mute participant
   */
  async muteParticipant(roomId: string, hostId: string, participantId: string): Promise<{ success: boolean }> {
    const room = this.rooms.get(roomId);
    
    if (!room || room.hostUserID !== hostId) {
      return { success: false };
    }

    // Implement mute logic via WebRTC/video service
    await this.sendMuteCommand(roomId, participantId);
    
    // Track moderation action
    this.trackModerationAction(room, hostId, 'mute', participantId);

    return { success: true };
  }

  /**
   * Host controls - Remove participant
   */
  async removeParticipant(roomId: string, hostId: string, participantId: string): Promise<{ success: boolean }> {
    const room = this.rooms.get(roomId);
    
    if (!room || room.hostUserID !== hostId) {
      return { success: false };
    }

    // Remove participant
    room.participants = room.participants.filter(id => id !== participantId);
    room.analytics.totalDrops++;

    // Disconnect participant from room
    await this.disconnectParticipant(roomId, participantId);
    
    // Track moderation action
    this.trackModerationAction(room, hostId, 'remove', participantId);

    this.rooms.set(roomId, room);
    return { success: true };
  }

  /**
   * Close a room
   */
  async closeRoom(roomId: string, reason: 'host-closed' | 'expired' | 'host-left' = 'host-closed'): Promise<{ success: boolean }> {
    const room = this.rooms.get(roomId);
    
    if (!room) {
      return { success: false };
    }

    // Update room status
    room.roomStatus = 'closed';

    // Disconnect all participants
    await Promise.all(room.participants.map(participantId => 
      this.disconnectParticipant(roomId, participantId)
    ));

    // Clean up scheduled timers
    const scheduledTimer = this.scheduledRooms.get(roomId);
    if (scheduledTimer) {
      clearTimeout(scheduledTimer);
      this.scheduledRooms.delete(roomId);
    }

    // Remove from active rooms
    this.removeFromActiveRooms(roomId);

    // Send closure notifications
    await this.sendRoomNotifications(room, 'closed', reason);

    // Track room closure
    this.trackRoomClosure(room, reason);

    // Keep room data for analytics but mark as closed
    this.rooms.set(roomId, room);

    return { success: true };
  }

  /**
   * Get room analytics
   */
  getRoomAnalytics(timeframe: 'day' | 'week' | 'month' | 'all' = 'week') {
    const rooms = Array.from(this.rooms.values());
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case 'day':
        startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
        break;
      case 'week':
        startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
      case 'month':
        startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
      default:
        startDate = new Date(0);
    }

    const filteredRooms = rooms.filter(room => room.createdAt >= startDate);

    return {
      totalRoomsCreated: filteredRooms.length,
      totalParticipants: filteredRooms.reduce((sum, room) => sum + room.analytics.totalJoins, 0),
      averageEngagementTime: this.calculateAverageEngagementTime(filteredRooms),
      joinToDropRatio: this.calculateJoinToDropRatio(filteredRooms),
      popularRoomTypes: this.getPopularRoomTypes(filteredRooms),
      peakHours: this.getPeakHours(filteredRooms)
    };
  }

  // Private helper methods

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  private async validateInvite(roomId: string, userId: string): Promise<boolean> {
    // Implement invite validation logic
    // This could check a database of valid invites or use JWT tokens
    return true; // Placeholder
  }

  private async initializeVideoAudioRoom(room: RoomData): Promise<void> {
    // Initialize WebRTC room, Agora, or similar video/audio service
    console.log(`Initializing video/audio room for ${room.id}`);
  }

  private addToActiveRooms(room: RoomData): void {
    // Add room to active rooms registry for real-time updates
    console.log(`Adding room ${room.id} to active rooms`);
  }

  private removeFromActiveRooms(roomId: string): void {
    // Remove room from active rooms registry
    console.log(`Removing room ${roomId} from active rooms`);
  }

  private async sendRoomNotifications(room: RoomData, type: 'activated' | 'starting-soon' | 'closed', reason?: string): Promise<void> {
    // Send notifications via WhatsApp, Email, or push notifications
    console.log(`Sending ${type} notification for room ${room.id}`, reason);
  }

  private async notifyHostTransfer(room: RoomData): Promise<void> {
    // Notify new host about their role
    console.log(`Notifying host transfer for room ${room.id} to ${room.hostUserID}`);
  }

  private async sendMuteCommand(roomId: string, participantId: string): Promise<void> {
    // Send mute command to video/audio service
    console.log(`Muting participant ${participantId} in room ${roomId}`);
  }

  private async disconnectParticipant(roomId: string, participantId: string): Promise<void> {
    // Disconnect participant from video/audio service
    console.log(`Disconnecting participant ${participantId} from room ${roomId}`);
  }

  // Analytics tracking methods

  private trackRoomCreation(room: RoomData): void {
    // Track room creation event
    console.log(`Tracking room creation: ${room.id}`);
  }

  private trackParticipantJoin(room: RoomData, userId: string): void {
    // Track participant join event
    console.log(`Tracking participant join: ${userId} to room ${room.id}`);
  }

  private trackParticipantLeave(room: RoomData, userId: string): void {
    // Track participant leave event
    console.log(`Tracking participant leave: ${userId} from room ${room.id}`);
  }

  private trackModerationAction(room: RoomData, hostId: string, action: string, targetId: string): void {
    // Track moderation actions
    console.log(`Tracking moderation: ${hostId} ${action} ${targetId} in room ${room.id}`);
  }

  private trackRoomClosure(room: RoomData, reason: string): void {
    // Track room closure event
    console.log(`Tracking room closure: ${room.id} - ${reason}`);
  }

  private calculateAverageEngagementTime(rooms: RoomData[]): number {
    // Calculate average engagement time across rooms
    return rooms.reduce((sum, room) => sum + room.analytics.averageStayTime, 0) / rooms.length || 0;
  }

  private calculateJoinToDropRatio(rooms: RoomData[]): number {
    const totalJoins = rooms.reduce((sum, room) => sum + room.analytics.totalJoins, 0);
    const totalDrops = rooms.reduce((sum, room) => sum + room.analytics.totalDrops, 0);
    return totalJoins > 0 ? ((totalJoins - totalDrops) / totalJoins) * 100 : 0;
  }

  private getPopularRoomTypes(rooms: RoomData[]) {
    const typeCounts = rooms.reduce((acc, room) => {
      acc[room.roomType] = (acc[room.roomType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / rooms.length) * 100)
    }));
  }

  private getPeakHours(rooms: RoomData[]) {
    const hourCounts = rooms.reduce((acc, room) => {
      const hour = room.createdAt.getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), roomCount: count }))
      .sort((a, b) => b.roomCount - a.roomCount)
      .slice(0, 4);
  }
}

// Export singleton instance
export const roomService = new RoomService();