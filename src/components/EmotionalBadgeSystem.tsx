import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Heart, MessageCircle, BookOpen, Moon, Star, Award, Flame } from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  maxProgress: number;
  category: "connection" | "wellness" | "consistency" | "special";
  rarity: "common" | "rare" | "legendary"; 
}

interface EmotionalBadgeSystemProps {
  userStats: {
    talksCompleted: number;
    positiveReviews: number;
    journalStreak: number;
    nightOwlDays: number;
    totalDays: number;
  };
}

const badges: BadgeData[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Completed your first talk",
    icon: <Star className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 1,
    category: "connection",
    rarity: "common"
  },
  {
    id: "good-listener",
    name: "Good Listener",
    description: "Got 3 positive reviews",
    icon: <Heart className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 3,
    category: "connection",
    rarity: "rare"
  },
  {
    id: "truth-teller",
    name: "Truth Teller",
    description: "Journaled for 7 days straight",
    icon: <BookOpen className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 7,
    category: "wellness",
    rarity: "rare"
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Active past midnight for 5 days",
    icon: <Moon className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 5,
    category: "special",
    rarity: "legendary"
  },
  {
    id: "conversation-starter",
    name: "Conversation Starter",
    description: "Started 10 conversations",
    icon: <MessageCircle className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 10,
    category: "connection",
    rarity: "common"
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Used the app for 30 days",
    icon: <Flame className="w-5 h-5" />,
    earned: false,
    progress: 0,
    maxProgress: 30,
    category: "consistency",
    rarity: "legendary"
  }
];

export const EmotionalBadgeSystem = ({ userStats }: EmotionalBadgeSystemProps) => {
  const [userBadges, setUserBadges] = useState<BadgeData[]>(badges);
  const [newlyEarned, setNewlyEarned] = useState<string[]>([]);

  useEffect(() => {
    const updatedBadges = userBadges.map(badge => {
      let progress = 0;
      let earned = false;

      switch (badge.id) {
        case "first-step":
          progress = Math.min(userStats.talksCompleted, badge.maxProgress);
          earned = userStats.talksCompleted >= 1;
          break;
        case "good-listener":
          progress = Math.min(userStats.positiveReviews, badge.maxProgress);
          earned = userStats.positiveReviews >= 3;
          break;
        case "truth-teller":
          progress = Math.min(userStats.journalStreak, badge.maxProgress);
          earned = userStats.journalStreak >= 7;
          break;
        case "night-owl":
          progress = Math.min(userStats.nightOwlDays, badge.maxProgress);
          earned = userStats.nightOwlDays >= 5;
          break;
        case "conversation-starter":
          progress = Math.min(userStats.talksCompleted, badge.maxProgress);
          earned = userStats.talksCompleted >= 10;
          break;
        case "streak-master":
          progress = Math.min(userStats.totalDays, badge.maxProgress);
          earned = userStats.totalDays >= 30;
          break;
      }

      // Check if badge was just earned
      if (earned && !badge.earned) {
        setNewlyEarned(prev => [...prev, badge.id]);
        // Remove from newly earned after animation
        setTimeout(() => {
          setNewlyEarned(prev => prev.filter(id => id !== badge.id));
        }, 3000);
      }

      return { ...badge, progress, earned };
    });

    setUserBadges(updatedBadges);
  }, [userStats]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-blue-300/30 bg-blue-900/20";
      case "rare": return "border-purple-300/30 bg-purple-900/20";
      case "legendary": return "border-yellow-300/30 bg-yellow-900/20";
      default: return "border-gray-300/30 bg-gray-900/20";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common": return "shadow-blue-500/20";
      case "rare": return "shadow-purple-500/30";
      case "legendary": return "shadow-yellow-500/40";
      default: return "shadow-gray-500/20";
    }
  };

  const earnedBadges = userBadges.filter(badge => badge.earned);
  const inProgressBadges = userBadges.filter(badge => !badge.earned && badge.progress > 0);
  const lockedBadges = userBadges.filter(badge => !badge.earned && badge.progress === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Journey Badges
          </h1>
          <p className="text-blue-200 text-lg">
            Celebrating your growth and connections
          </p>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Earned Badges ({earnedBadges.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`${getRarityColor(badge.rarity)} ${getRarityGlow(badge.rarity)} border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                    newlyEarned.includes(badge.id) ? 'animate-pulse ring-4 ring-yellow-400/50' : ''
                  }`}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className={`p-4 rounded-full ${
                        badge.rarity === 'legendary' ? 'bg-yellow-500/20' :
                        badge.rarity === 'rare' ? 'bg-purple-500/20' : 'bg-blue-500/20'
                      }`}>
                        <div className={`${
                          badge.rarity === 'legendary' ? 'text-yellow-300' :
                          badge.rarity === 'rare' ? 'text-purple-300' : 'text-blue-300'
                        }`}>
                          {badge.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{badge.name}</h3>
                      <p className="text-blue-200 text-sm">{badge.description}</p>
                    </div>
                    <Badge className={`${
                      badge.rarity === 'legendary' ? 'bg-yellow-600' :
                      badge.rarity === 'rare' ? 'bg-purple-600' : 'bg-blue-600'
                    } text-white`}>
                      {badge.rarity.toUpperCase()}
                    </Badge>
                    {newlyEarned.includes(badge.id) && (
                      <div className="text-yellow-400 text-sm font-medium animate-bounce">
                        ✨ Just Earned! ✨
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Badges */}
        {inProgressBadges.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">In Progress</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressBadges.map((badge) => (
                <Card key={badge.id} className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-slate-700/50">
                        <div className="text-slate-300">
                          {badge.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{badge.name}</h3>
                        <p className="text-slate-300 text-sm">{badge.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Progress</span>
                        <span className="text-slate-300">{badge.progress}/{badge.maxProgress}</span>
                      </div>
                      <Progress 
                        value={(badge.progress / badge.maxProgress) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-slate-400">
                        {badge.maxProgress - badge.progress} more to go!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Discover More</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <Card key={badge.id} className="bg-slate-800/30 border-slate-700/30 backdrop-blur-sm opacity-60">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-slate-700/30">
                        <div className="text-slate-500">
                          {badge.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-400">{badge.name}</h3>
                        <p className="text-slate-500 text-sm">{badge.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-500">
                      {badge.rarity.toUpperCase()}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};