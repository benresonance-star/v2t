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
        <div className="flex flex-col items-center gap-10">
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
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 group shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <CheckCircle2 size={20} className="text-white" />
            </div>
            <span className="text-white font-medium tracking-wide text-lg">
              Finish and check attempt
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};
