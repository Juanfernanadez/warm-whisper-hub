import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { ConnectScreen } from "@/components/ConnectScreen";
import { Dashboard } from "@/components/Dashboard";
import { PremiumPlansModal } from "@/components/PremiumPlansModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PremiumAnalyticsDashboard } from "@/components/PremiumAnalyticsDashboard";
import { EmotionalBadgeSystem } from "@/components/EmotionalBadgeSystem";
import { ProgressTracker } from "@/components/ProgressTracker";
import { VoiceLogCompanion } from "@/components/VoiceLogCompanion";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "mood" | "connect" | "dashboard" | "journal" | "settings" | "admin" | "premium-analytics" | "badges" | "progress" | "voice-log";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [isGuest, setIsGuest] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [userStats] = useState({
    talksCompleted: 8,
    positiveReviews: 2,
    journalStreak: 3,
    nightOwlDays: 4,
    totalDays: 15
  });
  const { toast } = useToast();

  const handleWelcomeStart = (asGuest: boolean) => {
    setIsGuest(asGuest);
    setCurrentState("mood");
    setShowNavbar(true); // Show navbar after welcome screen
    toast({
      title: "Welcome! 🌟",
      description: "Take a moment to check in with yourself",
    });
  };

  const handleMoodComplete = (mood: number, tags: string[]) => {
    setCurrentState("connect");
    toast({
      title: "Thank you for sharing ✨",
      description: "Now let's find you someone to connect with",
    });
  };

  const handleConnect = (type: "one-on-one" | "group" | "browse") => {
    toast({
      title: "Connecting you now...",
      description: `Finding ${type === "one-on-one" ? "a listener" : "a talk room"} for you`,
    });
    // Simulate connection process
    setTimeout(() => {
      setCurrentState("dashboard");
      toast({
        title: "You're connected! 💙",
        description: "Remember: you can exit gently anytime",
      });
      // Show premium offer after talk completes
      setTimeout(() => {
        setShowPremiumModal(true);
      }, 3000);
    }, 2000);
  };

  const handleNavigate = (page: string) => {
    if (page === "connect") setCurrentState("connect");
    else if (page === "mood") setCurrentState("mood");
    else if (page === "admin") setCurrentState("admin");
    else if (page === "premium-analytics") setCurrentState("premium-analytics");
    else if (page === "badges") setCurrentState("badges");
    else if (page === "progress") {
      // Navigate to the new Progress page
      window.location.href = "/progress";
    }
    else if (page === "talk-rooms") {
      // Navigate to the Talk Rooms page
      window.location.href = "/talk-rooms";
    }
    else if (page === "pricing") {
      // Navigate to the Pricing page
      window.location.href = "/pricing";
    }
    else if (page === "voice-log") setCurrentState("voice-log");
    else if (page === "journal") {
      toast({
        title: "Journal Space 📝",
        description: "Your private, safe space for thoughts",
      });
    }
    else if (page === "settings") {
      toast({
        title: "Settings & Privacy 🔒",
        description: "Control your experience and data",
      });
    }
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case "welcome":
        return <WelcomeScreen onStart={handleWelcomeStart} />;
      case "mood":
        return <MoodCheckIn onComplete={handleMoodComplete} />;
      case "connect":
        return <ConnectScreen onConnect={handleConnect} />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;
      case "premium-analytics":
        return <PremiumAnalyticsDashboard onNavigate={handleNavigate} />;
      case "badges":
        return <EmotionalBadgeSystem userStats={userStats} />;
      case "progress":
        return <ProgressTracker onNavigate={handleNavigate} />;
      case "voice-log":
        return <VoiceLogCompanion onClose={() => setCurrentState("dashboard")} />;
      default:
        return <WelcomeScreen onStart={handleWelcomeStart} />;
    }
  };

  const handleSelectPlan = (planId: string) => {
    toast({
      title: "Starting your Premium journey! ✨",
      description: `Welcome to ${planId} plan - 7 days free`,
    });
    setShowPremiumModal(false);
    // Here you would integrate with Stripe/payment processing
  };

  return (
    <div style={{ paddingTop: showNavbar ? '64px' : '0' }}>
      {renderCurrentScreen()}
      <PremiumPlansModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
};

export default Index;
