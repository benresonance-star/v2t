"use client";

import React from "react";
import { motion } from "framer-motion";

interface TranscriptPanelProps {
  transcript: string;
  isTranscribing: boolean;
  score: number;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  transcript,
  isTranscribing,
  score,
}) => {
  return (
    <div className="!p-12 glass-panel rounded-[2rem] flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide">
          Your Speech
        </h2>
        <div className="text-zinc-100 text-[18px] leading-relaxed min-h-[50px] font-normal p-6">
          {isTranscribing ? (
            <div className="flex items-center gap-3 text-sky-400">
              <div className="flex gap-1">
                <motion.div 
                  animate={{ scale: [1, 1.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.4, 1] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full" 
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Analyzing Speech...</span>
            </div>
          ) : transcript ? (
            <span className="not-italic text-zinc-100 font-medium">{transcript}</span>
          ) : (
            <span className="text-zinc-600 text-base">Speech transcript will appear here...</span>
          )}
        </div>
      </div>

      {/* Integrated Accuracy Bar */}
      <div className="pt-5 border-t border-white/5 space-y-3">
        <div className="flex justify-between items-end px-0.5">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em]">Accuracy</span>
          <span className="text-lg font-bold text-zinc-100 tracking-tight">
            {Math.round(score * 100)}%
          </span>
        </div>
        <div className="h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.2)] relative z-10"
          />
        </div>
      </div>
    </div>
  );
};
