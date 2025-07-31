import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video, Users, MessageCircle, Clock, Shield, Mic, MicOff, Heart, Waves, Dove, HandHeart, MapPin, Timer, Headphones, BookOpen, Brain, Bot } from "lucide-react";

interface ConnectScreenProps {
  onConnect: (type: "one-on-one" | "group" | "browse") => void;
}

interface TalkRoom {
  id: string;
  title: string;
  subtitle: string;
  mood: "anxious" | "calm" | "neutral";
  peopleCount: number;
  speakingCount: number;
  listeningCount: number;
}

interface OnlineUser {
  id: string;
  name: string;
  mood: string;
  location: string;
  age?: number;
  isAnonymous: boolean;
}

const talkRooms: TalkRoom[] = [
  { id: "1", title: "Midnight Minds", subtitle: "Late night thoughts", mood: "calm", peopleCount: 8, speakingCount: 3, listeningCount: 5 },
  { id: "2", title: "I Feel Empty", subtitle: "Processing difficult emotions", mood: "anxious", peopleCount: 12, speakingCount: 2, listeningCount: 10 },
  { id: "3", title: "Gentle Souls", subtitle: "Soft conversations", mood: "calm", peopleCount: 6, speakingCount: 4, listeningCount: 2 },
  { id: "4", title: "Storm Passing", subtitle: "Working through anxiety", mood: "anxious", peopleCount: 15, speakingCount: 1, listeningCount: 14 },
];

const onlineUsers: OnlineUser[] = [
  { id: "1", name: "Alex", mood: "😊", location: "🇺🇸", age: 24, isAnonymous: false },
  { id: "2", name: "Anonymous", mood: "😔", location: "🇬🇧", isAnonymous: true },
  { id: "3", name: "Sam", mood: "😌", location: "🇨🇦", age: 19, isAnonymous: false },
  { id: "4", name: "River", mood: "🤗", location: "🇦🇺", age: 22, isAnonymous: false },
  { id: "5", name: "Anonymous", mood: "😰", location: "🇩🇪", isAnonymous: true },
];

const studyRooms = [
  { id: "study1", title: "Stressed before exam?", emoji: "😰", count: 8 },
  { id: "study2", title: "I feel like I'm failing", emoji: "😭", count: 12 },
  { id: "study3", title: "Post-exam relief", emoji: "😵‍💫", count: 5 },
];

export const ConnectScreen = ({ onConnect }: ConnectScreenProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [foundListener, setFoundListener] = useState(false);
  const [dailyResponse, setDailyResponse] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [isWalkMode, setIsWalkMode] = useState(false);

  // Simulate listener search
  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setFoundListener(true);
        setIsSearching(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSearching]);

  const handleFindListener = () => {
    setActiveModal("listener");
    setIsSearching(true);
    setFoundListener(false);
  };

  const getMoodGlow = (mood: "anxious" | "calm" | "neutral") => {
    switch (mood) {
      case "anxious": return "shadow-red-500/20 border-red-300/30 bg-gradient-to-br from-red-900/20 to-red-800/10";
      case "calm": return "shadow-teal-500/20 border-teal-300/30 bg-gradient-to-br from-teal-900/20 to-teal-800/10";
      default: return "shadow-purple-500/20 border-purple-300/30 bg-gradient-to-br from-purple-900/20 to-purple-800/10";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 p-4 relative overflow-hidden">
      {/* Ambient stars background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center animate-pulse">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Find your connection
          </h1>
          <p className="text-blue-200 text-lg">
            Safe spaces for every moment
          </p>
        </div>

        {/* Main connection options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Find a Listener */}
          <Card className="bg-slate-800/50 border-purple-300/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-purple-500/20 p-4 rounded-full">
                  <Headphones className="w-8 h-8 text-purple-300" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Find a Listener</h3>
                <p className="text-blue-200">
                  Connect with someone who understands
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                <Clock className="w-4 h-4" />
                <span>Max 10 minutes - no pressure</span>
              </div>
              <Button 
                onClick={handleFindListener}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 w-full py-4 text-lg font-medium rounded-full text-white"
                size="lg"
              >
                Find Someone
              </Button>
            </CardContent>
          </Card>

          {/* Join Talk Room */}
          <Card className="bg-slate-800/50 border-blue-300/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <Users className="w-8 h-8 text-blue-300" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Join Talk Room</h3>
                <p className="text-blue-200">
                  Share with others in group conversations
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                <Users className="w-4 h-4" />
                <span>3-15 people</span>
                <MessageCircle className="w-4 h-4 ml-2" />
                <span>Voice & text</span>
              </div>
              <Button 
                onClick={() => setActiveModal("rooms")}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 w-full py-4 text-lg font-medium rounded-full text-white"
                size="lg"
              >
                Browse Rooms
              </Button>
            </CardContent>
          </Card>

          {/* Walk With Me */}
          <Card className="bg-slate-800/50 border-green-300/30 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-500/20 p-4 rounded-full">
                  <MapPin className="w-8 h-8 text-green-300" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">Walk With Me</h3>
                <p className="text-blue-200">
                  Put on your shoes, we're going for a calm walk
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-300">
                <Timer className="w-4 h-4" />
                <span>15-min audio call</span>
              </div>
              <Button 
                onClick={() => setActiveModal("walk")}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full py-4 text-lg font-medium rounded-full text-white"
                size="lg"
              >
                Start Walking
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick access buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            onClick={() => setActiveModal("anxiety")}
            className="bg-slate-800/50 border border-orange-300/30 hover:bg-slate-800/70 py-6 text-orange-200 hover:text-white backdrop-blur-sm"
            variant="outline"
          >
            <Brain className="w-5 h-5 mr-2" />
            Anxiety Support
          </Button>
          
          <Button 
            onClick={() => setActiveModal("general")}
            className="bg-slate-800/50 border border-cyan-300/30 hover:bg-slate-800/70 py-6 text-cyan-200 hover:text-white backdrop-blur-sm"
            variant="outline"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            General Chat
          </Button>
          
          <Button 
            onClick={() => setActiveModal("student")}
            className="bg-slate-800/50 border border-yellow-300/30 hover:bg-slate-800/70 py-6 text-yellow-200 hover:text-white backdrop-blur-sm"
            variant="outline"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Student Life
          </Button>
        </div>
      </div>

      {/* Find Listener Modal */}
      <Dialog open={activeModal === "listener"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-purple-300/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Find a Listener</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {isSearching ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto border-4 border-purple-300/30 border-t-purple-400 rounded-full animate-spin"></div>
                <p className="text-purple-200">Finding someone who understands…</p>
              </div>
            ) : foundListener ? (
              <div className="space-y-4">
                <div className="text-center space-y-3">
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarFallback className="bg-purple-500 text-white text-xl">J</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Jamie</h3>
                    <p className="text-sm text-blue-200">EST timezone • "Here to listen with care"</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Mic className="w-4 h-4 mr-2" />
                    Audio Talk
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Video className="w-4 h-4 mr-2" />
                    Video Talk
                  </Button>
                </div>
                <p className="text-center text-sm text-blue-300">
                  Not ready yet? <button className="underline">Join as listener instead</button>
                </p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Talk Rooms Modal */}
      <Dialog open={activeModal === "rooms"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-blue-300/30 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Join Talk Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              {talkRooms.map((room) => (
                <Card key={room.id} className={`${getMoodGlow(room.mood)} border backdrop-blur-sm hover:scale-105 transition-all cursor-pointer`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{room.title}</h3>
                        <p className="text-blue-200 text-sm">{room.subtitle}</p>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                    <div className="text-sm text-blue-300">
                      {room.peopleCount} people | {room.speakingCount} speaking | {room.listeningCount} listeners
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Speak & Listen
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-300/30 text-blue-200">
                        Listen Only
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-blue-300">Every voice matters — be kind 💙</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Walk With Me Modal */}
      <Dialog open={activeModal === "walk"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-green-300/30 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Walk With Me</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-white animate-bounce" />
              </div>
              <p className="text-green-200">Put on your shoes, we're going for a calm walk.</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 py-4">
                <Users className="w-4 h-4 mr-2" />
                Find someone walking too
              </Button>
              <Button variant="outline" className="w-full border-green-300/30 text-green-200 py-4">
                <Headphones className="w-4 h-4 mr-2" />
                Just listen to ambient walk
              </Button>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-green-300">
                <Timer className="w-4 h-4" />
                <span>15-minute audio call</span>
              </div>
              <label className="flex items-center justify-center gap-2 text-sm text-blue-300">
                <input type="checkbox" className="rounded" />
                Share my location radius (optional)
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Anxiety Support Modal */}
      <Dialog open={activeModal === "anxiety"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-orange-300/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Anxiety Support</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4 relative">
            {/* Floating bubbles animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            
            <div className="space-y-4 relative z-10">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 py-4 justify-start">
                <Users className="w-5 h-5 mr-3" />
                Join Support Room <span className="ml-auto text-sm">(12 people inside)</span>
              </Button>
              
              <Button variant="outline" className="w-full border-orange-300/30 text-orange-200 py-4 justify-start">
                <Headphones className="w-5 h-5 mr-3" />
                Try a Guided Audio Session <span className="ml-auto text-sm">(3 min meditations)</span>
              </Button>
              
              <Button variant="outline" className="w-full border-orange-300/30 text-orange-200 py-4 justify-start">
                <BookOpen className="w-5 h-5 mr-3" />
                Write What's on Your Mind
              </Button>
              
              <Button variant="outline" className="w-full border-orange-300/30 text-orange-200 py-4 justify-start">
                <Heart className="w-5 h-5 mr-3" />
                Match Me With Someone Safe
              </Button>
            </div>
            
            <div className="text-center pt-4 border-t border-orange-300/20">
              <p className="text-sm text-orange-200 mb-2">Need more support?</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Bot className="w-4 h-4 mr-2" />
                Try WhisperBot
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* General Chat Modal */}
      <Dialog open={activeModal === "general"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-cyan-300/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">General Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Daily Question */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-300/20">
              <h3 className="font-semibold mb-2">💬 What's something that made you smile today?</h3>
              <Input 
                placeholder="Share your moment..."
                value={dailyResponse}
                onChange={(e) => setDailyResponse(e.target.value)}
                className="bg-slate-700 border-cyan-300/30 text-white"
              />
            </div>
            
            {/* Online Users */}
            <div>
              <h3 className="font-semibold mb-4">People online now</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {onlineUsers.map((user) => (
                  <Card key={user.id} className="bg-slate-800/50 border-cyan-300/20 hover:bg-slate-800/70 transition-all cursor-pointer">
                    <CardContent className="p-4 text-center space-y-2">
                      <Avatar className="w-12 h-12 mx-auto">
                        <AvatarFallback className="bg-cyan-500 text-white">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-cyan-200">
                          {user.mood} {user.location} {user.age && `• ${user.age}`}
                        </p>
                      </div>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 w-full">
                        Say Hi 👋
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Join Ongoing Chat */}
            <div className="text-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 px-8">
                Join Ongoing Chat (5 people talking)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Student Life Modal */}
      <Dialog open={activeModal === "student"} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="bg-slate-900 border-yellow-300/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Student Life</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Study Buddies */}
            <div className="space-y-3">
              <h3 className="font-semibold text-yellow-200">🎓 Study Buddies</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-yellow-300/30 text-yellow-200 justify-start">
                  Find a late-night study partner
                </Button>
                <Button variant="outline" className="w-full border-yellow-300/30 text-yellow-200 justify-start">
                  <Timer className="w-4 h-4 mr-2" />
                  Timer-based Focus Room (Pomodoro)
                </Button>
              </div>
            </div>
            
            {/* Exam Anxiety */}
            <div className="space-y-3">
              <h3 className="font-semibold text-yellow-200">💬 Exam Anxiety Talks</h3>
              <div className="space-y-2">
                {studyRooms.map((room) => (
                  <Button 
                    key={room.id}
                    variant="outline" 
                    className="w-full border-yellow-300/30 text-yellow-200 justify-between"
                  >
                    <span>{room.emoji} {room.title}</span>
                    <Badge variant="outline" className="border-yellow-300/30 text-yellow-200">
                      {room.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Post Exam Vent */}
            <div className="space-y-3">
              <h3 className="font-semibold text-yellow-200">🤯 Post Exam Vent Zone</h3>
              <p className="text-sm text-yellow-300">Share anonymous voice vents, react with 🙌 or ❤️</p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                <Mic className="w-4 h-4 mr-2" />
                Record Voice Vent
              </Button>
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center pt-4 border-t border-yellow-300/20">
              <p className="text-sm text-yellow-200 mb-2">🎁 Tip: Use our Mind Reset Timer before exams</p>
              <Button variant="outline" className="border-yellow-300/30 text-yellow-200">
                3-min brain refresh
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};