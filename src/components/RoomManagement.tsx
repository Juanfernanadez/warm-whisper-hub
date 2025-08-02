import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, 
  Clock, 
  Settings, 
  Mic, 
  MicOff, 
  UserX, 
  Shield,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Crown,
  Calendar,
  Link,
  MoreVertical
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isHost: boolean;
  joinedAt: Date;
  isActive: boolean;
}

interface RoomSession {
  id: string;
  name: string;
  type: string;
  participants: Participant[];
  maxParticipants: number;
  startTime: Date;
  duration: number; // in minutes
  isActive: boolean;
  hostControls: {
    canMuteAll: boolean;
    canRemoveParticipants: boolean;
    canCloseRoom: boolean;
  };
}

interface RoomManagementProps {
  room: RoomSession;
  isHost: boolean;
  onMuteParticipant: (participantId: string) => void;
  onRemoveParticipant: (participantId: string) => void;
  onCloseRoom: () => void;
  onLeaveRoom: () => void;
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "Sarah M. (Host)",
    isHost: true,
    isMuted: false,
    joinedAt: new Date(Date.now() - 1800000), // 30 min ago
    isActive: true
  },
  {
    id: "2", 
    name: "Alex K.",
    isHost: false,
    isMuted: false,
    joinedAt: new Date(Date.now() - 1200000), // 20 min ago
    isActive: true
  },
  {
    id: "3",
    name: "Maya L.",
    isHost: false,
    isMuted: true,
    joinedAt: new Date(Date.now() - 900000), // 15 min ago
    isActive: true
  },
  {
    id: "4",
    name: "David R.",
    isHost: false,
    isMuted: false,
    joinedAt: new Date(Date.now() - 600000), // 10 min ago
    isActive: false // Away/inactive
  }
];

export const RoomManagement = ({ 
  room, 
  isHost, 
  onMuteParticipant, 
  onRemoveParticipant, 
  onCloseRoom, 
  onLeaveRoom 
}: RoomManagementProps) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const [roomDuration, setRoomDuration] = useState(0);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);

  // Update room duration every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - room.startTime.getTime()) / 60000);
      setRoomDuration(duration);
    }, 60000);

    return () => clearInterval(interval);
  }, [room.startTime]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getParticipantStatus = (participant: Participant) => {
    if (!participant.isActive) return "away";
    if (participant.isMuted) return "muted";
    return "active";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400";
      case "muted": return "text-yellow-400";
      case "away": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  const handleParticipantAction = (participantId: string, action: 'mute' | 'remove') => {
    if (action === 'mute') {
      onMuteParticipant(participantId);
    } else if (action === 'remove') {
      onRemoveParticipant(participantId);
    }
    setSelectedParticipant(null);
  };

  return (
    <div className="space-y-4">
      {/* Room Header */}
      <Card className="card-warm backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                {room.name}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{room.participants.length}/{room.maxParticipants}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(roomDuration)}</span>
                </div>
                <Badge variant="outline" className="border-accent/30 text-accent">
                  {room.type}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowParticipants(true)}
                variant="outline"
                size="sm"
                className="btn-gentle"
              >
                <Users className="w-4 h-4 mr-1" />
                Participants
              </Button>
              
              {isHost && (
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-gentle"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Host Controls
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Participant Overview */}
      <Card className="card-warm backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Active Participants</h4>
            <span className="text-sm text-muted-foreground">
              {room.participants.filter(p => p.isActive).length} active
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {room.participants.slice(0, 6).map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/10 border border-border/20"
              >
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-accent">
                    {participant.name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground flex items-center gap-1">
                    {participant.name.split(' ')[0]}
                    {participant.isHost && <Crown className="w-3 h-3 text-accent" />}
                  </span>
                  <div className="flex items-center gap-1">
                    {participant.isMuted ? (
                      <MicOff className="w-3 h-3 text-red-400" />
                    ) : (
                      <Mic className="w-3 h-3 text-green-400" />
                    )}
                    <span className={`text-xs ${getStatusColor(getParticipantStatus(participant))}`}>
                      {getParticipantStatus(participant)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {room.participants.length > 6 && (
              <button
                onClick={() => setShowParticipants(true)}
                className="px-3 py-2 rounded-lg bg-muted/10 border border-border/20 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +{room.participants.length - 6} more
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Host Controls */}
      {isHost && (
        <Card className="card-warm backdrop-blur-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Host Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="btn-gentle justify-start"
                onClick={() => {
                  // Mute all participants
                  room.participants.forEach(p => {
                    if (!p.isHost) onMuteParticipant(p.id);
                  });
                }}
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Mute All
              </Button>
              
              <Button
                variant="outline"
                className="btn-gentle justify-start"
                onClick={() => {
                  // Unmute all participants
                  room.participants.forEach(p => {
                    if (!p.isHost && p.isMuted) onMuteParticipant(p.id);
                  });
                }}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Unmute All
              </Button>
              
              <Button
                variant="outline"
                className="btn-gentle justify-start"
              >
                <Link className="w-4 h-4 mr-2" />
                Share Invite
              </Button>
              
              <Button
                variant="destructive"
                className="justify-start"
                onClick={onCloseRoom}
              >
                <UserX className="w-4 h-4 mr-2" />
                Close Room
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Room Actions */}
      <Card className="card-warm backdrop-blur-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Room will auto-close in {90 - roomDuration} minutes
            </div>
            <Button
              onClick={onLeaveRoom}
              variant="outline"
              className="btn-gentle"
            >
              Leave Room
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Participants Modal */}
      <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
        <DialogContent className="bg-slate-900 border-border/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Room Participants ({room.participants.length})
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-4 max-h-96 overflow-y-auto">
            {room.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="font-medium text-accent">
                      {participant.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {participant.name}
                      </span>
                      {participant.isHost && (
                        <Crown className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Joined {formatDuration(Math.floor((Date.now() - participant.joinedAt.getTime()) / 60000))} ago</span>
                      <div className="flex items-center gap-1">
                        {participant.isMuted ? (
                          <MicOff className="w-3 h-3 text-red-400" />
                        ) : (
                          <Mic className="w-3 h-3 text-green-400" />
                        )}
                        <span className={getStatusColor(getParticipantStatus(participant))}>
                          {getParticipantStatus(participant)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isHost && !participant.isHost && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleParticipantAction(participant.id, 'mute')}
                      className="border-border/30"
                    >
                      {participant.isMuted ? (
                        <Mic className="w-3 h-3" />
                      ) : (
                        <MicOff className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleParticipantAction(participant.id, 'remove')}
                    >
                      <UserX className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};