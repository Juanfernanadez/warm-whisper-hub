import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Users,
  Clock,
  Lock,
  Globe,
  Calendar,
  Palette,
  Sparkles,
  Copy,
  Pin,
  Play,
  Heart,
  MessageCircle,
  Target,
  Brain
} from "lucide-react";

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoomCreated: (roomData: RoomData) => void;
}

interface RoomData {
  id: string;
  hostUserID: string;
  roomName: string;
  roomType: string;
  privacyType: 'public' | 'invite-only';
  isScheduled: boolean;
  scheduleTime?: string;
  maxParticipants: number;
  roomTheme: string;
  roomDesc: string;
  roomStatus: 'active' | 'scheduled';
  roomLink: string;
}

const roomTypes = [
  { 
    id: 'support', 
    label: 'Support Group', 
    icon: Heart, 
    color: '#f59e0b',
    description: 'Safe space for mutual support and understanding'
  },
  { 
    id: 'chill', 
    label: 'Chill Talk', 
    icon: MessageCircle, 
    color: '#06b6d4',
    description: 'Casual conversations and friendly chats'
  },
  {
    id: 'focus',
    label: 'Focus Room',
    icon: Target,
    color: '#8b5cf6',
    description: 'Productive sessions and accountability'
  },
  {
    id: 'meditation',
    label: 'Guided Meditation',
    icon: Brain,
    color: '#10b981',
    description: 'Mindfulness and relaxation sessions'
  }
];

const themeColors = [
  { name: 'Cosmic Blue', value: '#3b82f6', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Sunset Orange', value: '#f59e0b', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Forest Green', value: '#10b981', gradient: 'from-emerald-500 to-green-500' },
  { name: 'Royal Purple', value: '#8b5cf6', gradient: 'from-violet-500 to-purple-500' },
  { name: 'Rose Pink', value: '#ec4899', gradient: 'from-pink-500 to-rose-500' },
  { name: 'Teal Ocean', value: '#06b6d4', gradient: 'from-cyan-500 to-teal-500' }
];

export const CreateRoomModal = ({ isOpen, onClose, onRoomCreated }: CreateRoomModalProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isCreating, setIsCreating] = useState(false);
  const [idlePulse, setIdlePulse] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<RoomData | null>(null);

  // Form state
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("support");
  const [privacyType, setPrivacyType] = useState<'public' | 'invite-only'>('public');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(6);
  const [roomTheme, setRoomTheme] = useState(themeColors[0].value);
  const [roomDesc, setRoomDesc] = useState("");

  // Idle pulse animation for create button
  useEffect(() => {
    if (step === 'form' && roomName.trim()) {
      const timer = setTimeout(() => setIdlePulse(true), 10000);
      return () => clearTimeout(timer);
    }
  }, [step, roomName]);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setStep('form');
      setRoomName("");
      setRoomType("support");
      setPrivacyType('public');
      setIsScheduled(false);
      setScheduleDate("");
      setScheduleTime("");
      setMaxParticipants(6);
      setRoomTheme(themeColors[0].value);
      setRoomDesc("");
      setIdlePulse(false);
    }
  }, [isOpen]);

  const generateRoomLink = () => {
    const hash = Math.random().toString(36).substring(2, 8);
    return `/r/${hash}`;
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    setIsCreating(true);
    setIdlePulse(false);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const roomData: RoomData = {
      id: Math.random().toString(36).substring(2, 9),
      hostUserID: 'current-user-id', // Would come from auth context
      roomName: roomName.trim(),
      roomType,
      privacyType,
      isScheduled,
      scheduleTime: isScheduled ? `${scheduleDate} ${scheduleTime}` : undefined,
      maxParticipants,
      roomTheme,
      roomDesc: roomDesc.trim(),
      roomStatus: isScheduled ? 'scheduled' : 'active',
      roomLink: generateRoomLink()
    };

    setCreatedRoom(roomData);
    setIsCreating(false);
    setStep('success');
    
    // Call parent callback
    onRoomCreated(roomData);
  };

  const copyInviteLink = () => {
    if (createdRoom) {
      navigator.clipboard.writeText(`${window.location.origin}${createdRoom.roomLink}`);
      // Could add toast notification here
    }
  };

  const selectedRoomType = roomTypes.find(type => type.id === roomType);
  const selectedTheme = themeColors.find(color => color.value === roomTheme);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with radial glow */}
      <div 
        className="absolute inset-0 bg-[#0d0f1a] backdrop-blur-md"
        style={{
          background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, #0d0f1a 70%)`
        }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="card-warm w-full max-w-2xl relative z-10 slide-in-gentle max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Create Your Own Room
          </CardTitle>
          <p className="text-muted-foreground">
            Name your safe space and choose how it runs
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 'form' ? (
            <>
              {/* Room Name */}
              <div className="space-y-2">
                <Label htmlFor="roomName" className="text-foreground font-medium">
                  Room Name *
                </Label>
                <Input
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Evening Support Circle"
                  className="sparkly-input bg-input border-border/30 text-foreground"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  {roomName.length}/50 characters
                </p>
              </div>

              {/* Room Type */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Room Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roomTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setRoomType(type.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          roomType === type.id
                            ? 'border-accent bg-accent/10 scale-105'
                            : 'border-border/30 hover:border-accent/50 hover:bg-accent/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon 
                            className="w-5 h-5" 
                            style={{ color: type.color }}
                          />
                          <span className="font-medium text-foreground">
                            {type.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {type.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Privacy Level */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Privacy Level</Label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPrivacyType('public')}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      privacyType === 'public'
                        ? 'border-accent bg-accent/10'
                        : 'border-border/30 hover:border-accent/50'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Public</span>
                  </button>
                  <button
                    onClick={() => setPrivacyType('invite-only')}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      privacyType === 'invite-only'
                        ? 'border-accent bg-accent/10'
                        : 'border-border/30 hover:border-accent/50'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-accent" />
                    <span className="text-foreground">Invite-only</span>
                  </button>
                </div>
              </div>

              {/* Scheduled or Instant */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-foreground font-medium">Schedule Room</Label>
                  <button
                    onClick={() => setIsScheduled(!isScheduled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isScheduled ? 'bg-accent' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isScheduled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {isScheduled && (
                  <div className="grid grid-cols-2 gap-3 card-entry-1">
                    <div>
                      <Label htmlFor="scheduleDate" className="text-sm text-muted-foreground">
                        Date
                      </Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="bg-input border-border/30 text-foreground"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleTime" className="text-sm text-muted-foreground">
                        Time
                      </Label>
                      <Input
                        id="scheduleTime"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="bg-input border-border/30 text-foreground"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Max Participants */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">
                  Max Participants: {maxParticipants}
                </Label>
                <div className="flex items-center space-x-4">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-sm text-muted-foreground w-8">10</span>
                </div>
              </div>

              {/* Room Theme Color */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Room Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setRoomTheme(color.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        roomTheme === color.value
                          ? 'border-white scale-105'
                          : 'border-border/30 hover:border-white/50'
                      }`}
                    >
                      <div 
                        className={`w-full h-8 rounded-md bg-gradient-to-r ${color.gradient} mb-2`}
                      />
                      <p className="text-xs text-foreground font-medium">
                        {color.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Description */}
              <div className="space-y-2">
                <Label htmlFor="roomDesc" className="text-foreground font-medium">
                  Room Description
                </Label>
                <Textarea
                  id="roomDesc"
                  value={roomDesc}
                  onChange={(e) => setRoomDesc(e.target.value)}
                  placeholder="Describe what your room is about..."
                  className="sparkly-input bg-input border-border/30 text-foreground resize-none h-20"
                  maxLength={150}
                />
                <p className="text-xs text-muted-foreground">
                  {roomDesc.length}/150 characters
                </p>
              </div>

              {/* Create Button */}
              <Button
                onClick={handleCreateRoom}
                disabled={!roomName.trim() || isCreating || (isScheduled && (!scheduleDate || !scheduleTime))}
                className={`w-full py-4 text-lg font-medium rounded-full bg-gradient-to-r from-[#facc15] to-[#eab308] text-black hover:from-[#eab308] hover:to-[#ca8a04] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_-5px] hover:shadow-yellow-500/50 ${
                  idlePulse ? 'animate-pulse' : ''
                }`}
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Creating Room...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Room
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-accent animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  🎉 Room Created Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Your {selectedRoomType?.label.toLowerCase()} is ready
                </p>
              </div>

              {createdRoom && (
                <div className="space-y-4">
                  <Card className="bg-muted/10 border-border/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">
                        {createdRoom.roomName}
                      </h4>
                      <Badge 
                        className="text-xs"
                        style={{ backgroundColor: roomTheme + '20', color: roomTheme }}
                      >
                        {selectedRoomType?.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Invite Link:
                      </span>
                      <button
                        onClick={copyInviteLink}
                        className="flex items-center space-x-2 text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        <span className="font-mono">
                          {window.location.origin}{createdRoom.roomLink}
                        </span>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        // Pin to dashboard logic
                        onClose();
                      }}
                      variant="outline"
                      className="btn-gentle flex-1"
                    >
                      <Pin className="w-4 h-4 mr-2" />
                      Pin in Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        // Start room logic
                        onClose();
                      }}
                      className="btn-star flex-1"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};