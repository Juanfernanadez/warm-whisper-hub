import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, BookOpen, BarChart3, Settings, Star, Award, TrendingUp, Mic, Shield, Plus } from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [streak, setStreak] = useState(3);
  const moodHistory = [6, 7, 5, 8, 7, 6, 8]; // Last 7 days

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-accent-soft/30 p-4">
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        {/* Welcome header */}
        <div className="text-center space-y-3 slide-in-gentle">
          <div className="flex justify-center items-center gap-2">
            <Heart className="w-6 h-6 text-primary pulse-heart" fill="currentColor" />
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back
            </h1>
          </div>
          <p className="text-muted-foreground">
            You're valued and we're glad you're here
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 gap-4 slide-in-gentle">
          <Button 
            onClick={() => onNavigate("connect")}
            className="btn-connect py-6 text-lg font-medium rounded-xl h-auto flex flex-col gap-2"
            size="lg"
          >
            <MessageCircle className="w-6 h-6" />
            Talk to Someone
          </Button>
          
          <Button 
            onClick={() => onNavigate("mood")}
            className="btn-warm py-6 text-lg font-medium rounded-xl h-auto flex flex-col gap-2"
            size="lg"
          >
            <BarChart3 className="w-6 h-6" />
            Check In Today
          </Button>
        </div>

        {/* Host a Room CTA */}
        <Card className="card-warm slide-in-gentle">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-accent/20 p-4 rounded-full">
                <Plus className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Host Your Own Room
              </h3>
              <p className="text-muted-foreground">
                Create a safe space for group discussions and support others
              </p>
            </div>
            <Button 
              onClick={() => onNavigate("talk-rooms")}
              className="btn-star"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Room
            </Button>
          </CardContent>
        </Card>
        {/* Stats cards */}
        <div className="grid md:grid-cols-3 gap-4 slide-in-gentle">
          {/* Streak card */}
          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Star className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">{streak}</h3>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
            </CardContent>
          </Card>

          {/* Mood trend */}
          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-secondary/20 p-3 rounded-full">
                  <BarChart3 className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary-foreground">
                  {moodHistory[moodHistory.length - 1]}/10
                </h3>
                <p className="text-sm text-muted-foreground">Recent mood</p>
              </div>
            </CardContent>
          </Card>

          {/* Connections */}
          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-accent/20 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent-foreground">12</h3>
                <p className="text-sm text-muted-foreground">Conversations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood history */}
        <Card className="card-warm slide-in-gentle">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">This Week's Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-2 h-32">
              {moodHistory.map((mood, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary/60 rounded-t-lg w-full transition-all duration-500 hover:bg-primary"
                    style={{ height: `${(mood / 10) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Your emotional journey matters ✨
            </p>
          </CardContent>
        </Card>

        {/* Journal section */}
        <Card className="card-warm slide-in-gentle">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Private Journal</CardTitle>
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your safe space for thoughts and reflections
            </p>
            <Button 
              onClick={() => onNavigate("journal")}
              variant="outline"
              className="btn-gentle w-full"
            >
              Write in Journal
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <div className="text-center pt-4">
          <div className="flex justify-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onNavigate("badges")}
            >
              <Award className="w-4 h-4 mr-2" />
              Badges
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onNavigate("progress")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Progress
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onNavigate("voice-log")}
            >
              <Mic className="w-4 h-4 mr-2" />
              Voice Log
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onNavigate("admin")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => onNavigate("premium-analytics")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Premium Analytics
            </Button>
          </div>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onNavigate("settings")}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings & Privacy
          </Button>
        </div>
      </div>
    </div>
  );
};