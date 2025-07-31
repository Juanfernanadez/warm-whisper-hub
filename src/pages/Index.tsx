import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { ConnectScreen } from "@/components/ConnectScreen";
import { Dashboard } from "@/components/Dashboard";
import { PremiumPlansModal } from "@/components/PremiumPlansModal";
import { AdminDashboard } from "@/components/AdminDashboard";
import { PremiumAnalyticsDashboard } from "@/components/PremiumAnalyticsDashboard";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "mood" | "connect" | "dashboard" | "journal" | "settings" | "admin" | "premium-analytics";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [isGuest, setIsGuest] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { toast } = useToast();

  const handleWelcomeStart = (asGuest: boolean) => {
    setIsGuest(asGuest);
    setCurrentState("mood");
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
    <>
      {renderCurrentScreen()}
      <PremiumPlansModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSelectPlan={handleSelectPlan}
      />
    </>
  );
};

export default Index;
