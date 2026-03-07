"use client";

import React from "react";
import { motion } from "framer-motion";
import { AccuracyGauge } from "./AccuracyGauge";
import { AlignmentResult } from "@/core/align";

interface TranscriptPanelProps {
  transcript: string;
  isTranscribing: boolean;
  score: number;
  alignment: AlignmentResult[];
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  transcript,
  isTranscribing,
  score,
  alignment,
}) => {
  const actualTokens = alignment.filter((a) => a.status !== "whitespace");
  const totalWords = actualTokens.filter((a) => a.ref !== null).length;
  const matchedWords = actualTokens.filter((a) => a.status === "correct").length;

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="!p-12 glass-panel rounded-[2rem] flex flex-col gap-8">
        <div className="space-y-4">
          <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide px-[25px] text-center">
            Your Speech
          </h2>
          <div className="text-zinc-100 text-[18px] leading-relaxed min-h-[50px] font-normal p-12 px-[25px] py-[15px] mx-[25px] mb-[25px] glass-inner rounded-[1.5rem] break-words overflow-hidden whitespace-pre-wrap">
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
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Analyzing Speech...
                </span>
              </div>
            ) : (
              <span className="not-italic text-zinc-100 font-medium whitespace-pre-wrap">
                {transcript}
              </span>
            )}
          </div>
        </div>
      </div>

      <AccuracyGauge
        score={score}
        matchedWords={matchedWords}
        totalWords={totalWords}
      />
    </div>
  );
};
