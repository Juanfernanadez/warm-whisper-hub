import { useState } from "react";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Gift, Sparkles } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "moon" | "rain" | "star";
  popular?: boolean;
  gift?: boolean;
  highlight?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start your healing journey with basic support",
    features: [
      "Daily mood check-ins",
      "Basic talk rooms",
      "Community support",
      "Mobile app access",
      "Basic progress tracking"
    ],
    buttonText: "Start Free",
    buttonVariant: "moon"
  },
  {
    id: "supporter",
    name: "Supporter",
    price: "$9",
    period: "per month",
    description: "Enhanced features for deeper self-care",
    features: [
      "Everything in Free",
      "Priority talk room access",
      "Advanced mood analytics",
      "Personal journal space",
      "Weekly intention setting",
      "Badge system",
      "Email support"
    ],
    buttonText: "Upgrade Now",
    buttonVariant: "rain",
    popular: true,
    highlight: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Complete wellness toolkit with premium features",
    features: [
      "Everything in Supporter",
      "1-on-1 peer support sessions",
      "Advanced progress insights",
      "Custom mood tracking",
      "Priority customer support",
      "Exclusive premium content",
      "Export your data",
      "Ad-free experience"
    ],
    buttonText: "Go Premium",
    buttonVariant: "star"
  },
  {
    id: "sponsor",
    name: "Sponsor",
    price: "$29",
    period: "per month",
    description: "Support others while getting premium access",
    features: [
      "Everything in Premium",
      "Sponsor 3 free memberships",
      "Community impact dashboard",
      "Special sponsor badge",
      "Monthly impact reports",
      "Early access to new features",
      "Direct line to our team"
    ],
    buttonText: "Sponsor & Support",
    buttonVariant: "star",
    gift: true
  }
];

const comparisonFeatures = [
  { feature: "Daily mood check-ins", free: true, supporter: true, premium: true, sponsor: true },
  { feature: "Basic talk rooms", free: true, supporter: true, premium: true, sponsor: true },
  { feature: "Community support", free: true, supporter: true, premium: true, sponsor: true },
  { feature: "Priority talk room access", free: false, supporter: true, premium: true, sponsor: true },
  { feature: "Advanced mood analytics", free: false, supporter: true, premium: true, sponsor: true },
  { feature: "Personal journal space", free: false, supporter: true, premium: true, sponsor: true },
  { feature: "1-on-1 peer support", free: false, supporter: false, premium: true, sponsor: true },
  { feature: "Custom mood tracking", free: false, supporter: false, premium: true, sponsor: true },
  { feature: "Sponsor memberships", free: false, supporter: false, premium: false, sponsor: true },
  { feature: "Impact dashboard", free: false, supporter: false, premium: false, sponsor: true },
];

export const Pricing = () => {
  const [showComparison, setShowComparison] = useState(false);

  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    // Here you would integrate with your payment system
  };

  return (
    <div className="min-h-screen night-sky relative overflow-hidden">
      {/* Animated star field background */}
      <div className="star-field">
        <div className="star star-small" style={{ top: '5%', left: '10%', animationDelay: '0s' }}></div>
        <div className="star star-medium" style={{ top: '15%', left: '90%', animationDelay: '1s' }}></div>
        <div className="star star-large" style={{ top: '25%', left: '75%', animationDelay: '2s' }}></div>
        <div className="star star-small" style={{ top: '45%', left: '15%', animationDelay: '3s' }}></div>
        <div className="star star-medium" style={{ top: '65%', left: '85%', animationDelay: '1.5s' }}></div>
        <div className="star star-small" style={{ top: '85%', left: '25%', animationDelay: '2.5s' }}></div>
        <div className="star star-large" style={{ top: '35%', left: '50%', animationDelay: '0.5s' }}></div>
      </div>

      <BackButton />

      <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 drop-shadow-sm">
            Support Yourself or Someone Else
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your healing journey. Every subscription helps keep our community safe and supportive.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`card-warm card-entry-${index + 1} backdrop-blur-md relative ${
                plan.highlight ? 'ring-2 ring-secondary/50 shadow-[0_0_30px_-12px] shadow-secondary/30' : ''
              } ${plan.gift ? 'float-gentle' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {plan.gift && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-accent text-accent-foreground px-3 py-1">
                    <Gift className="w-3 h-3 mr-1" />
                    Gift
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-accent">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`btn-${plan.buttonVariant} w-full py-3 text-lg font-medium rounded-full ${
                    plan.highlight ? 'shadow-lg hover:shadow-xl' : ''
                  }`}
                  size="lg"
                >
                  {plan.gift && <Gift className="w-4 h-4 mr-2" />}
                  {plan.popular && <Sparkles className="w-4 h-4 mr-2" />}
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Toggle */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="outline"
            className="btn-gentle"
          >
            {showComparison ? 'Hide' : 'Show'} Feature Comparison
          </Button>
        </div>

        {/* Feature Comparison Table */}
        {showComparison && (
          <Card className="card-warm backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                Feature Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left py-3 px-4 text-foreground font-medium">Feature</th>
                      <th className="text-center py-3 px-4 text-foreground font-medium">Free</th>
                      <th className="text-center py-3 px-4 text-foreground font-medium">Supporter</th>
                      <th className="text-center py-3 px-4 text-foreground font-medium">Premium</th>
                      <th className="text-center py-3 px-4 text-foreground font-medium">Sponsor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="border-b border-border/20">
                        <td className="py-3 px-4 text-foreground">{item.feature}</td>
                        <td className="text-center py-3 px-4">
                          {item.free ? (
                            <Check className="w-4 h-4 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.supporter ? (
                            <Check className="w-4 h-4 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.premium ? (
                            <Check className="w-4 h-4 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {item.sponsor ? (
                            <Check className="w-4 h-4 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Questions about our plans? We're here to help.
          </p>
          <Button variant="outline" className="btn-gentle">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};