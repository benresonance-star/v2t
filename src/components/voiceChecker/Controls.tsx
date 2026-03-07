"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import { MicButton } from "../MicButton/MicButton";
import finishStyles from "./FinishButton.module.css";

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
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97, y: 1 }}
            onClick={onStop}
            className={finishStyles.container}
          >
            {/* Background Bloom (Orange tint) */}
            <div className={finishStyles.bloom} />

            {/* Lower Edge Glow (Orange tint) */}
            <div className={finishStyles.edgeGlow} />

            {/* The Glass Shell */}
            <div className={finishStyles.shell}>
              {/* Top Reflection */}
              <div className={finishStyles.reflection} />

              {/* Content */}
              <div className={finishStyles.content + " flex items-center gap-4 px-7 py-3.5"}>
                <CheckCircle2 size={21} className="text-orange-500" />
                <span className="text-orange-500 font-medium tracking-tight text-lg">
                  Finish and check attempt
                </span>
              </div>
            </div>
          </motion.button>
        </div>
      )}
    </div>
  );
};
