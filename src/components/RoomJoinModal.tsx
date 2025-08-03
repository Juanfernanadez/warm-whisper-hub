import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Clock, 
  Shield, 
  Star, 
  AlertTriangle, 
  CheckCircle,
  Crown,
  Heart,
  MessageCircle,
  Mic,
  Video
} from "lucide-react";
import { LiveRoomData, RoomValidationResult, roomValidationService } from "@/lib/roomValidation";

interface RoomJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomData: LiveRoomData | null;
  userId: string;
  isLoggedIn: boolean;
  onJoinSuccess: (roomData: LiveRoomData) => void;
  onLoginRequired: (redirectTo: string) => void;
  onUpgradeRequired: () => void;
}

export const RoomJoinModal = ({ 
  isOpen, 
  onClose, 
  roomData, 
  userId, 
  isLoggedIn,
  onJoinSuccess,
  onLoginRequired,
  onUpgradeRequired
}: RoomJoinModalProps) => {
  const [validationResult, setValidationResult] = useState<RoomValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (isOpen && roomData && isLoggedIn) {
      validateRoom();
    }
  }, [isOpen, roomData, isLoggedIn]);

  const validateRoom = async () => {
    if (!roomData) return;
    
    setIsValidating(true);
    try {
      const result = await roomValidationService.validateRoomJoin(roomData, userId);
      setValidationResult(result);
    } catch (error) {
      console.error('Room validation failed:', error);
      setValidationResult({
        canJoin: false,
        reason: 'room-inactive',
        message: 'Unable to validate room access. Please try again.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomData || !validationResult?.canJoin) return;

    setIsJoining(true);
    try {
      const result = await roomValidationService.joinRoom(roomData, userId);
      if (result.success && result.updatedRoom) {
        onJoinSuccess(result.updatedRoom);
        onClose();
      } else {
        throw new Error('Failed to join room');
      }
    } catch (error) {
      console.error('Failed to join room:', error);
      // Show error toast or message
    } finally {
      setIsJoining(false);
    }
  };

  const handleLoginRequired = () => {
    if (roomData) {
      onLoginRequired(`/room/${roomData.id}`);
    }
  };

  const handleUpgradeRequired = () => {
    onUpgradeRequired();
    onClose();
  };

  const getRoomThemeGlow = (theme: string) => {
    const themes = {
      calm: "shadow-blue-500/20 border-blue-300/30 bg-gradient-to-br from-blue-900/20 to-blue-800/10",
      support: "shadow-green-500/20 border-green-300/30 bg-gradient-to-br from-green-900/20 to-green-800/10",
      creative: "shadow-purple-500/20 border-purple-300/30 bg-gradient-to-br from-purple-900/20 to-purple-800/10",
      focus: "shadow-orange-500/20 border-orange-300/30 bg-gradient-to-br from-orange-900/20 to-orange-800/10"
    };
    return themes[theme as keyof typeof themes] || themes.calm;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (!roomData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-border/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Join Room</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Room Preview */}
          <Card className={`${getRoomThemeGlow(roomData.theme)} border backdrop-blur-sm`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-lg">{roomData.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Shield className="w-4 h-4 text-blue-300" />
                    <span className="text-sm text-blue-200">Hosted by {roomData.host}</span>
                  </div>
                </div>
                {roomData.isPremium && (
                  <Badge className="bg-yellow-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-blue-200">
                  <Users className="w-4 h-4" />
                  <span>{roomData.currentParticipants}/{roomData.maxParticipants}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(roomData.duration)}</span>
                </div>
              </div>

              {/* Room Features */}
              <div className="flex items-center space-x-4 text-sm text-blue-300">
                {roomData.audioEnabled && (
                  <div className="flex items-center space-x-1">
                    <Mic className="w-4 h-4" />
                    <span>Audio</span>
                  </div>
                )}
                {roomData.videoEnabled && (
                  <div className="flex items-center space-x-1">
                    <Video className="w-4 h-4" />
                    <span>Video</span>
                  </div>
                )}
                {roomData.chatEnabled && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validation Status */}
          {!isLoggedIn ? (
            <Alert className="border-yellow-300/30 bg-yellow-900/20">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                Please sign in to join this room
              </AlertDescription>
            </Alert>
          ) : isValidating ? (
            <div className="text-center py-4">
              <div className="w-8 h-8 mx-auto border-2 border-blue-300/30 border-t-blue-400 rounded-full animate-spin mb-2"></div>
              <p className="text-blue-200 text-sm">Checking room availability...</p>
            </div>
          ) : validationResult ? (
            validationResult.canJoin ? (
              <Alert className="border-green-300/30 bg-green-900/20">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-200">
                  You can join this room!
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-red-300/30 bg-red-900/20">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  {validationResult.message}
                </AlertDescription>
              </Alert>
            )
          ) : null}

          {/* Current Participants Preview */}
          {roomData.participants.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-white">People in this room:</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {roomData.participants.slice(0, 5).map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-300">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">
                          {participant.name}
                        </span>
                        {participant.isHost && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {roomData.participants.length > 5 && (
                  <p className="text-xs text-blue-300 text-center">
                    +{roomData.participants.length - 5} more people
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isLoggedIn ? (
              <Button 
                onClick={handleLoginRequired}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Sign In to Join
              </Button>
            ) : validationResult?.reason === 'premium-required' ? (
              <Button 
                onClick={handleUpgradeRequired}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                <Star className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            ) : validationResult?.canJoin ? (
              <Button 
                onClick={handleJoinRoom}
                disabled={isJoining}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isJoining ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Joining...</span>
                  </div>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Join Room
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full border-gray-300/30 text-gray-200"
              >
                Close
              </Button>
            )}

            {validationResult?.reason === 'room-full' && (
              <Button 
                variant="outline"
                className="w-full border-blue-300/30 text-blue-200"
                onClick={() => {
                  // Implement notify when available
                  console.log('Notify when available');
                  onClose();
                }}
              >
                Notify Me When Available
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};