import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LiveRoomInterface } from "@/components/LiveRoomInterface";
import { RoomJoinModal } from "@/components/RoomJoinModal";
import { PremiumPlansModal } from "@/components/PremiumPlansModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveRoomData } from "@/lib/roomValidation";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft } from "lucide-react";

// Mock room data - in a real app, this would come from your API
const mockRoomData: LiveRoomData = {
  id: "room-123",
  name: "Evening Reflection Circle",
  host: "Sarah M.",
  hostId: "host-123",
  status: 'live',
  currentParticipants: 4,
  maxParticipants: 8,
  privacy: 'public',
  isPremium: false,
  theme: 'calm',
  duration: 45,
  startTime: new Date(Date.now() - 1800000), // Started 30 minutes ago
  participants: [
    {
      id: "host-123",
      name: "Sarah M.",
      joinedAt: new Date(Date.now() - 1800000),
      isMuted: false,
      isHost: true,
      isActive: true
    },
    {
      id: "user-456",
      name: "Alex K.",
      joinedAt: new Date(Date.now() - 1200000),
      isMuted: false,
      isHost: false,
      isActive: true
    },
    {
      id: "user-789",
      name: "Maya L.",
      joinedAt: new Date(Date.now() - 900000),
      isMuted: true,
      isHost: false,
      isActive: true
    },
    {
      id: "user-101",
      name: "David R.",
      joinedAt: new Date(Date.now() - 600000),
      isMuted: false,
      isHost: false,
      isActive: false
    }
  ],
  chatEnabled: true,
  audioEnabled: true,
  videoEnabled: false,
  hostPermissions: {
    canMute: true,
    canRemove: true,
    canEndRoom: true,
    canInvite: true,
    canModifySettings: true
  }
};

export const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [roomData, setRoomData] = useState<LiveRoomData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [currentUserId] = useState("user-current"); // In real app, get from auth context
  const [isLoggedIn] = useState(true); // In real app, get from auth context

  useEffect(() => {
    if (roomId) {
      loadRoomData(roomId);
    }
  }, [roomId]);

  const loadRoomData = async (id: string) => {
    setIsLoading(true);
    try {
      // In a real app, fetch room data from API
      // const response = await fetch(`/api/rooms/${id}`);
      // const data = await response.json();
      
      // For demo, use mock data
      setRoomData(mockRoomData);
      
      // Check if user is already in the room
      const isParticipant = mockRoomData.participants.some(p => p.id === currentUserId);
      if (isParticipant) {
        setIsInRoom(true);
      } else {
        setShowJoinModal(true);
      }
    } catch (error) {
      console.error('Failed to load room data:', error);
      toast({
        title: "Error",
        description: "Failed to load room. Please try again.",
        variant: "destructive"
      });
      navigate('/talk-rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinSuccess = (updatedRoom: LiveRoomData) => {
    setRoomData(updatedRoom);
    setIsInRoom(true);
    setShowJoinModal(false);
    toast({
      title: "Welcome to the room! 💙",
      description: "You've successfully joined the conversation.",
    });
  };

  const handleLoginRequired = (redirectTo: string) => {
    // In a real app, redirect to login with return URL
    console.log('Redirect to login:', redirectTo);
    toast({
      title: "Sign in required",
      description: "Please sign in to join this room.",
    });
  };

  const handleUpgradeRequired = () => {
    setShowJoinModal(false);
    setShowPremiumModal(true);
  };

  const handleLeaveRoom = () => {
    setIsInRoom(false);
    navigate('/talk-rooms');
    toast({
      title: "Left room",
      description: "You've left the conversation. Take care! 🌟",
    });
  };

  const handleRoomUpdate = (updatedRoom: LiveRoomData) => {
    setRoomData(updatedRoom);
  };

  const handleSelectPlan = (planId: string) => {
    toast({
      title: "Premium activated! ✨",
      description: "You can now join premium rooms.",
    });
    setShowPremiumModal(false);
    if (roomData) {
      setShowJoinModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 flex items-center justify-center">
        <Card className="card-warm backdrop-blur-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto border-4 border-blue-300/30 border-t-blue-400 rounded-full animate-spin"></div>
            <p className="text-blue-200">Loading room...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!roomData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 flex items-center justify-center">
        <Card className="card-warm backdrop-blur-md">
          <CardContent className="p-8 text-center space-y-4">
            <Heart className="w-12 h-12 text-red-400 mx-auto" />
            <h2 className="text-xl font-semibold text-white">Room Not Found</h2>
            <p className="text-blue-200">This room may have ended or doesn't exist.</p>
            <Button 
              onClick={() => navigate('/talk-rooms')}
              className="btn-rain"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Talk Rooms
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isInRoom ? (
        <LiveRoomInterface
          roomData={roomData}
          currentUserId={currentUserId}
          onLeaveRoom={handleLeaveRoom}
          onRoomUpdate={handleRoomUpdate}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 flex items-center justify-center p-4">
          <Card className="card-warm backdrop-blur-md max-w-md">
            <CardContent className="p-8 text-center space-y-4">
              <Heart className="w-12 h-12 text-blue-400 mx-auto pulse-heart" />
              <h2 className="text-xl font-semibold text-white">Preparing to join...</h2>
              <p className="text-blue-200">We're getting everything ready for you.</p>
            </CardContent>
          </Card>
        </div>
      )}

      <RoomJoinModal
        isOpen={showJoinModal}
        onClose={() => {
          setShowJoinModal(false);
          navigate('/talk-rooms');
        }}
        roomData={roomData}
        userId={currentUserId}
        isLoggedIn={isLoggedIn}
        onJoinSuccess={handleJoinSuccess}
        onLoginRequired={handleLoginRequired}
        onUpgradeRequired={handleUpgradeRequired}
      />

      <PremiumPlansModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSelectPlan={handleSelectPlan}
      />
    </>
  );
};