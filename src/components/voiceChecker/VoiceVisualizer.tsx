"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isRecording }) => {
  // Generate 25 bars with varying base heights and animation properties
  const bars = Array.from({ length: 25 }).map((_, i) => {
    const distanceFromCenter = Math.abs(i - 12);
    const baseHeight = Math.max(4, 16 - distanceFromCenter * 0.8);
    return {
      id: i,
      baseHeight,
      duration: 0.6 + Math.random() * 0.4,
      delay: i * 0.03,
      multiplier: 1.5 + Math.random() * 2,
    };
  });

  if (!isRecording) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.08] backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-[280px] h-[54px] mx-auto overflow-hidden shrink-0"
    >
      {/* Microphone Icon with soft background */}
      <div className="w-9 h-9 rounded-full bg-white/[0.12] flex items-center justify-center border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] shrink-0">
        <Mic size={16} className="text-white" strokeWidth={2.5} />
      </div>

      {/* Animated Bands */}
      <div className="flex items-center gap-[3px] h-full px-1 flex-1 justify-center">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-[3px] bg-white rounded-full"
            initial={{ height: bar.baseHeight }}
            animate={{
              height: [
                bar.baseHeight, 
                bar.baseHeight * bar.multiplier, 
                bar.baseHeight * 0.7, 
                bar.baseHeight
              ],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              delay: bar.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
