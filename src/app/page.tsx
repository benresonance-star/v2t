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
    <main className="min-h-screen flex flex-col items-center px-8 md:px-12 py-12 md:py-20 max-w-2xl mx-auto">
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
                <div className="p-8 glass-panel rounded-[2rem] flex flex-col gap-4">
                  <div className="flex justify-between items-center px-0">
                    <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide">
                      Edit Passage
                    </h2>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setReferenceText(inputText);
                      }}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#f00000] text-white text-[12px] font-bold transition-all hover:bg-red-700 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:scale-105 active:scale-95"
                    >
                      <Check size={14} strokeWidth={3} />
                      Save Text
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full p-8 h-40 rounded-[1.5rem] glass-inner text-white focus:ring-1 focus:ring-white/10 outline-none transition-all text-[18px] leading-relaxed resize-none font-normal"
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
        <footer className="mt-4 glass-panel rounded-[1.5rem] overflow-hidden max-w-lg mx-auto w-full">
          <div className="py-3 text-center border-b border-white/5 bg-white/[0.01]">
            <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">How to use</h4>
          </div>
          
          <div className="divide-y divide-white/5">
            {[
              "Enter text using the edit button above.",
              "Tap the red mic to start recording.",
              "Recite the text clearly and tap stop.",
              "Review your accuracy and retry."
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-3 px-6 text-center group hover:bg-white/[0.01] transition-colors">
                <p className="text-[13px] font-medium text-[#878787] group-hover:text-zinc-300 transition-colors leading-relaxed">
                  <span className="mr-2 opacity-50">{i + 1}</span>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
