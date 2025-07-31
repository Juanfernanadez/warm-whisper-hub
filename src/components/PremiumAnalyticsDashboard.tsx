import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Heart, 
  BookOpen, 
  MessageCircle, 
  Clock,
  Star,
  Calendar,
  Sparkles
} from "lucide-react";

interface PremiumAnalyticsDashboardProps {
  onNavigate: (page: string) => void;
}

// Mock data for premium user analytics
const mockPremiumData = {
  moodTrend: [
    { date: "Mon", mood: 4 },
    { date: "Tue", mood: 6 },
    { date: "Wed", mood: 5 },
    { date: "Thu", mood: 7 },
    { date: "Fri", mood: 8 },
    { date: "Sat", mood: 7 },
    { date: "Sun", mood: 8 }
  ],
  journalInsights: {
    topKeywords: ["grateful", "anxious", "hopeful", "tired", "peaceful"],
    entriesThisWeek: 5,
    longestStreak: 12
  },
  talkHistory: {
    totalConversations: 23,
    positiveRated: 19,
    averageRating: 4.6,
    topEmotions: ["loneliness", "anxiety", "hope", "gratitude"]
  },
  timeCapsule: {
    sent: 3,
    received: 2,
    nextUnlock: "2 days"
  }
};

export const PremiumAnalyticsDashboard = ({ onNavigate }: PremiumAnalyticsDashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-accent-soft/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Your Emotional Journey
            </h1>
            <p className="text-muted-foreground">Premium insights into your wellbeing</p>
          </div>
          <Badge className="bg-gradient-generous text-accent-foreground px-4 py-2">
            Premium Member ✨
          </Badge>
        </div>

        {/* Mood Tracker Graph */}
        <Card className="card-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Mood Tracker - This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-40 bg-gradient-soft rounded-lg p-4">
                {mockPremiumData.moodTrend.map((day, index) => (
                  <div key={day.date} className="flex flex-col items-center gap-2">
                    <div 
                      className="bg-primary rounded-t-lg w-8 transition-all duration-500 hover:bg-primary/80"
                      style={{ height: `${(day.mood / 10) * 120}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{day.date}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">↗️ 25%</div>
                  <div className="text-sm text-green-700">Mood Improvement</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">7.2/10</div>
                  <div className="text-sm text-blue-700">Average This Week</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">3 Days</div>
                  <div className="text-sm text-purple-700">Best Streak</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Journaling Insights */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                Journaling Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-secondary-soft rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{mockPremiumData.journalInsights.entriesThisWeek}</div>
                  <div className="text-sm text-secondary-foreground">Entries This Week</div>
                </div>
                <div className="text-center p-3 bg-accent-soft rounded-lg">
                  <div className="text-2xl font-bold text-accent">{mockPremiumData.journalInsights.longestStreak}</div>
                  <div className="text-sm text-accent-foreground">Day Streak</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Your Most Used Words</h4>
                <div className="flex flex-wrap gap-2">
                  {mockPremiumData.journalInsights.topKeywords.map((keyword, index) => (
                    <Badge 
                      key={keyword} 
                      variant="outline" 
                      className="bg-primary-soft text-primary-foreground"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-gradient-healing rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">Suggested Affirmation</h4>
                <p className="text-sm text-green-700 italic">
                  "I am grateful for my journey and the progress I'm making each day."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Talk History */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                Talk History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent-soft rounded-lg">
                  <div className="text-2xl font-bold text-accent">{mockPremiumData.talkHistory.totalConversations}</div>
                  <div className="text-sm text-accent-foreground">Total Talks</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                    {mockPremiumData.talkHistory.averageRating}
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-sm text-green-700">Average Rating</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Most Talked About</h4>
                <div className="space-y-2">
                  {mockPremiumData.talkHistory.topEmotions.map((emotion, index) => (
                    <div key={emotion} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{emotion}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full" 
                          style={{ width: `${85 - (index * 15)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-primary-soft rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Positive Impact</span>
                </div>
                <p className="text-sm text-primary-foreground">
                  {mockPremiumData.talkHistory.positiveRated} out of {mockPremiumData.talkHistory.totalConversations} conversations were rated as helpful
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Capsule Messages */}
        <Card className="card-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Time Capsule Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{mockPremiumData.timeCapsule.sent}</div>
                <div className="text-sm text-purple-700">Messages Sent</div>
                <p className="text-xs text-muted-foreground mt-1">To future you</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockPremiumData.timeCapsule.received}</div>
                <div className="text-sm text-blue-700">Messages Received</div>
                <p className="text-xs text-muted-foreground mt-1">From past you</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{mockPremiumData.timeCapsule.nextUnlock}</div>
                <div className="text-sm text-orange-700">Next Unlock</div>
                <Button size="sm" variant="outline" className="mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  View Timeline
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => onNavigate("journal")}
            className="btn-warm"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Write in Journal
          </Button>
          <Button 
            onClick={() => onNavigate("connect")}
            className="btn-connect"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Start a Talk
          </Button>
        </div>
      </div>
    </div>
  );
};