import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Lock, Users } from "lucide-react";

interface MoodLogPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, note: string, isPrivate: boolean) => void;
  currentStreak: number;
}

const moodEmojis = [
  { emoji: "😄", label: "Happy", value: "happy" },
  { emoji: "🙂", label: "Calm", value: "calm" },
  { emoji: "😐", label: "Meh", value: "neutral" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😢", label: "Crying", value: "crying" },
  { emoji: "😠", label: "Angry", value: "angry" },
  { emoji: "😩", label: "Overwhelmed", value: "overwhelmed" },
  { emoji: "😌", label: "Peaceful", value: "peaceful" },
  { emoji: "🥰", label: "Loved", value: "loved" },
];

export const MoodLogPopup = ({ isOpen, onClose, onSubmit, currentStreak }: MoodLogPopupProps) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedMood("");
      setNote("");
      setIsPrivate(true);
      setShowSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(selectedMood, note, isPrivate);
    setShowSuccess(true);
    
    // Show success animation then close
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 2000);
  };

  const selectedEmojiData = moodEmojis.find(m => m.value === selectedMood);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="card-warm w-full max-w-md relative z-10 slide-in-gentle">
        <CardHeader className="text-center pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground">
              How are you feeling right now?
            </CardTitle>
            {currentStreak > 0 && (
              <Badge className="streak-badge bg-accent/20 text-accent border-accent/30 mt-2">
                🔥 {currentStreak} day streak!
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {showSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-6xl animate-bounce">
                {selectedEmojiData?.emoji}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Thanks for checking in! 🌱
                </h3>
                <p className="text-muted-foreground">
                  That's {currentStreak + 1} days in a row!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Emoji Picker */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Tap an emoji that matches your mood
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {moodEmojis.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`emoji-picker p-4 rounded-xl text-4xl transition-all duration-200 ${
                        selectedMood === mood.value
                          ? 'bg-accent/20 border-2 border-accent/50 scale-110'
                          : 'bg-muted/10 border border-border/30 hover:bg-accent/10 hover:border-accent/30'
                      }`}
                    >
                      <div className="mb-1">{mood.emoji}</div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Want to talk about it? (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="sparkly-input w-full p-4 rounded-lg bg-input border border-border/30 text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
                />
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/20">
                <div className="flex items-center space-x-2">
                  {isPrivate ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Users className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {isPrivate ? "Private" : "Share anonymously"}
                  </span>
                </div>
                <button
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPrivate ? 'bg-muted' : 'bg-accent'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPrivate ? 'translate-x-1' : 'translate-x-6'
                    }`}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!selectedMood || isSubmitting}
                className="btn-rain w-full py-3 text-lg font-medium rounded-full"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Log My Mood
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};