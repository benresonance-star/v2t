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
  isTargetEmpty?: boolean;
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
  isTargetEmpty,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
}) => {
  const micColor = (hasMicrophone === false || isTargetEmpty) ? "#ef4444" : "#22c55e";
  const resetColor = hasMicrophone === false ? "#ef4444" : "#f97316";
  const pauseColor = "#eab308"; // Yellow-500
  const stopColor = "#ef4444"; // Red-500

  return (
    <div className="flex flex-col items-center justify-center w-full py-[30px] gap-8">
      {/* Recording Controls */}
      {!isRecording ? (
        <div className="relative">
          <MicButton
            state={(isTranscribing || isTargetEmpty) ? "disabled" : "idle"}
            onClick={onStart}
            disabled={isTranscribing || hasMicrophone === false || isTargetEmpty}
            size={100}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[30px]">
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
              <div className={finishStyles.content + " flex items-center gap-7 px-[30px] py-[15px]"}>
                <CheckCircle2 size={22} style={{ color: "#f97316" }} />
                <span className="font-bold tracking-wider text-[19px]" style={{ color: "#f97316" }}>
                  FINISH RECORDING
                </span>
              </div>
            </div>
          </motion.button>
        </div>
      )}
    </div>
  );
};
