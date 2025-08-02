import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Award, Target, TrendingUp } from "lucide-react";

// Mock data for the mood graph
const moodData = [
  { date: 'Mon', mood: 6, entry: 'Feeling hopeful today' },
  { date: 'Tue', mood: 4, entry: 'A bit anxious' },
  { date: 'Wed', mood: 7, entry: 'Great conversation!' },
  { date: 'Thu', mood: 5, entry: 'Neutral day' },
  { date: 'Fri', mood: 8, entry: 'Really good progress' },
  { date: 'Sat', mood: 6, entry: 'Peaceful weekend' },
  { date: 'Sun', mood: 7, entry: 'Grateful for support' },
];

const badges = [
  { id: 1, name: "First Steps", description: "Completed your first mood check-in", icon: "🌱", earned: true },
  { id: 2, name: "Week Warrior", description: "7 days of consistent check-ins", icon: "⭐", earned: true },
  { id: 3, name: "Night Owl", description: "Used the app during late hours", icon: "🌙", earned: true },
  { id: 4, name: "Conversation Starter", description: "Joined your first talk room", icon: "💬", earned: false },
  { id: 5, name: "Healing Heart", description: "30 days of self-care", icon: "💙", earned: false },
  { id: 6, name: "Support Star", description: "Helped someone in a talk room", icon: "✨", earned: false },
];

const journalHighlights = [
  { word: "grateful", count: 12, color: "text-accent" },
  { word: "peaceful", count: 8, color: "text-secondary" },
  { word: "hopeful", count: 6, color: "text-primary" },
  { word: "progress", count: 5, color: "text-accent" },
  { word: "support", count: 4, color: "text-secondary" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const moodEmoji = data.mood >= 8 ? "😊" : data.mood >= 6 ? "🙂" : data.mood >= 4 ? "😐" : "😔";
    
    return (
      <div className="mood-tooltip">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">{moodEmoji}</span>
          <div>
            <p className="text-foreground font-medium">{label}</p>
            <p className="text-accent font-semibold">Mood: {data.mood}/10</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{data.entry}</p>
      </div>
    );
  }
  return null;
};

export const Progress = () => {
  const [weeklyIntention, setWeeklyIntention] = useState("");

  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="min-h-screen night-sky relative overflow-hidden">
      {/* Animated star field background */}
      <div className="star-field">
        <div className="star star-small" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
        <div className="star star-medium" style={{ top: '20%', left: '85%', animationDelay: '1s' }}></div>
        <div className="star star-large" style={{ top: '30%', left: '70%', animationDelay: '2s' }}></div>
        <div className="star star-small" style={{ top: '50%', left: '20%', animationDelay: '3s' }}></div>
        <div className="star star-medium" style={{ top: '70%', left: '80%', animationDelay: '1.5s' }}></div>
        <div className="star star-small" style={{ top: '80%', left: '40%', animationDelay: '2.5s' }}></div>
      </div>

      <BackButton />

      <div className="pt-24 pb-8 px-4 max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 drop-shadow-sm">
            Your Healing Timeline
          </h1>
          <p className="text-muted-foreground">
            Track your journey and celebrate your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mood Graph */}
          <Card className="card-warm card-entry-1 backdrop-blur-md col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>7-Day Mood Journey</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[1, 10]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: "hsl(var(--accent))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Earned Badges */}
          <Card className="card-warm card-entry-2 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Award className="w-5 h-5 text-accent" />
                <span>Badges Earned</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h4 className="font-medium text-foreground">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Journal Highlights */}
          <Card className="card-warm card-entry-3 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>Journal Highlights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Most-used words in your entries:</p>
                {journalHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`font-medium ${highlight.color}`}>
                      {highlight.word}
                    </span>
                    <Badge variant="outline" className="border-border/30">
                      {highlight.count}x
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Badges */}
        <Card className="card-warm card-entry-4 backdrop-blur-md mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Target className="w-5 h-5 text-muted-foreground" />
              <span>Badges to Earn</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/10 border border-border/20 opacity-60">
                  <span className="text-2xl grayscale">{badge.icon}</span>
                  <div>
                    <h4 className="font-medium text-muted-foreground">{badge.name}</h4>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Intention */}
        <Card className="card-warm card-entry-5 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              Set Your Weekly Intention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={weeklyIntention}
              onChange={(e) => setWeeklyIntention(e.target.value)}
              placeholder="What would you like to focus on this week? (e.g., 'I want to practice gratitude daily' or 'I will be kind to myself')"
              className="w-full p-4 rounded-lg bg-input border border-border/30 text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <Button className="btn-star w-full py-3 text-lg font-medium rounded-full">
              ⭐ Set My Intention
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};