"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { Edit2, Check, AlertCircle } from "lucide-react";

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
    <main className="min-h-screen flex flex-col items-center px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <div className="w-full flex flex-col gap-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase"
          >
            Voice Checker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 font-medium tracking-widest uppercase text-[10px]"
          >
            Practice your recitation and get instant feedback.
          </motion.p>
        </header>

        {/* Reference Input/Display Area */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              Target Passage
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-5 py-2 rounded-full glass-button text-zinc-400 hover:text-zinc-100 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              {isEditing ? (
                <>
                  <Check size={12} />
                  Save
                </>
              ) : (
                <>
                  <Edit2 size={12} />
                  Edit Text
                </>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setReferenceText(e.target.value);
                  }}
                  className="w-full p-8 h-48 rounded-[2.5rem] glass-panel bg-zinc-900/50 text-zinc-100 focus:ring-1 focus:ring-white/20 outline-none transition-all text-xl leading-relaxed font-serif-passage resize-none"
                  placeholder="Enter reference text here..."
                />
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ReferenceDisplay alignment={alignment} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Feedback Area */}
        <section className="space-y-8">
          <TranscriptPanel 
            transcript={transcript} 
            isTranscribing={isTranscribing} 
            score={score}
          />

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 glass-panel rounded-3xl border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-4 uppercase tracking-widest"
              >
                <AlertCircle size={18} className="text-rose-500" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

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
        <footer className="mt-10 space-y-12">
          <div className="flex items-center gap-6 justify-center">
            <div className="h-px bg-white/5 flex-1" />
            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">How to use</h4>
            <div className="h-px bg-white/5 flex-1" />
          </div>
          
          <div className="space-y-0 text-sm text-zinc-500 font-medium max-w-lg mx-auto">
            {[
              "Enter text using the edit button above.",
              "Tap the red mic to start recording.",
              "Recite the text clearly and tap stop.",
              "Review your accuracy and retry."
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-8 py-6 border-t border-white/5 last:border-b">
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-[10px] font-black text-zinc-400 border border-white/5">
                  {i + 1}
                </span>
                <p className="tracking-wide text-zinc-400">{step}</p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
