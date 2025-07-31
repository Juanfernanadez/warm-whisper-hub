import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { ConnectScreen } from "@/components/ConnectScreen";
import { Dashboard } from "@/components/Dashboard";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "mood" | "connect" | "dashboard" | "journal" | "settings";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [isGuest, setIsGuest] = useState(true);
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
    }, 2000);
  };

  const handleNavigate = (page: string) => {
    if (page === "connect") setCurrentState("connect");
    else if (page === "mood") setCurrentState("mood");
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
      default:
        return <WelcomeScreen onStart={handleWelcomeStart} />;
    }
  };

  return renderCurrentScreen();
};

export default Index;
