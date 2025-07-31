import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, BookOpen, TrendingUp, Calendar, Smile, ChevronLeft, ChevronRight } from "lucide-react";

interface ProgressTrackerProps {
  onNavigate: (page: string) => void;
}

const mockData = {
  weeklyStats: {
    talks: 8,
    journalDays: 3,
    moodAverage: 7.2,
    improvement: 25
  },
  moodHistory: [
    { day: "Mon", mood: 6, emoji: "😐" },
    { day: "Tue", mood: 7, emoji: "🙂" },
    { day: "Wed", mood: 5, emoji: "😔" },
    { day: "Thu", mood: 8, emoji: "😊" },
    { day: "Fri", mood: 7, emoji: "🙂" },
    { day: "Sat", mood: 8, emoji: "😊" },
    { day: "Sun", mood: 9, emoji: "😄" }
  ],
  gratitudeEntries: [
    "My friend listened to me today",
    "Found a cozy coffee shop",
    "Finished a difficult assignment",
    "Had a good laugh with family"
  ],
  achievements: [
    { title: "Talked 8 times this week", icon: "💬", color: "bg-blue-500/20 text-blue-300" },
    { title: "3 day journal streak", icon: "📝", color: "bg-green-500/20 text-green-300" },
    { title: "Mood improved 25%", icon: "📈", color: "bg-purple-500/20 text-purple-300" }
  ]
};

export const ProgressTracker = ({ onNavigate }: ProgressTrackerProps) => {
  const [currentGratitude, setCurrentGratitude] = useState(0);

  const nextGratitude = () => {
    setCurrentGratitude((prev) => (prev + 1) % mockData.gratitudeEntries.length);
  };

  const prevGratitude = () => {
    setCurrentGratitude((prev) => (prev - 1 + mockData.gratitudeEntries.length) % mockData.gratitudeEntries.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Emotional Journey
          </h1>
          <p className="text-blue-200 text-lg">
            Tracking your growth and healing
          </p>
        </div>

        {/* Weekly Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-blue-300/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-blue-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{mockData.weeklyStats.talks}</h3>
                <p className="text-sm text-blue-200">Talks this week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-300/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-green-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{mockData.weeklyStats.journalDays}</h3>
                <p className="text-sm text-green-200">Journal streak</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-300/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Smile className="w-6 h-6 text-purple-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{mockData.weeklyStats.moodAverage}/10</h3>
                <p className="text-sm text-purple-200">Average mood</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-300/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-yellow-500/20 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">+{mockData.weeklyStats.improvement}%</h3>
                <p className="text-sm text-yellow-200">Improvement</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Graph */}
        <Card className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              This Week's Emotional Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-end justify-between h-40 bg-slate-900/30 rounded-lg p-4">
              {mockData.moodHistory.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{day.emoji}</div>
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg w-8 transition-all duration-500 hover:from-blue-400 hover:to-purple-400"
                    style={{ height: `${(day.mood / 10) * 100}px` }}
                  />
                  <span className="text-xs text-slate-300">{day.day}</span>
                  <span className="text-xs text-slate-400">{day.mood}/10</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-slate-300 text-sm">
                Your emotional journey matters ✨
              </p>
              <p className="text-blue-300 text-xs mt-1">
                You've shown incredible growth this week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Scroll */}
        <Card className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {mockData.achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 p-4 rounded-lg ${achievement.color} min-w-[200px] text-center space-y-2`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <p className="font-medium">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gratitude Carousel */}
        <Card className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              Things You're Grateful For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={prevGratitude}
                className="text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex-1 text-center px-8">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-6 rounded-lg border border-pink-300/20">
                  <p className="text-white text-lg italic">
                    "{mockData.gratitudeEntries[currentGratitude]}"
                  </p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={nextGratitude}
                className="text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {mockData.gratitudeEntries.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentGratitude ? 'bg-pink-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => onNavigate("journal")}
            className="bg-green-600 hover:bg-green-700 px-8 py-4"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Write in Journal
          </Button>
          <Button 
            onClick={() => onNavigate("connect")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Start a Talk
          </Button>
        </div>
      </div>
    </div>
  );
};