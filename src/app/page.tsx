"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";
import { AlertCircle, Moon, Sun } from "lucide-react";
import saveStyles from "./SaveButton.module.css";

const DEFAULT_REFERENCE = "";

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_REFERENCE);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("v2t_theme") as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem("v2t_theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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

  const isTargetEmpty = inputText.trim() === "";

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
      <div className="w-full flex flex-col gap-8">
        {/* Header */}
        <header className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center cursor-pointer touch-manipulation"
            onClick={() => setShowHelp(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
              className="text-[27px] font-semibold tracking-tight cursor-pointer touch-manipulation"
              onClick={() => setShowHelp(true)}
            >
              <span style={{ color: 'var(--accent-blue)' }}>RE</span>
              <span style={{ color: 'var(--accent-pink)' }}>CITE</span>
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
                  <div className="flex justify-center items-center px-[25px] relative">
                    <h2 
                      className="text-[14px] font-semibold uppercase tracking-[0.0525em]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Edit Passage
                    </h2>
                  </div>
                  <div className="mx-[25px] mb-[15px] rounded-[1.5rem] overflow-hidden relative">
                    <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-12 pr-[12.5px] pl-[12.5px] pt-[58px] pb-[58px] min-h-[160px] !text-[var(--foreground)] outline-none transition-all text-[18px] leading-relaxed resize-none font-normal bg-transparent border-none focus:ring-0 overflow-hidden block relative z-10"
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
                  <div className="flex justify-center pb-[10px] relative z-50">
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
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          SAVE
                        </div>
                      </div>
                    </motion.button>
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
                  isPaused={isPaused}
                  onEditToggle={() => setIsEditing(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Feedback Area */}
        <section className="mt-[15px] space-y-6">
          <AnimatePresence>
            {(isTranscribing || (transcript && !isRecording)) && (
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
            isTargetEmpty={isTargetEmpty}
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
                <div className="py-4 text-center border-b border-white/10 bg-[#27272a] rounded-t-[2rem] shrink-0 mt-0" style={theme === 'light' ? { background: '#e5e5ea', borderColor: 'rgba(0,0,0,0.05)' } : {}}>
                  <h4 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide m-0" style={theme === 'light' ? { color: '#1c1c1e' } : {}}>How to use</h4>
                </div>
                <div className="p-6 space-y-4 bg-[#18181b] text-center" style={theme === 'light' ? { background: '#f5f3f1' } : {}}>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3" style={theme === 'light' ? { color: '#8e8e93' } : {}}>
                    <span className="mr-[10px] font-bold text-zinc-400" style={theme === 'light' ? { color: '#1c1c1e' } : {}}>1</span>
                    Tap the mic to begin reciting
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3" style={theme === 'light' ? { color: '#8e8e93' } : {}}>
                    <span className="mr-[10px] font-bold text-zinc-400" style={theme === 'light' ? { color: '#1c1c1e' } : {}}>2</span>
                    Pause anytime to catch your breath
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3" style={theme === 'light' ? { color: '#8e8e93' } : {}}>
                    <span className="mr-[10px] font-bold text-zinc-400" style={theme === 'light' ? { color: '#1c1c1e' } : {}}>3</span>
                    Tap Stop to check your accuracy
                  </p>
                  <p className="text-[13px] font-medium text-[#878787] leading-relaxed py-2 px-3" style={theme === 'light' ? { color: '#8e8e93' } : {}}>
                    <span className="mr-[10px] font-bold text-zinc-400" style={theme === 'light' ? { color: '#1c1c1e' } : {}}>4</span>
                    Paste or type a passage using Edit
                  </p>

                  {/* Theme Toggle Switch */}
                  <div className="pt-6 border-t border-white/5 mt-6" style={theme === 'light' ? { borderColor: 'rgba(0,0,0,0.05)' } : {}}>
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme === 'light' ? '#8e8e93' : '#71717a' }}>
                        Appearance
                      </span>
                      <button
                        onClick={toggleTheme}
                        className="relative w-[140px] h-[44px] rounded-full transition-all duration-500 focus:outline-none p-1 flex items-center shadow-inner overflow-hidden"
                        style={{ 
                          background: theme === 'dark' ? '#27272a' : '#e5e5ea',
                          boxShadow: theme === 'light' ? 'inset 0 2px 4px rgba(0,0,0,0.05)' : 'inset 0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {/* Labels inside the pill */}
                        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                          <Moon size={14} className={theme === 'dark' ? 'text-white' : 'text-zinc-400'} />
                          <Sun size={14} className={theme === 'light' ? 'text-orange-500' : 'text-zinc-600'} />
                        </div>

                        {/* Sliding Ball */}
                        <motion.div
                          className="w-[64px] h-[36px] rounded-full bg-white shadow-lg flex items-center justify-center z-10"
                          animate={{ x: theme === 'dark' ? 0 : 68 }}
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                          style={{
                            background: theme === 'dark' ? '#3f3f46' : '#ffffff',
                            boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: theme === 'dark' ? '#ffffff' : '#1c1c1e' }}>
                            {theme === 'dark' ? 'DARK' : 'LIGHT'}
                          </span>
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/10 bg-[#18181b]" style={theme === 'light' ? { background: '#f5f3f1', borderColor: 'rgba(0,0,0,0.05)' } : {}}>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="w-full flex items-center justify-center rounded-[35px] bg-[#ffffff0d] text-[#ffffff] text-[12px] font-bold uppercase transition-all hover:bg-white/10 shadow-lg h-[35px] border-none p-0"
                    style={theme === 'light' ? { background: '#e5e5ea', color: '#1c1c1e' } : {}}
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
