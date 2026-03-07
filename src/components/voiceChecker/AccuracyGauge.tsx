"use client";

import React from "react";
import { motion } from "framer-motion";

interface AccuracyGaugeProps {
  score: number;
  matchedWords?: number;
  totalWords?: number;
}

export const AccuracyGauge: React.FC<AccuracyGaugeProps> = ({
  score,
  matchedWords,
  totalWords,
}) => {
  const percentage = Math.round(score * 100);

  return (
    <div className="!p-24 glass-panel rounded-[2rem] flex flex-col items-center gap-6">
      <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide">
        Accuracy
      </h2>

      <div className="relative w-full max-w-[400px] mt-4">
        {/* Gradient Bar */}
        <div className="h-[12px] w-full rounded-full bg-gradient-to-r from-[#ff3b30] via-[#ffcc00] to-[#34c759] relative overflow-hidden">
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Needle/Indicator */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${score * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
        >
          <div 
            className="w-[12px] h-[12px] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(1px)',
              WebkitBackdropFilter: 'blur(1px)'
            }}
          />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1 mt-2">
        <span className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide leading-none pt-[5px]">
          {percentage}%
        </span>
        {matchedWords !== undefined && totalWords !== undefined && (
          <span className="text-zinc-400 text-[16px] font-medium pb-[10px]">
            Matched words: {matchedWords} / {totalWords}
          </span>
        )}
      </div>
    </div>
  );
};
