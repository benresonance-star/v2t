"use client";

import React from "react";
import { motion } from "framer-motion";

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isRecording }) => {
  // Generate 25 bars with varying base heights and animation properties
  const bars = Array.from({ length: 25 }).map((_, i) => {
    const distanceFromCenter = Math.abs(i - 12);
    const baseHeight = Math.max(4, 16 - distanceFromCenter * 0.8);
    
    // Calculate color interpolation between blue (#38bdf8) and pink (#f472b6)
    // i ranges from 0 to 24
    const ratio = i / 24;
    // Simple linear interpolation (lerp) for colors
    // Blue: R=56, G=189, B=248
    // Pink: R=244, G=114, B=182
    const r = Math.round(56 + (244 - 56) * ratio);
    const g = Math.round(189 + (114 - 189) * ratio);
    const b = Math.round(248 + (182 - 248) * ratio);
    const color = `rgb(${r}, ${g}, ${b})`;

    return {
      id: i,
      baseHeight,
      duration: 0.6 + Math.random() * 0.4,
      delay: i * 0.03,
      multiplier: 1.5 + Math.random() * 2,
      color,
    };
  });

  if (!isRecording) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="flex items-center justify-center w-[320px] h-[54px] mx-auto overflow-hidden shrink-0"
    >
      {/* Animated Bands */}
      <div className="flex items-center gap-[3px] h-full px-1 flex-1 justify-center">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-[3px] rounded-full"
            style={{ backgroundColor: bar.color }}
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
