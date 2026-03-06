"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  isTranscribing: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  score: number;
}

export const Controls: React.FC<ControlsProps> = ({
  isRecording,
  isTranscribing,
  onStart,
  onStop,
  onReset,
  score,
}) => {
  return (
    <div className="flex items-center justify-center w-full py-10">
      <div className="flex items-center gap-4 p-2 glass-panel rounded-full relative">
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-4 rounded-full text-zinc-500 hover:text-zinc-200 transition-all active:scale-90"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>

        {/* Glossy Record Button */}
        <div className="relative group">
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.2 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-rose-500 blur-xl"
              />
            )}
          </AnimatePresence>

          {!isRecording ? (
            <button
              onClick={onStart}
              disabled={isTranscribing}
              className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center hover:from-zinc-600 hover:to-zinc-800 transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed group"
            >
              <Mic size={32} className="text-white group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onStop}
              className="w-20 h-20 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center animate-pulse active:scale-95"
            >
              <Square size={28} fill="white" className="text-white" />
            </button>
          )}
        </div>

        {/* Balanced Spacer */}
        <div className="w-12" />
      </div>
    </div>
  );
};
