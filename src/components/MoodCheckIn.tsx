import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface MoodCheckInProps {
  onComplete: (mood: number, tags: string[]) => void;
}

const moodEmojis = ["😢", "😞", "😐", "🙂", "😊", "😄", "🥰", "✨", "🌟", "🎉"];
const moodTags = [
  "sad", "anxious", "lonely", "neutral", "hopeful", 
  "grateful", "excited", "peaceful", "energetic", "joyful"
];

export const MoodCheckIn = ({ onComplete }: MoodCheckInProps) => {
  const [moodValue, setMoodValue] = useState([5]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getMoodText = (value: number) => {
    if (value <= 3) return "Having a tough day";
    if (value <= 5) return "Feeling neutral";
    if (value <= 7) return "Doing okay";
    return "Feeling great";
  };

  return (
    <div className="min-h-screen night-sky flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated star field background */}
      <div className="star-field">
        <div className="star star-small" style={{ top: '15%', left: '25%', animationDelay: '0.5s' }}></div>
        <div className="star star-medium" style={{ top: '25%', left: '75%', animationDelay: '1.5s' }}></div>
        <div className="star star-large" style={{ top: '35%', left: '65%', animationDelay: '2.5s' }}></div>
        <div className="star star-small" style={{ top: '55%', left: '15%', animationDelay: '3.5s' }}></div>
        <div className="star star-medium" style={{ top: '75%', left: '85%', animationDelay: '2s' }}></div>
        <div className="star star-small" style={{ top: '85%', left: '35%', animationDelay: '3s' }}></div>
      </div>

      {/* Rain effect */}
      <div className="rain-effect"></div>
      
      <Card className="card-warm w-full max-w-lg slide-in-gentle relative z-10 backdrop-blur-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-foreground drop-shadow-sm">
            How are you feeling?
          </CardTitle>
          <p className="text-muted-foreground">
            Take a moment to check in with yourself
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Mood slider with emoji */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-2 pulse-heart drop-shadow-lg">
                {moodEmojis[moodValue[0] - 1]}
              </div>
              <p className="text-lg font-medium text-accent drop-shadow-sm">
                {getMoodText(moodValue[0])}
              </p>
            </div>
            
            <div className="px-4">
              <Slider
                value={moodValue}
                onValueChange={setMoodValue}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Mood tags */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-foreground text-center">
              Describe your mood (optional)
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {moodTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-secondary text-secondary-foreground scale-105 shadow-md border-secondary/30"
                      : "hover:bg-accent hover:text-accent-foreground hover:scale-105 border-accent/30"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <div className="pt-4">
            <Button
              onClick={() => onComplete(moodValue[0], selectedTags)}
              className="btn-rain w-full py-6 text-lg font-medium rounded-full"
              size="lg"
            >
              🌧️ Continue
            </Button>
          </div>

          {/* Encouraging message */}
          <p className="text-center text-sm text-muted-foreground leading-relaxed">
            Every feeling is valid
            <br />
            <span className="text-secondary drop-shadow-sm">Like stars in the night sky ⭐</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};