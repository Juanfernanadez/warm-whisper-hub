import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import connectionHero from "@/assets/connection-hero.jpg";

interface WelcomeScreenProps {
  onStart: (asGuest: boolean) => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen night-sky flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated star field background */}
      <div className="star-field">
        <div className="star star-small" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
        <div className="star star-medium" style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
        <div className="star star-large" style={{ top: '30%', left: '60%', animationDelay: '2s' }}></div>
        <div className="star star-small" style={{ top: '50%', left: '10%', animationDelay: '3s' }}></div>
        <div className="star star-medium" style={{ top: '70%', left: '90%', animationDelay: '1.5s' }}></div>
        <div className="star star-small" style={{ top: '80%', left: '30%', animationDelay: '2.5s' }}></div>
        <div className="star star-large" style={{ top: '15%', left: '40%', animationDelay: '0.5s' }}></div>
      </div>

      {/* Rain effect */}
      <div className="rain-effect"></div>
      
      <Card className="card-warm w-full max-w-md slide-in-gentle relative z-10 backdrop-blur-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* Floating moon and stars animation */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary float-gentle drop-shadow-lg" fill="currentColor" />
              <Users className="w-8 h-8 text-accent absolute -bottom-2 -right-2 pulse-heart drop-shadow-md" />
            </div>
          </div>

          {/* Welcome message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground leading-relaxed drop-shadow-sm">
              You're not alone
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Want to talk to someone today?
              <br />
              <span className="text-accent font-medium drop-shadow-sm">You are valued like a star ✨</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={() => onStart(true)}
              className="btn-moon w-full py-6 text-lg font-medium rounded-full"
              size="lg"
            >
              🌙 Start as Guest
            </Button>
            
            <Button
              onClick={() => onStart(false)}
              variant="outline"
              className="btn-star w-full py-6 text-lg font-medium rounded-full"
              size="lg"
            >
              ⭐ Join with Email
            </Button>
          </div>

          {/* Reassuring message */}
          <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
            Safe, anonymous, and judgment-free
            <br />
            <span className="text-secondary drop-shadow-sm">Like rain washing away worries 🌧️</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};