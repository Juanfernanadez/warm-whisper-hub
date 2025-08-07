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
    <div className="professional-bg flex items-center justify-center p-4 relative overflow-hidden">
      
      <Card className="card-warm w-full max-w-md fade-in relative z-10">
        <CardContent className="p-8 text-center space-y-6">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="relative p-4 bg-primary/10 rounded-2xl">
              <Heart className="w-16 h-16 text-primary" fill="currentColor" />
              <Users className="w-6 h-6 text-primary absolute -bottom-1 -right-1 bg-card rounded-full p-1" />
            </div>
          </div>

          {/* Welcome message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-foreground leading-relaxed">
              You're not alone
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
              Want to talk to someone today?
              <br />
              <span className="text-primary font-medium">You are valued and supported</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={() => onStart(true)}
              className="btn-moon w-full py-4 text-lg font-medium"
              size="lg"
            >
              Start as Guest
            </Button>
            
            <Button
              onClick={() => onStart(false)}
              variant="outline"
              className="w-full py-4 text-lg font-medium"
              size="lg"
            >
              Join with Email
            </Button>
          </div>

          {/* Reassuring message */}
          <p className="text-sm text-muted-foreground pt-4 leading-relaxed border-t border-border">
            Safe, anonymous, and judgment-free
          </p>
        </CardContent>
      </Card>
    </div>
  );
};