import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Users, MessageCircle, Clock, Shield } from "lucide-react";

interface ConnectScreenProps {
  onConnect: (type: "one-on-one" | "group" | "browse") => void;
}

const roomOptions = [
  { id: "anxiety", name: "Anxiety Support", count: 3, color: "bg-accent-soft" },
  { id: "general", name: "General Chat", count: 8, color: "bg-secondary-soft" },
  { id: "students", name: "Student Life", count: 5, color: "bg-primary-soft" },
  { id: "work", name: "Work Stress", count: 2, color: "bg-accent-soft" },
];

export const ConnectScreen = ({ onConnect }: ConnectScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary-soft/30 to-primary-soft/40 p-4">
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        {/* Header */}
        <div className="text-center space-y-3 slide-in-gentle">
          <h1 className="text-3xl font-bold text-foreground">
            Find your connection
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose how you'd like to connect today
          </p>
        </div>

        {/* Main connection options */}
        <div className="grid md:grid-cols-2 gap-6 slide-in-gentle">
          {/* One-on-one match */}
          <Card className="card-warm cursor-pointer hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Video className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">One-on-one Match</h3>
                <p className="text-muted-foreground">
                  Connect with a caring listener for a private conversation
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>10-20 minutes</span>
                <Shield className="w-4 h-4 ml-2" />
                <span>Anonymous</span>
              </div>
              <Button 
                onClick={() => onConnect("one-on-one")}
                className="btn-connect w-full py-4 text-lg font-medium rounded-full"
                size="lg"
              >
                Find a Listener
              </Button>
            </CardContent>
          </Card>

          {/* Group rooms */}
          <Card className="card-warm cursor-pointer hover:scale-105 transition-all duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-secondary/20 p-4 rounded-full">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Join Talk Rooms</h3>
                <p className="text-muted-foreground">
                  Share with others in small, supportive group conversations
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>3-6 people</span>
                <MessageCircle className="w-4 h-4 ml-2" />
                <span>Text & voice</span>
              </div>
              <Button 
                onClick={() => onConnect("group")}
                className="btn-warm w-full py-4 text-lg font-medium rounded-full"
                size="lg"
              >
                Browse Rooms
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active rooms preview */}
        <Card className="card-warm slide-in-gentle">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Active Talk Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {roomOptions.map((room) => (
                <div 
                  key={room.id}
                  className={`${room.color} p-4 rounded-lg border border-border/30 hover:scale-105 transition-all cursor-pointer`}
                  onClick={() => onConnect("browse")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{room.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {room.count} people talking
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-white/50">
                      Join
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gentle exit option */}
        <div className="text-center pt-4">
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Maybe later - Exit gently
          </Button>
        </div>
      </div>
    </div>
  );
};