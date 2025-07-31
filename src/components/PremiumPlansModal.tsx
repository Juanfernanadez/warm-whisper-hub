import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Heart, Gift } from "lucide-react";

interface PremiumPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planId: string) => void;
}

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$5",
    period: "/month",
    description: "Perfect for beginning your journey",
    features: [
      "3 matches/day",
      "Access to mood rooms",
      "Daily journaling",
      "Anonymous feedback"
    ],
    color: "bg-gradient-soft",
    popular: false
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9",
    period: "/month",
    description: "Most popular choice",
    features: [
      "Unlimited matches",
      "Priority in mood rooms",
      "WhatsApp/Telegram coach support",
      "Advanced mood tracking"
    ],
    color: "bg-gradient-warm",
    popular: true
  },
  {
    id: "wellness",
    name: "Wellness+",
    price: "$19",
    period: "/month",
    description: "Complete emotional support",
    features: [
      "All Premium features",
      "Invite-only vent groups",
      "Audio journal AI analysis",
      "Early access to events",
      "Personal wellness coach"
    ],
    color: "bg-gradient-healing",
    popular: false
  },
  {
    id: "giveback",
    name: "Giveback",
    price: "$29",
    period: "/month",
    description: "Support others while healing",
    features: [
      "Everything in Wellness+",
      "Sponsor one free user",
      "Community supporter badge",
      "Name in supporters page",
      "Monthly impact report"
    ],
    color: "bg-gradient-generous",
    popular: false,
    icon: <Gift className="w-5 h-5 text-accent" />
  }
];

const freeFeatures = [
  "1 match/day",
  "Basic mood check-in",
  "Limited room access"
];

export const PremiumPlansModal = ({ isOpen, onClose, onSelectPlan }: PremiumPlansModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    onSelectPlan(planId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Feel better after your talk? 🌟
          </DialogTitle>
          <p className="text-lg text-muted-foreground">
            Stay supported every day with Premium access
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-accent">
            <Heart className="w-4 h-4" />
            <span>Each plan helps others get free access too</span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative border-2 transition-all duration-200 hover:shadow-md ${
                selectedPlan === plan.id ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {plan.icon}
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Plan Comparison */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-center mb-3 text-muted-foreground">
            Currently using: Free Plan
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {freeFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <X className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trial Offer */}
        <div className="text-center space-y-4 mt-6 p-6 bg-gradient-soft rounded-lg">
          <h3 className="text-lg font-semibold">Try Premium for 7 days — no charge</h3>
          <p className="text-sm text-muted-foreground">
            Most of our listeners use Premium to stay connected 💙
          </p>
          <p className="text-sm text-accent">
            Your subscription sponsors free access for someone in need 🌈
          </p>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Maybe Later
          </Button>
          <Button 
            onClick={() => handleSelectPlan('premium')} 
            className="flex-1"
            disabled={!selectedPlan}
          >
            Start 7-Day Trial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};