import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar,
  MessageCircle,
  Heart,
  Target,
  Award
} from "lucide-react";

interface RoomAnalyticsData {
  totalRoomsCreated: number;
  totalParticipants: number;
  averageEngagementTime: number; // in minutes
  joinToDropRatio: number; // percentage
  popularRoomTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  peakHours: Array<{
    hour: number;
    roomCount: number;
  }>;
  weeklyStats: Array<{
    day: string;
    rooms: number;
    participants: number;
  }>;
}

interface RoomAnalyticsProps {
  onNavigate: (page: string) => void;
}

const mockAnalyticsData: RoomAnalyticsData = {
  totalRoomsCreated: 247,
  totalParticipants: 1834,
  averageEngagementTime: 23,
  joinToDropRatio: 78,
  popularRoomTypes: [
    { type: "Support Group", count: 89, percentage: 36 },
    { type: "Chill Talk", count: 76, percentage: 31 },
    { type: "Focus Room", count: 52, percentage: 21 },
    { type: "Guided Meditation", count: 30, percentage: 12 }
  ],
  peakHours: [
    { hour: 19, roomCount: 23 }, // 7 PM
    { hour: 20, roomCount: 31 }, // 8 PM
    { hour: 21, roomCount: 28 }, // 9 PM
    { hour: 22, roomCount: 19 }  // 10 PM
  ],
  weeklyStats: [
    { day: "Mon", rooms: 32, participants: 245 },
    { day: "Tue", rooms: 28, participants: 198 },
    { day: "Wed", rooms: 35, participants: 267 },
    { day: "Thu", rooms: 41, participants: 312 },
    { day: "Fri", rooms: 38, participants: 289 },
    { day: "Sat", rooms: 44, participants: 334 },
    { day: "Sun", rooms: 29, participants: 189 }
  ]
};

export const RoomAnalytics = ({ onNavigate }: RoomAnalyticsProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

  const data = mockAnalyticsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/20 to-accent-soft/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-accent" />
              Room Analytics
            </h1>
            <p className="text-muted-foreground">Track room performance and community engagement</p>
          </div>
          
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map((timeframe) => (
              <Button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                variant={selectedTimeframe === timeframe ? "default" : "outline"}
                className={selectedTimeframe === timeframe ? "btn-rain" : "btn-gentle"}
                size="sm"
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-accent/20 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-accent">{data.totalRoomsCreated}</h3>
                <p className="text-sm text-muted-foreground">Total Rooms Created</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-secondary/20 p-3 rounded-full">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">{data.totalParticipants}</h3>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/20 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">{data.averageEngagementTime}m</h3>
                <p className="text-sm text-muted-foreground">Avg. Engagement Time</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-warm">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-green-500/20 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-400">{data.joinToDropRatio}%</h3>
                <p className="text-sm text-muted-foreground">Join-to-Stay Ratio</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Popular Room Types */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Popular Room Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.popularRoomTypes.map((roomType, index) => (
                <div key={roomType.type} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{roomType.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{roomType.count} rooms</span>
                      <Badge variant="outline" className="border-accent/30 text-accent">
                        {roomType.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${roomType.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Peak Activity Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.peakHours.map((hour) => (
                  <div key={hour.hour} className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {hour.hour}:00 - {hour.hour + 1}:00
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-secondary h-2 rounded-full"
                          style={{ width: `${(hour.roomCount / 35) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12">
                        {hour.roomCount} rooms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Stats */}
        <Card className="card-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-40 bg-gradient-soft rounded-lg p-4">
              {data.weeklyStats.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div 
                      className="bg-primary rounded-t-lg w-8 transition-all duration-500 hover:bg-primary/80"
                      style={{ height: `${(day.rooms / 50) * 120}px` }}
                    />
                    <div 
                      className="bg-secondary rounded-t-lg w-8 transition-all duration-500 hover:bg-secondary/80"
                      style={{ height: `${(day.participants / 400) * 80}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span className="text-sm text-muted-foreground">Rooms Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded"></div>
                <span className="text-sm text-muted-foreground">Participants</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <Card className="card-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">High Engagement</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Support Groups have the highest retention rate at 89%. Consider promoting this room type.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Peak Time</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  8-9 PM is your busiest hour. Consider scheduling featured rooms during this time.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">Room Size</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Rooms with 4-6 participants have the best engagement. Consider suggesting optimal sizes.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">Community Growth</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Weekend rooms see 23% higher satisfaction scores. Encourage weekend hosting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};