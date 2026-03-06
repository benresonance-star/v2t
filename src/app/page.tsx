"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { AlertCircle } from "lucide-react";

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
    <main className="min-h-screen flex flex-col items-center px-5 py-12 md:py-20 max-w-2xl mx-auto">
      <div className="w-full flex flex-col gap-16">
        {/* Header */}
        <header className="text-center space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-white tracking-tight"
          >
            Voice Checker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-sm font-normal"
          >
            Practice your recitation and get instant feedback.
          </motion.p>
        </header>

        {/* Reference Input/Display Area */}
        <section>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full"
              >
                <div className="p-6 glass-panel rounded-[1.5rem] flex flex-col gap-4">
                  <div className="flex justify-between items-center px-1">
                    <h2 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em]">
                      Edit Passage
                    </h2>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setReferenceText(inputText);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 text-[10px] font-bold transition-all"
                    >
                      Save Text
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full p-5 h-40 rounded-2xl glass-inner text-zinc-100 focus:ring-1 focus:ring-white/10 outline-none transition-all text-[17px] leading-relaxed resize-none"
                    placeholder="Enter reference text here..."
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ReferenceDisplay 
                  alignment={alignment} 
                  isEditing={isEditing}
                  onEditToggle={() => setIsEditing(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Feedback Area */}
        <section className="space-y-6">
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
                className="p-4 glass-panel rounded-2xl border-rose-500/20 text-rose-400 text-[11px] font-semibold flex items-center gap-3 uppercase tracking-wider"
              >
                <AlertCircle size={16} className="text-rose-500" />
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
          />
        </section>

        {/* Instructions */}
        <footer className="mt-4 glass-panel rounded-[1.5rem] overflow-hidden">
          <div className="py-4 text-center border-b border-white/5 bg-white/[0.01]">
            <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em]">How to use</h4>
          </div>
          
          <div className="divide-y divide-white/5">
            {[
              "Enter text using the edit button above.",
              "Tap the red mic to start recording.",
              "Recite the text clearly and tap stop.",
              "Review your accuracy and retry."
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-5 px-8 py-5 group hover:bg-white/[0.01] transition-colors">
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-zinc-900 text-[10px] font-bold text-zinc-500 border border-white/5 group-hover:border-white/10 transition-colors">
                  {i + 1}
                </span>
                <p className="text-[14px] font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">{step}</p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
