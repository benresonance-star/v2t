"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw, Pause, Play } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  isTranscribing: boolean;
  hasMicrophone: boolean | null;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRecording,
  isPaused,
  isTranscribing,
  hasMicrophone,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
}) => {
  const micColor = hasMicrophone === false ? "#ef4444" : "#22c55e";
  const resetColor = hasMicrophone === false ? "#ef4444" : "#f97316";
  const pauseColor = "#eab308"; // Yellow-500
  const stopColor = "#ef4444"; // Red-500

  return (
    <div className="flex items-center justify-center w-full py-[75px] gap-[75px]">
      {/* Reset Button */}
      {!isRecording && (
        <button
          onClick={onReset}
          className="w-[100px] h-[50px] rounded-full glass-button text-white hover:bg-white/10 transition-all active:scale-90 shadow-xl flex items-center justify-center"
          title="Reset"
        >
          <RotateCcw size={32} color={resetColor} />
        </button>
      )}

      {/* Recording Controls */}
      {!isRecording ? (
        <div className="relative">
          <button
            onClick={onStart}
            disabled={isTranscribing}
            className="w-[100px] h-[50px] rounded-full glass-button bg-gradient-to-b from-white/10 to-white/5 border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center hover:from-white/20 hover:to-white/10 transition-all active:scale-95 disabled:opacity-20"
          >
            <Mic size={32} color={micColor} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-[37.5px]">
          {/* Pause/Resume Button */}
          <div className="relative">
            <AnimatePresence>
              {!isPaused && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0.15 }}
                  exit={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-red-500 blur-md"
                />
              )}
            </AnimatePresence>
            
            <motion.button
              onClick={isPaused ? onResume : onPause}
              animate={!isPaused ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`w-[100px] h-[50px] rounded-full glass-button bg-gradient-to-b from-white/10 to-white/5 border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center hover:from-white/20 hover:to-white/10 transition-all active:scale-95`}
            >
              {isPaused ? (
                <Play size={32} color={micColor} fill={micColor} />
              ) : (
                <Pause size={32} color={pauseColor} fill={pauseColor} />
              )}
            </motion.button>
          </div>

          {/* Stop Button */}
          <motion.button
            onClick={onStop}
            className="w-[100px] h-[50px] rounded-full bg-[#ef4444] border border-white/20 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center active:scale-95"
          >
            <Square size={32} fill="white" color="white" />
          </motion.button>
        </div>
      )}
    </div>
  );
};
