import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Bell, Heart } from "lucide-react";

interface RoomUnavailableModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: 'full' | 'ended' | 'private' | 'premium';
  roomName: string;
  onExploreRooms: () => void;
  onNotifyWhenAvailable?: () => void;
  onUpgradePremium?: () => void;
}

const reasonMessages = {
  full: {
    title: "Room is Full",
    message: "This room has reached its maximum capacity.",
    icon: "👥",
    color: "text-orange-400"
  },
  ended: {
    title: "Room Has Ended",
    message: "This conversation has concluded.",
    icon: "⏰",
    color: "text-gray-400"
  },
  private: {
    title: "Private Room",
    message: "You need an invitation to join this room.",
    icon: "🔒",
    color: "text-blue-400"
  },
  premium: {
    title: "Premium Room",
    message: "This is an exclusive Premium Circle.",
    icon: "⭐",
    color: "text-yellow-400"
  }
};

export const RoomUnavailableModal = ({
  isOpen,
  onClose,
  reason,
  roomName,
  onExploreRooms,
  onNotifyWhenAvailable,
  onUpgradePremium
}: RoomUnavailableModalProps) => {
  const reasonData = reasonMessages[reason];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-border/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Room Unavailable</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Status Card */}
          <Card className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl">{reasonData.icon}</div>
              <div>
                <h3 className={`text-lg font-semibold ${reasonData.color}`}>
                  {reasonData.title}
                </h3>
                <p className="text-blue-200 mt-1">{roomName}</p>
                <p className="text-sm text-slate-300 mt-2">
                  {reasonData.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {reason === 'premium' && onUpgradePremium && (
              <Button 
                onClick={onUpgradePremium}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                <Heart className="w-4 h-4 mr-2" />
                Unlock with Premium Pass
              </Button>
            )}

            {reason === 'full' && onNotifyWhenAvailable && (
              <Button 
                onClick={onNotifyWhenAvailable}
                variant="outline"
                className="w-full border-blue-300/30 text-blue-200"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Available
              </Button>
            )}

            <Button 
              onClick={onExploreRooms}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Explore Other Rooms
            </Button>

            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-300/30 text-gray-200"
            >
              Close
            </Button>
          </div>

          {/* Encouraging Message */}
          <div className="text-center pt-4 border-t border-slate-600/30">
            <p className="text-sm text-blue-300">
              💙 There are many other supportive spaces waiting for you
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};