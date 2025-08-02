import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomAnalytics } from "@/components/RoomAnalytics";
import { 
  Users, 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  AlertTriangle, 
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  DollarSign,
  BarChart3,
  Clock,
  UserCheck,
  Flag,
  Home
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

// Mock data for demonstration
const mockData = {
  userGrowth: {
    totalSignups: 12847,
    dailyActive: 3421,
    weeklyActive: 8934,
    growthRate: 12.5
  },
  moodStats: {
    lonely: 28,
    anxious: 35,
    okay: 22,
    happy: 15
  },
  talkSessions: {
    todayMatches: 156,
    successRate: 87,
    averageDuration: 12.3,
    dropOffRate: 13
  },
  flaggedInteractions: [
    { id: 1, type: "abuse", user: "User#4521", time: "2 hours ago", status: "pending" },
    { id: 2, type: "spam", user: "User#7832", time: "4 hours ago", status: "resolved" },
    { id: 3, type: "inappropriate", user: "User#2341", time: "6 hours ago", status: "pending" }
  ],
  confessions: [
    { id: 1, content: "I've been struggling with anxiety for months...", status: "pending", time: "1 hour ago" },
    { id: 2, content: "Sometimes I feel like nobody understands me...", status: "approved", time: "3 hours ago" },
    { id: 3, content: "Thank you to everyone who listened to me yesterday...", status: "pending", time: "5 hours ago" }
  ],
  premiumFunnel: {
    upsellViews: 2341,
    conversionRate: 8.7,
    revenue: 15420
  }
};

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleFlaggedAction = (id: number, action: "resolve" | "escalate") => {
    console.log(`${action} flagged interaction ${id}`);
    // Handle flagged interaction action
  };

  const handleConfessionAction = (id: number, action: "approve" | "decline") => {
    console.log(`${action} confession ${id}`);
    // Handle confession moderation action
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary-soft/20 to-primary-soft/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor, moderate, and manage the community</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Healthy
            </Badge>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* User Growth Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="card-warm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.userGrowth.totalSignups.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +{mockData.userGrowth.growthRate}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.userGrowth.dailyActive.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Active Users</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.userGrowth.weeklyActive.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Talk Sessions Today</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.talkSessions.todayMatches}</div>
                  <p className="text-xs text-muted-foreground">
                    {mockData.talkSessions.successRate}% success rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Emotional Check-in Stats */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Emotional Check-in Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{mockData.moodStats.lonely}%</div>
                    <div className="text-sm text-red-700">Lonely</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{mockData.moodStats.anxious}%</div>
                    <div className="text-sm text-orange-700">Anxious</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockData.moodStats.okay}%</div>
                    <div className="text-sm text-blue-700">Okay</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockData.moodStats.happy}%</div>
                    <div className="text-sm text-green-700">Happy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="text-lg">Session Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Duration</span>
                    <span className="font-semibold">{mockData.talkSessions.averageDuration} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Drop-off Rate</span>
                    <span className="font-semibold text-orange-600">{mockData.talkSessions.dropOffRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-green-600">{mockData.talkSessions.successRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="text-lg">Peak Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Evening (6-9 PM)</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Night (9-12 AM)</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Late Night (12-3 AM)</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="text-lg">User Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Return Users</span>
                    <span className="font-semibold">73%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Journal Entries</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Kind Notes Shared</span>
                    <span className="font-semibold">892</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <RoomAnalytics onNavigate={onNavigate} />
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Flagged Interactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.flaggedInteractions.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-4">
                        <Flag className="w-4 h-4 text-orange-600" />
                        <div>
                          <div className="font-medium">{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Report</div>
                          <div className="text-sm text-muted-foreground">{item.user} • {item.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.status === "pending" ? "destructive" : "outline"}>
                          {item.status}
                        </Badge>
                        {item.status === "pending" && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleFlaggedAction(item.id, "resolve")}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleFlaggedAction(item.id, "escalate")}
                            >
                              <Shield className="w-4 h-4 mr-1" />
                              Ban User
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  Anonymous Confessions - Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.confessions.map((confession) => (
                    <div key={confession.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-sm text-muted-foreground">{confession.time}</div>
                        <Badge variant={confession.status === "pending" ? "destructive" : "outline"}>
                          {confession.status}
                        </Badge>
                      </div>
                      <p className="text-foreground mb-4">{confession.content}</p>
                      {confession.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="btn-connect"
                            onClick={() => handleConfessionAction(confession.id, "approve")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConfessionAction(confession.id, "decline")}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};