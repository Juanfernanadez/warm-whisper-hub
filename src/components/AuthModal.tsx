import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Heart, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
}

export const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (authMode !== 'forgot') {
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    if (authMode === 'signup') {
      if (!name) {
        newErrors.name = "Name is required";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (authMode === 'forgot') {
        // Handle password reset
        setAuthMode('signin');
        setErrors({ success: "Password reset email sent! Check your inbox." });
      } else {
        // Handle sign in/up success
        const user = {
          email,
          name: authMode === 'signup' ? name : email.split('@')[0]
        };
        onAuthSuccess(user);
      }
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setErrors({});
    setShowPassword(false);
  };

  const switchMode = (mode: 'signin' | 'signup' | 'forgot') => {
    setAuthMode(mode);
    resetForm();
  };

  const getTitle = () => {
    switch (authMode) {
      case 'signin': return 'Welcome back';
      case 'signup': return 'Join our community';
      case 'forgot': return 'Reset your password';
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case 'signin': return 'Sign in to continue your journey';
      case 'signup': return 'Start your healing journey today';
      case 'forgot': return 'Enter your email to reset your password';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-border/30 text-white max-w-md p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {getTitle()}
            </DialogTitle>
            <p className="text-blue-200">
              {getSubtitle()}
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Back button for forgot password */}
          {authMode === 'forgot' && (
            <Button
              onClick={() => switchMode('signin')}
              variant="ghost"
              className="mb-4 text-blue-300 hover:text-white p-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Button>
          )}

          {/* Success message */}
          {errors.success && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
              <p className="text-green-300 text-sm">{errors.success}</p>
            </div>
          )}

          {/* Error message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-600/30 rounded-lg">
              <p className="text-red-300 text-sm">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field for signup */}
            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            {authMode !== 'forgot' && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}
              </div>
            )}

            {/* Confirm Password field for signup */}
            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot password link */}
            {authMode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 py-3 text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>
                    {authMode === 'signin' ? 'Signing in...' : 
                     authMode === 'signup' ? 'Creating account...' : 
                     'Sending reset email...'}
                  </span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {authMode === 'signin' ? 'Sign In' : 
                   authMode === 'signup' ? 'Create Account' : 
                   'Send Reset Email'}
                </>
              )}
            </Button>
          </form>

          {/* Mode switcher */}
          {authMode !== 'forgot' && (
            <>
              <div className="relative my-6">
                <Separator className="bg-slate-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-slate-900 px-3 text-sm text-slate-400">or</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-300 text-sm mb-3">
                  {authMode === 'signin' 
                    ? "Don't have an account yet?" 
                    : "Already have an account?"
                  }
                </p>
                <Button
                  onClick={() => switchMode(authMode === 'signin' ? 'signup' : 'signin')}
                  variant="outline"
                  className="border-slate-600 text-blue-300 hover:bg-slate-800 hover:text-white"
                >
                  {authMode === 'signin' ? 'Create Account' : 'Sign In Instead'}
                </Button>
              </div>
            </>
          )}

          {/* Privacy notice */}
          <div className="mt-6 pt-4 border-t border-slate-600/30">
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Your data is encrypted and secure. 🔒
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};