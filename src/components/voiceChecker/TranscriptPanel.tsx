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
    <div className="p-8 glass-panel rounded-[2.5rem] flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
          Your Speech
        </h2>
        <div className="text-zinc-300 italic text-xl leading-relaxed min-h-[60px]">
          {isTranscribing ? (
            <div className="flex items-center gap-4 text-sky-400">
              <div className="flex gap-1.5">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 bg-sky-400 rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-sky-400 rounded-full" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-sky-400 rounded-full" 
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Analyzing...</span>
            </div>
          ) : transcript ? (
            <span className="not-italic text-zinc-200 font-medium">{transcript}</span>
          ) : (
            <span className="text-zinc-700 text-lg">Wait for transcript...</span>
          )}
        </div>
      </div>

      {/* Integrated Accuracy Bar */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Accuracy</span>
          <span className="text-xl font-bold text-zinc-100 tracking-tighter">
            {Math.round(score * 100)}%
          </span>
        </div>
        <div className="h-1 bg-zinc-900/50 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="h-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10"
          />
        </div>
      </div>
    </div>
  );
};
