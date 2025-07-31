import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Play, Pause, Trash2, Download, Share, Lock, Unlock } from "lucide-react";

interface VoiceEntry {
  id: string;
  date: string;
  duration: number;
  title: string;
  mood: string;
  isPrivate: boolean;
  transcription?: string;
}

interface VoiceLogCompanionProps {
  onClose: () => void;
}

const mockEntries: VoiceEntry[] = [
  {
    id: "1",
    date: "2024-01-15",
    duration: 120,
    title: "Feeling overwhelmed today",
    mood: "😰",
    isPrivate: true,
    transcription: "I've been feeling really overwhelmed with everything going on..."
  },
  {
    id: "2",
    date: "2024-01-14",
    duration: 85,
    title: "Grateful for small moments",
    mood: "😊",
    isPrivate: false,
    transcription: "Today I noticed how beautiful the sunset was..."
  },
  {
    id: "3",
    date: "2024-01-13",
    duration: 200,
    title: "Processing difficult emotions",
    mood: "😔",
    isPrivate: true
  }
];

export const VoiceLogCompanion = ({ onClose }: VoiceLogCompanionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [entries, setEntries] = useState<VoiceEntry[]>(mockEntries);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<VoiceEntry | null>(null);
  const [showTranscription, setShowTranscription] = useState(false);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    
    // Create new entry
    const newEntry: VoiceEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      duration: recordingTime,
      title: "New voice log",
      mood: "😐",
      isPrivate: true
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setRecordingTime(0);
  };

  const togglePlayback = (entryId: string) => {
    if (playingId === entryId) {
      setPlayingId(null);
    } else {
      setPlayingId(entryId);
      // Simulate playback ending
      setTimeout(() => setPlayingId(null), 3000);
    }
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const togglePrivacy = (entryId: string) => {
    setEntries(prev => prev.map(entry => 
      entry.id === entryId ? { ...entry, isPrivate: !entry.isPrivate } : entry
    ));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Voice Log Companion
          </h1>
          <p className="text-blue-200 text-lg">
            Speak your emotions, keep them safe
          </p>
        </div>

        {/* Recording Section */}
        <Card className="bg-slate-800/50 border-purple-300/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-red-500/20 border-4 border-red-400 animate-pulse' 
                  : 'bg-purple-500/20 border-4 border-purple-400 hover:scale-105'
              }`}>
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </button>
              </div>
            </div>
            
            {isRecording && (
              <div className="space-y-2">
                <div className="text-2xl font-mono text-red-400">
                  {formatDuration(recordingTime)}
                </div>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-8 bg-red-400 rounded animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">
                {isRecording ? "Recording your emotions..." : "Log your emotion with your voice"}
              </h3>
              <p className="text-blue-200">
                {isRecording ? "Tap to stop and save" : "Tap the mic to start recording"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Voice Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Your Emotion Vault</h2>
            <Badge className="bg-purple-600 text-white">
              {entries.length} entries
            </Badge>
          </div>
          
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="bg-slate-800/50 border-slate-600/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{entry.mood}</div>
                      <div>
                        <h3 className="font-semibold text-white">{entry.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span>{entry.date}</span>
                          <span>{formatDuration(entry.duration)}</span>
                          <div className="flex items-center gap-1">
                            {entry.isPrivate ? (
                              <Lock className="w-3 h-3" />
                            ) : (
                              <Unlock className="w-3 h-3" />
                            )}
                            <span>{entry.isPrivate ? "Private" : "Shareable"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePlayback(entry.id)}
                        className="border-blue-300/30 text-blue-200"
                      >
                        {playingId === entry.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {entry.transcription && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowTranscription(true);
                          }}
                          className="border-green-300/30 text-green-200"
                        >
                          Text
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePrivacy(entry.id)}
                        className="border-purple-300/30 text-purple-200"
                      >
                        {entry.isPrivate ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteEntry(entry.id)}
                        className="border-red-300/30 text-red-200 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Features */}
        <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-300/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-yellow-200">Premium Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-yellow-300">
                  <Download className="w-4 h-4" />
                  <span>Transcribe to text automatically</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <Share className="w-4 h-4" />
                  <span>Create anonymous audio blog</span>
                </div>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transcription Modal */}
      <Dialog open={showTranscription} onOpenChange={setShowTranscription}>
        <DialogContent className="bg-slate-900 border-green-300/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Voice Transcription</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4 py-4">
              <div className="text-center space-y-2">
                <div className="text-2xl">{selectedEntry.mood}</div>
                <h3 className="font-semibold">{selectedEntry.title}</h3>
                <p className="text-sm text-green-200">{selectedEntry.date}</p>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-lg border border-green-300/20">
                <p className="text-green-100 leading-relaxed">
                  {selectedEntry.transcription}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Text
                </Button>
                <Button variant="outline" className="flex-1 border-green-300/30 text-green-200">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};