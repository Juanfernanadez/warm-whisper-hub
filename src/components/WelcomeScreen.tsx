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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/30 to-accent-soft/40 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background hero image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${connectionHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-primary-soft/50 to-accent-soft/60" />
      
      <Card className="card-warm w-full max-w-md slide-in-gentle relative z-10">
        <CardContent className="p-8 text-center space-y-6">
          {/* Floating heart animation */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary float-gentle" fill="currentColor" />
              <Users className="w-8 h-8 text-secondary absolute -bottom-2 -right-2 pulse-heart" />
            </div>
          </div>

          {/* Welcome message */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-foreground leading-relaxed">
              You're not alone
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Want to talk to someone today? 
              <br />
              <span className="text-primary font-medium">You are valued.</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-4">
            <Button 
              onClick={() => onStart(true)}
              className="btn-connect w-full py-6 text-lg font-medium rounded-full"
              size="lg"
            >
              Start as Guest
            </Button>
            
            <Button 
              onClick={() => onStart(false)}
              variant="outline"
              className="btn-gentle w-full py-6 text-lg font-medium rounded-full"
              size="lg"
            >
              Join with Email
            </Button>
          </div>

          {/* Reassuring message */}
          <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
            Safe, anonymous, and judgment-free
            <br />
            <span className="text-primary">Glad you're here today ✨</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};