"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { MicButton } from "../MicButton/MicButton";

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
    <div className="flex flex-col items-center justify-center w-full py-[75px] gap-8">
      {/* Recording Controls */}
      {!isRecording ? (
        <div className="relative">
          <MicButton
            state={isTranscribing ? "disabled" : "idle"}
            onClick={onStart}
            disabled={isTranscribing || hasMicrophone === false}
            size={100}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-14">
          {/* Pause/Resume Button */}
          <div className="relative">
            <MicButton
              state={isPaused ? "idle" : "listening"}
              icon={isPaused ? "play" : "pause"}
              onClick={isPaused ? onResume : onPause}
              size={100}
            />
          </div>

          {/* Finish Button - Only appears during recording/pause */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={onStop}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#111111] border border-white/5 hover:bg-[#1a1a1a] transition-all active:scale-95 group shadow-xl"
          >
            <CheckCircle2 size={18} className="text-white/90" />
            <span className="text-white/90 font-medium tracking-tight text-base">
              Finish and check attempt
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
