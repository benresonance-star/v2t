"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isRecording }) => {
  // Generate 25 bars with varying base heights and animation properties
  // We'll use a sine-like distribution for a more natural look
  const bars = Array.from({ length: 25 }).map((_, i) => {
    const distanceFromCenter = Math.abs(i - 12);
    const baseHeight = Math.max(4, 16 - distanceFromCenter * 0.8); // Center bars are taller
    return {
      id: i,
      baseHeight,
      duration: 0.6 + Math.random() * 0.4, // 0.6s to 1.0s
      delay: i * 0.03,
      multiplier: 1.5 + Math.random() * 2, // How much it grows
    };
  });

  if (!isRecording) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-fit mx-auto"
    >
      {/* Microphone Icon with soft background - mimicking the image */}
      <div className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <Mic size={16} className="text-zinc-200" strokeWidth={2.5} />
      </div>

      {/* Animated Bands */}
      <div className="flex items-center gap-[3px] h-6 px-1">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-[3px] bg-zinc-300 rounded-full"
            initial={{ height: bar.baseHeight }}
            animate={{
              height: [
                bar.baseHeight, 
                bar.baseHeight * bar.multiplier, 
                bar.baseHeight * 0.7, 
                bar.baseHeight
              ],
              opacity: [0.5, 1, 0.5],
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
