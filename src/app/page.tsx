"use client";

import React, { useState } from "react";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { Edit2, Check } from "lucide-react";

const DEFAULT_REFERENCE = "For God so loved the world that he gave his only Son that whoever believes in him should not perish but have eternal life";

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_REFERENCE);
  const {
    alignment,
    transcript,
    score,
    isRecording,
    isTranscribing,
    error,
    handleStart,
    handleStop,
    handleReset,
    setReferenceText,
  } = useVoiceChecker(inputText);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center px-4 py-12 md:py-20">
      <div className="w-full max-w-2xl flex flex-col gap-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Voice Checker
          </h1>
          <p className="text-zinc-500 font-medium tracking-wide">
            Practice your recitation and get instant feedback.
          </p>
        </header>

        {/* Reference Input/Display Area */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              Target Passage
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 transition-all text-xs font-bold uppercase tracking-wider"
            >
              {isEditing ? (
                <>
                  <Check size={14} />
                  Save
                </>
              ) : (
                <>
                  <Edit2 size={14} />
                  Edit
                </>
              )}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setReferenceText(e.target.value);
              }}
              className="w-full p-6 h-40 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 outline-none transition-all text-xl leading-relaxed font-medium resize-none shadow-2xl"
              placeholder="Enter reference text here..."
            />
          ) : (
            <ReferenceDisplay alignment={alignment} />
          )}
        </section>

        {/* Feedback Area */}
        <section className="space-y-8">
          <TranscriptPanel 
            transcript={transcript} 
            isTranscribing={isTranscribing} 
          />

          {error && (
            <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-medium flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          <Controls
            isRecording={isRecording}
            isTranscribing={isTranscribing}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            score={score}
          />
        </section>

        {/* Instructions */}
        <footer className="mt-12 text-center space-y-6">
          <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">How to use</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-500 font-medium">
            <div className="p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/30">
              <span className="text-zinc-400 block mb-1">Step 1</span>
              Enter text using the edit button above.
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/30">
              <span className="text-zinc-400 block mb-1">Step 2</span>
              Tap the red mic to start recording.
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/30">
              <span className="text-zinc-400 block mb-1">Step 3</span>
              Recite the text clearly and tap stop.
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/30">
              <span className="text-zinc-400 block mb-1">Step 4</span>
              Review your accuracy and retry.
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
