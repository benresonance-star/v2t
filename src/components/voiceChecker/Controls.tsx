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
    <div className="flex items-center justify-center w-full py-6">
      <div className="flex items-center gap-1 p-1.5 bg-zinc-900/80 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl">
        {/* Reset Button */}
        <button
          onClick={onReset}
          className="p-3.5 rounded-full text-zinc-500 hover:text-zinc-200 transition-all active:scale-90"
          title="Reset"
        >
          <RotateCcw size={18} />
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
              className="w-14 h-14 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center hover:from-zinc-600 hover:to-zinc-800 transition-all active:scale-95 disabled:opacity-20"
            >
              <Mic size={22} className="text-white" />
            </button>
          ) : (
            <button
              onClick={onStop}
              className="w-14 h-14 rounded-full bg-gradient-to-b from-rose-500 to-rose-700 border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_0_20px_rgba(244,63,94,0.3)] flex items-center justify-center active:scale-95"
            >
              <Square size={18} fill="white" className="text-white" />
            </button>
          )}
        </div>

        {/* Empty space to balance reset button */}
        <div className="w-12" />
      </div>
    </div>
  );
};
