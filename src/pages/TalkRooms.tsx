import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Heart, MessageCircle, Shield, Star } from "lucide-react";

interface TalkRoom {
  id: string;
  name: string;
  description: string;
  participants: number;
  maxParticipants: number;
  mood: string;
  duration: string;
  host: string;
  tags: string[];
  isActive: boolean;
  isPremium?: boolean;
}

const talkRooms: TalkRoom[] = [
  {
    id: "1",
    name: "Evening Reflection Circle",
    description: "A gentle space to share thoughts about your day and practice gratitude together.",
    participants: 4,
    maxParticipants: 8,
    mood: "peaceful",
    duration: "45 min",
    host: "Sarah M.",
    tags: ["gratitude", "reflection", "evening"],
    isActive: true
  },
  {
    id: "2",
    name: "Anxiety Support Group",
    description: "Safe space for those dealing with anxiety. Share coping strategies and support each other.",
    participants: 6,
    maxParticipants: 10,
    mood: "supportive",
    duration: "60 min",
    host: "Alex K.",
    tags: ["anxiety", "coping", "support"],
    isActive: true
  },
  {
    id: "3",
    name: "Creative Expression Hour",
    description: "Express yourself through art, writing, or music. No judgment, just creativity and connection.",
    participants: 3,
    maxParticipants: 6,
    mood: "creative",
    duration: "90 min",
    host: "Maya L.",
    tags: ["creativity", "art", "expression"],
    isActive: true,
    isPremium: true
  },
  {
    id: "4",
    name: "Mindful Morning Check-in",
    description: "Start your day with intention. Brief morning meditation and goal setting together.",
    participants: 8,
    maxParticipants: 12,
    mood: "energetic",
    duration: "30 min",
    host: "David R.",
    tags: ["morning", "mindfulness", "goals"],
    isActive: true
  },
  {
    id: "5",
    name: "Night Owls Sanctuary",
    description: "For those who find peace in the quiet hours. Late-night conversations and gentle support.",
    participants: 2,
    maxParticipants: 6,
    mood: "calm",
    duration: "Open",
    host: "Luna S.",
    tags: ["night", "quiet", "sanctuary"],
    isActive: true
  },
  {
    id: "6",
    name: "Healing Hearts Circle",
    description: "Processing grief, loss, and major life changes with compassionate listeners.",
    participants: 5,
    maxParticipants: 8,
    mood: "healing",
    duration: "75 min",
    host: "Emma T.",
    tags: ["grief", "healing", "support"],
    isActive: false,
    isPremium: true
  }
];

const getMoodColor = (mood: string) => {
  const colors = {
    peaceful: "text-secondary",
    supportive: "text-accent",
    creative: "text-primary",
    energetic: "text-accent",
    calm: "text-secondary",
    healing: "text-primary"
  };
  return colors[mood as keyof typeof colors] || "text-muted-foreground";
};

const getMoodIcon = (mood: string) => {
  const icons = {
    peaceful: "🌙",
    supportive: "🤝",
    creative: "🎨",
    energetic: "⚡",
    calm: "🕯️",
    healing: "💙"
  };
  return icons[mood as keyof typeof icons] || "💬";
};

export const TalkRooms = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Rooms", count: talkRooms.length },
    { id: "active", label: "Active Now", count: talkRooms.filter(room => room.isActive).length },
    { id: "support", label: "Support Groups", count: talkRooms.filter(room => room.tags.includes("support")).length },
    { id: "creative", label: "Creative", count: talkRooms.filter(room => room.tags.includes("creativity")).length }
  ];

  const filteredRooms = talkRooms.filter(room => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "active") return room.isActive;
    if (selectedFilter === "support") return room.tags.includes("support");
    if (selectedFilter === "creative") return room.tags.includes("creativity");
    return true;
  });

  const handleJoinRoom = (roomId: string) => {
    console.log(`Joining room: ${roomId}`);
    // Here you would implement the room joining logic
  };

  return (
    <div className="min-h-screen night-sky relative overflow-hidden">
      {/* Animated star field background */}
      <div className="star-field">
        <div className="star star-small" style={{ top: '8%', left: '12%', animationDelay: '0s' }}></div>
        <div className="star star-medium" style={{ top: '18%', left: '88%', animationDelay: '1s' }}></div>
        <div className="star star-large" style={{ top: '28%', left: '72%', animationDelay: '2s' }}></div>
        <div className="star star-small" style={{ top: '48%', left: '18%', animationDelay: '3s' }}></div>
        <div className="star star-medium" style={{ top: '68%', left: '82%', animationDelay: '1.5s' }}></div>
        <div className="star star-small" style={{ top: '88%', left: '28%', animationDelay: '2.5s' }}></div>
      </div>

      <BackButton />

      <div className="pt-24 pb-8 px-4 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 drop-shadow-sm">
            Talk Rooms
          </h1>
          <p className="text-muted-foreground">
            Join supportive conversations with people who understand
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              className={`${
                selectedFilter === filter.id 
                  ? "btn-rain" 
                  : "btn-gentle border-border/30 hover:border-secondary/50"
              }`}
            >
              {filter.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Talk Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <Card key={room.id} className={`card-warm card-entry-${index + 1} backdrop-blur-md relative`}>
              {room.isPremium && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getMoodIcon(room.mood)}</span>
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {room.name}
                      </CardTitle>
                      <p className={`text-sm font-medium ${getMoodColor(room.mood)}`}>
                        {room.mood}
                      </p>
                    </div>
                  </div>
                  {room.isActive && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-xs text-accent font-medium">Live</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {room.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{room.participants}/{room.maxParticipants}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{room.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Hosted by {room.host}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {room.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-border/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={() => handleJoinRoom(room.id)}
                  disabled={!room.isActive || room.participants >= room.maxParticipants}
                  className={`w-full ${
                    room.isActive && room.participants < room.maxParticipants
                      ? "btn-rain"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {!room.isActive 
                    ? "Room Closed" 
                    : room.participants >= room.maxParticipants 
                    ? "Room Full" 
                    : "Join Room"
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Room CTA */}
        <div className="text-center mt-12">
          <Card className="card-warm backdrop-blur-md max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <Heart className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold text-foreground">
                Want to host your own room?
              </h3>
              <p className="text-sm text-muted-foreground">
                Create a safe space for others and build meaningful connections
              </p>
              <Button className="btn-star w-full">
                ⭐ Create Room
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};