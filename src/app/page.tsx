"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { AlertCircle } from "lucide-react";
import saveStyles from "./SaveButton.module.css";

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
  const [showHelp, setShowHelp] = useState(false);
  const [helpIconVisible, setHelpIconVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setHelpIconVisible(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center py-12 md:py-20 pb-32 md:pb-40 max-w-4xl mx-auto px-[25px] pt-[env(safe-area-inset-top)] relative">
      {/* Help button - top right, hides on scroll */}
      <button
        onClick={() => setShowHelp(true)}
        className={`fixed top-[calc(env(safe-area-inset-top)+16px)] right-[25px] z-20 flex items-center justify-center rounded-full bg-[#ffffff0d] transition-all duration-300 hover:bg-white/10 shadow-lg w-[28.5px] h-[28.5px] border-[0.5px] p-0 ${helpIconVisible && !isEditing ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ borderColor: '#38383d' }}
        aria-label="How to use"
      >
        <span className="text-[18px] font-medium leading-none" style={{ color: '#71717a' }}>?</span>
      </button>

      <div className="w-full flex flex-col gap-8">
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
              width={91}
              height={91}
              className="object-contain shadow-2xl"
              priority
            />
          </motion.div>
          <div className="space-y-2 -mt-[15px]">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[27px] font-semibold tracking-tight"
              style={{ color: '#b8b8bc' }}
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
                  <div className="flex justify-between items-center px-[25px] relative">
                    <div className="flex-1" />
                    <h2 
                      className="text-[14px] font-semibold uppercase tracking-[0.0525em]"
                      style={{ color: '#71717a' }}
                    >
                      Edit Passage
                    </h2>
                    <div className="flex-1 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.97, y: 1 }}
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
                        className={`${saveStyles.container} w-[85px] h-[32px] z-30 touch-manipulation`}
                      >
                        <div className={saveStyles.bloom} />
                        <div className={saveStyles.edgeGlow} />
                        <div className={saveStyles.shell}>
                          <div className={saveStyles.reflection} />
                          <div 
                            className={`${saveStyles.content} text-[12px] font-bold uppercase tracking-wider`}
                            style={{ color: '#71717a' }}
                          >
                            SAVE
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                  <div className="mx-[25px] mb-[25px] rounded-[1.5rem] glass-inner overflow-hidden relative">
                    <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-12 pr-[50px] pl-[25px] pt-[58px] pb-[58px] min-h-[160px] !text-[#ffffff] outline-none transition-all text-[18px] leading-relaxed resize-none font-normal bg-transparent border-none focus:ring-0 overflow-hidden block"
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
                  isRecording={isRecording}
                  onEditToggle={() => setIsEditing(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Feedback Area */}
        <section className="mt-[15px] space-y-6">
          <AnimatePresence>
            {(isTranscribing || transcript) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <TranscriptPanel 
                  transcript={transcript} 
                  isTranscribing={isTranscribing} 
                  score={score}
                  alignment={alignment}
                />
              </motion.div>
            )}
          </AnimatePresence>

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

        {/* Help popup */}
        <AnimatePresence>
          {showHelp && (
            <>
              <motion.div
                key="help-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHelp(false)}
                className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                key="help-modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-1/2 top-1/2 z-40 w-[calc(72.5%-25px)] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col p-0"
                style={{ background: "#18181b", isolation: "isolate" }}
              >
                <div className="py-4 text-center border-b border-white/10 bg-[#27272a] rounded-t-[2rem] shrink-0 mt-0">
                  <h4 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide m-0">How to use</h4>
                </div>
                <div className="p-6 space-y-4 bg-[#18181b] text-center">
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3">
                    <span className="mr-[10px] font-bold text-zinc-400">1</span>
                    Tap the mic to begin reciting
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3">
                    <span className="mr-[10px] font-bold text-zinc-400">2</span>
                    Pause anytime to catch your breath
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3">
                    <span className="mr-[10px] font-bold text-zinc-400">3</span>
                    Tap Stop to check your accuracy
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3">
                    <span className="mr-[10px] font-bold text-zinc-400">4</span>
                    Paste or type a passage using Edit
                  </p>
                </div>
                <div className="p-4 border-t border-white/10 bg-[#18181b]">
                  <button
                    onClick={() => setShowHelp(false)}
                    className="w-full flex items-center justify-center rounded-[35px] bg-[#ffffff0d] text-[#ffffff] text-[12px] font-bold uppercase transition-all hover:bg-white/10 shadow-lg h-[35px] border-none p-0"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
