"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { AlertCircle, Check } from "lucide-react";

const DEFAULT_REFERENCE = "For God so loved the world that he gave his only Son that whoever believes in him should not perish but have eternal life";

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_REFERENCE);

  const {
    alignment,
    transcript,
    score,
    isRecording,
    isPaused,
    isTranscribing,
    hasMicrophone,
    error,
    handleStart,
    handlePause,
    handleResume,
    handleStop,
    handleReset,
    setReferenceText,
  } = useVoiceChecker(inputText);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("v2t_target_passage");
    if (saved) {
      setInputText(saved);
      setReferenceText(saved);
    }
  }, [setReferenceText]);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center py-12 md:py-20 max-w-4xl mx-auto px-[25px] pt-[env(safe-area-inset-top)]">
      <div className="w-full flex flex-col gap-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <Image
              src="/logo.png?v=2"
              alt="RECITE Logo"
              width={120}
              height={120}
              className="rounded-[2rem] shadow-2xl"
              priority
            />
          </motion.div>
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-semibold text-white tracking-tight"
            >
              RECITE
            </motion.h1>
          </div>
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
                <div className="p-12 glass-panel rounded-[2rem] flex flex-col gap-6">
                  <div className="flex justify-between items-center px-[25px]">
                    <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide">
                      Edit Passage
                    </h2>
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("v2t_target_passage", inputText);
                          setReferenceText(inputText);
                          setIsEditing(false);
                        } catch (e) {
                          console.error("Failed to save to localStorage:", e);
                          // Fallback or alert if needed
                        }
                      }}
                      className="flex items-center justify-center rounded-[35px] bg-[#ffffff0d] text-[#ffffff] text-[12px] font-bold uppercase transition-all hover:bg-white/10 shadow-lg w-[75px] h-[25px] border-none p-0"
                    >
                      SAVE
                    </button>
                  </div>
                  <div className="mx-[25px] mb-[25px] rounded-[1.5rem] glass-inner overflow-hidden relative">
                          <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-12 pr-[50px] pl-[25px] min-h-[160px] !text-[#ffffff] outline-none transition-all text-[18px] leading-relaxed resize-none font-normal bg-transparent border-none focus:ring-0 overflow-hidden block"
                            style={{ boxSizing: 'border-box' }}
                            placeholder="Enter reference text here..."
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      ref={(el) => {
                        if (el) {
                          el.style.height = "auto";
                          el.style.height = `${el.scrollHeight}px`;
                        }
                      }}
                    />
                  </div>
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
        <section className="mt-[25px] space-y-6">
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
            isPaused={isPaused}
            isTranscribing={isTranscribing}
            hasMicrophone={hasMicrophone}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
            onReset={handleReset}
          />
        </section>

        {/* Instructions */}
        <footer className="mt-4 mb-[20px] glass-panel rounded-[1.5rem] overflow-hidden max-w-lg mx-auto w-full">
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
                  <span className="mr-[5px] opacity-50">{i + 1}</span>
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
