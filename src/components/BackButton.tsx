import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const BackButton = ({ label = "Go Back", onClick, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  const [isIdle, setIsIdle] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const handleClick = () => {
    setLastInteraction(Date.now());
    setIsIdle(false);
    
    if (onClick) {
      onClick();
    } else {
      // Navigate back or to home if no history
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const handleMouseEnter = () => {
    setLastInteraction(Date.now());
    setIsIdle(false);
  };

  // Check for idle state every second
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteraction;
      if (timeSinceLastInteraction >= 5000 && !isIdle) {
        setIsIdle(true);
        // Reset idle state after animation
        setTimeout(() => setIsIdle(false), 500);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastInteraction, isIdle]);

  // Reset interaction timer on any user activity
  useEffect(() => {
    const resetTimer = () => setLastInteraction(Date.now());
    
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`fixed top-20 left-4 z-40 flex items-center space-x-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 text-foreground transition-all duration-200 shadow-lg btn-glow-blue ${
        isIdle ? 'back-button-idle' : ''
      } hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/10 hover:border-[#6cb4ff]/30 hover:scale-105 hover:shadow-[0_0_15px_-3px] hover:shadow-[#6cb4ff]/40 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </button>
  );
};