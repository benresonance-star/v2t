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
}

export const Controls: React.FC<ControlsProps> = ({
  isRecording,
  isTranscribing,
  onStart,
  onStop,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center w-full py-8 gap-12">
      {/* Reset Button */}
      <button
        onClick={onReset}
        className="p-5 rounded-full glass-button text-zinc-500 hover:text-zinc-200 transition-all active:scale-90 shadow-xl"
        title="Reset"
      >
        <RotateCcw size={24} />
      </button>

      {/* Glossy Record Button */}
      <div className="relative">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.15 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-rose-500 blur-md"
            />
          )}
        </AnimatePresence>

        {!isRecording ? (
          <button
            onClick={onStart}
            disabled={isTranscribing}
            className="w-20 h-20 rounded-full glass-button bg-gradient-to-b from-white/10 to-white/5 border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center hover:from-white/20 hover:to-white/10 transition-all active:scale-95 disabled:opacity-20"
          >
            <Mic size={32} className="text-white" />
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-20 h-20 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center active:scale-95"
          >
            <Square size={28} fill="white" className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
