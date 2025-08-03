export interface RoomValidationResult {
  canJoin: boolean;
  reason?: 'room-full' | 'room-inactive' | 'invalid-invite' | 'premium-required';
  message?: string;
}

export interface RoomJoinData {
  roomId: string;
  userId: string;
  inviteToken?: string;
}

export interface LiveRoomData {
  id: string;
  name: string;
  host: string;
  hostId: string;
  status: 'live' | 'scheduled' | 'ended';
  currentParticipants: number;
  maxParticipants: number;
  privacy: 'public' | 'invite-only';
  isPremium: boolean;
  theme: string;
  duration: number; // in minutes
  startTime: Date;
  participants: RoomParticipant[];
  chatEnabled: boolean;
  audioEnabled: boolean;
  videoEnabled: boolean;
  hostPermissions: HostPermissions;
}

export interface RoomParticipant {
  id: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
  isMuted: boolean;
  isHost: boolean;
  isActive: boolean;
}

export interface HostPermissions {
  canMute: boolean;
  canRemove: boolean;
  canEndRoom: boolean;
  canInvite: boolean;
  canModifySettings: boolean;
}

class RoomValidationService {
  /**
   * Pre-validation check before joining a room
   */
  async validateRoomJoin(roomData: LiveRoomData, userId: string, inviteToken?: string): Promise<RoomValidationResult> {
    // Check if room is live
    if (roomData.status !== 'live') {
      return {
        canJoin: false,
        reason: 'room-inactive',
        message: 'This room is no longer active.'
      };
    }

    // Check if room is full
    if (roomData.currentParticipants >= roomData.maxParticipants) {
      return {
        canJoin: false,
        reason: 'room-full',
        message: 'Room is full. Please try another.'
      };
    }

    // Check privacy and invite validation
    if (roomData.privacy === 'invite-only') {
      const hasValidInvite = await this.validateInviteToken(roomData.id, inviteToken);
      if (!hasValidInvite) {
        return {
          canJoin: false,
          reason: 'invalid-invite',
          message: 'You need a valid invite to join this room.'
        };
      }
    }

    // Check premium requirement
    if (roomData.isPremium) {
      const hasPremium = await this.checkPremiumMembership(userId);
      if (!hasPremium) {
        return {
          canJoin: false,
          reason: 'premium-required',
          message: 'This is a Premium Circle. Upgrade to join.'
        };
      }
    }

    return { canJoin: true };
  }

  /**
   * Validate invite token for private rooms
   */
  private async validateInviteToken(roomId: string, token?: string): Promise<boolean> {
    if (!token) return false;
    
    // In a real implementation, this would validate against your backend
    // For now, we'll simulate validation
    return token.length > 10; // Simple validation
  }

  /**
   * Check if user has premium membership
   */
  private async checkPremiumMembership(userId: string): Promise<boolean> {
    // In a real implementation, this would check user's subscription status
    // For now, we'll simulate based on user ID
    return userId.includes('premium'); // Simple check
  }

  /**
   * Add user to room participants
   */
  async joinRoom(roomData: LiveRoomData, userId: string): Promise<{ success: boolean; updatedRoom?: LiveRoomData }> {
    try {
      // Create new participant
      const newParticipant: RoomParticipant = {
        id: userId,
        name: `User ${userId.slice(-4)}`, // In real app, get from user profile
        joinedAt: new Date(),
        isMuted: false,
        isHost: false,
        isActive: true
      };

      // Update room data
      const updatedRoom: LiveRoomData = {
        ...roomData,
        currentParticipants: roomData.currentParticipants + 1,
        participants: [...roomData.participants, newParticipant]
      };

      // In a real implementation, this would update the database
      await this.updateRoomInDatabase(updatedRoom);

      return { success: true, updatedRoom };
    } catch (error) {
      console.error('Failed to join room:', error);
      return { success: false };
    }
  }

  /**
   * Remove user from room
   */
  async leaveRoom(roomData: LiveRoomData, userId: string): Promise<{ success: boolean; updatedRoom?: LiveRoomData }> {
    try {
      const updatedRoom: LiveRoomData = {
        ...roomData,
        currentParticipants: Math.max(0, roomData.currentParticipants - 1),
        participants: roomData.participants.filter(p => p.id !== userId)
      };

      // If host leaves and there are other participants, transfer host
      if (roomData.hostId === userId && updatedRoom.participants.length > 0) {
        const newHost = updatedRoom.participants[0];
        newHost.isHost = true;
        updatedRoom.hostId = newHost.id;
        updatedRoom.host = newHost.name;
      }

      await this.updateRoomInDatabase(updatedRoom);
      return { success: true, updatedRoom };
    } catch (error) {
      console.error('Failed to leave room:', error);
      return { success: false };
    }
  }

  private async updateRoomInDatabase(roomData: LiveRoomData): Promise<void> {
    // Simulate database update
    console.log('Updating room in database:', roomData.id);
  }
}

export const roomValidationService = new RoomValidationService();