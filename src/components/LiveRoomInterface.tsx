import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Clock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  MessageCircle,
  Settings,
  LogOut,
  Crown,
  Send,
  MoreVertical,
  Shield,
  UserX,
  VolumeX,
  Volume2
} from "lucide-react";
import { LiveRoomData, RoomParticipant, roomValidationService } from "@/lib/roomValidation";

interface LiveRoomInterfaceProps {
  roomData: LiveRoomData;
  currentUserId: string;
  onLeaveRoom: () => void;
  onRoomUpdate: (updatedRoom: LiveRoomData) => void;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system';
}

export const LiveRoomInterface = ({ 
  roomData, 
  currentUserId, 
  onLeaveRoom,
  onRoomUpdate 
}: LiveRoomInterfaceProps) => {
  const [roomTimer, setRoomTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isHost = roomData.hostId === currentUserId;
  const currentParticipant = roomData.participants.find(p => p.id === currentUserId);

  // Timer effect
  useEffect(() => {
    const startTime = roomData.startTime.getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - startTime) / 1000 / 60); // minutes
      setRoomTimer(elapsed);
    }, 60000);

    return () => clearInterval(interval);
  }, [roomData.startTime]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Initialize with welcome message
  useEffect(() => {
    setChatMessages([
      {
        id: '1',
        userId: 'system',
        userName: 'System',
        message: `Welcome to ${roomData.name}! Please be kind and respectful to everyone.`,
        timestamp: new Date(),
        type: 'system'
      }
    ]);
  }, [roomData.name]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: currentParticipant?.name || 'You',
      message: chatMessage.trim(),
      timestamp: new Date(),
      type: 'message'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
  };

  const handleLeaveRoom = async () => {
    const result = await roomValidationService.leaveRoom(roomData, currentUserId);
    if (result.success) {
      onLeaveRoom();
    }
  };

  const handleMuteParticipant = async (participantId: string) => {
    if (!isHost) return;
    
    // Implement mute logic
    console.log(`Muting participant: ${participantId}`);
    setSelectedParticipant(null);
  };

  const handleRemoveParticipant = async (participantId: string) => {
    if (!isHost) return;
    
    // Implement remove logic
    console.log(`Removing participant: ${participantId}`);
    setSelectedParticipant(null);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')}` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Room Header */}
        <Card className="card-warm backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <CardTitle className="text-lg text-foreground">{roomData.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>{roomData.host}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(roomTimer)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{roomData.currentParticipants}/{roomData.maxParticipants}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowParticipants(!showParticipants)}
                  variant="outline"
                  size="sm"
                  className="btn-gentle"
                >
                  <Users className="w-4 h-4" />
                </Button>
                
                {isHost && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="btn-gentle"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                )}
                
                <Button
                  onClick={handleLeaveRoom}
                  variant="outline"
                  size="sm"
                  className="text-red-300 border-red-300/30 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video/Audio Area */}
            <Card className="card-warm backdrop-blur-md">
              <CardContent className="p-6">
                <div className="aspect-video bg-slate-800/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-blue-300" />
                    </div>
                    <p className="text-blue-200">Audio/Video feed will appear here</p>
                    <p className="text-sm text-blue-300">
                      {roomData.participants.filter(p => p.isActive).length} people speaking
                    </p>
                  </div>
                </div>

                {/* Media Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    variant="outline"
                    size="sm"
                    className={`${isMuted ? 'bg-red-500/20 border-red-400/30 text-red-300' : 'btn-gentle'}`}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    variant="outline"
                    size="sm"
                    className={`${!isVideoOn ? 'bg-red-500/20 border-red-400/30 text-red-300' : 'btn-gentle'}`}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => setShowChat(!showChat)}
                    variant="outline"
                    size="sm"
                    className="btn-gentle"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mindfulness Prompt (for certain room types) */}
            {roomData.theme === 'calm' && (
              <Card className="card-warm backdrop-blur-md">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium text-foreground mb-2">Today's Reflection</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "What is one thing you're grateful for in this moment?"
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <Card className="card-warm backdrop-blur-md h-96 flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Room Chat</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-4 pt-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`${msg.type === 'system' ? 'text-center' : ''}`}>
                        {msg.type === 'system' ? (
                          <p className="text-xs text-blue-300 italic">{msg.message}</p>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-accent">
                                {msg.userName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm text-foreground">{msg.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-input border-border/30 text-foreground text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="sm"
                      className="btn-rain"
                      disabled={!chatMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Participants Panel */}
        {showParticipants && (
          <Card className="card-warm backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-foreground">Participants ({roomData.currentParticipants})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roomData.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/20"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-accent/20 text-accent">
                          {participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">
                            {participant.name}
                          </span>
                          {participant.isHost && (
                            <Crown className="w-4 h-4 text-accent" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          {participant.isMuted ? (
                            <MicOff className="w-3 h-3 text-red-400" />
                          ) : (
                            <Mic className="w-3 h-3 text-green-400" />
                          )}
                          <span className={participant.isActive ? 'text-green-400' : 'text-gray-400'}>
                            {participant.isActive ? 'Active' : 'Away'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {isHost && !participant.isHost && (
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMuteParticipant(participant.id)}
                          className="border-border/30"
                        >
                          {participant.isMuted ? (
                            <Volume2 className="w-3 h-3" />
                          ) : (
                            <VolumeX className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveParticipant(participant.id)}
                        >
                          <UserX className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room Guidelines */}
        <Card className="card-warm backdrop-blur-md">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h4 className="font-medium text-foreground">Room Guidelines</h4>
              <p className="text-sm text-muted-foreground">
                💙 Be kind and respectful • 🤝 Listen actively • 🔒 Keep conversations confidential • ⭐ Support each other
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};