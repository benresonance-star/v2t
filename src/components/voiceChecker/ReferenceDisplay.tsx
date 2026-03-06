"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignmentResult } from "../../core/align";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ReferenceDisplayProps {
  alignment: AlignmentResult[];
}

export const ReferenceDisplay: React.FC<ReferenceDisplayProps> = ({ alignment }) => {
  return (
    <div className="p-8 glass-panel rounded-[2rem] min-h-[180px]">
      <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6">
        Target Passage
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-4 text-2xl leading-relaxed font-serif-passage">
        {alignment.length === 0 ? (
          <span className="text-zinc-700 italic">No reference text loaded...</span>
        ) : (
          alignment.map((item, idx) => {
            if (!item.ref) return null;

            return (
              <motion.span
                key={idx}
                initial={false}
                animate={{
                  color: 
                    item.status === "correct" ? "#34d399" : 
                    item.status === "substituted" ? "#fbbf24" : 
                    item.status === "omitted" ? "rgba(244, 63, 94, 0.3)" : 
                    "rgba(212, 212, 216, 0.5)",
                  scale: item.status === "correct" ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "relative inline-block transition-all duration-500",
                  item.status === "omitted" && "line-through decoration-rose-500/20",
                  item.status === "substituted" && "border-b border-amber-400/30"
                )}
              >
                {item.ref}
              </motion.span>
            );
          })
        )}
      </div>
    </div>
  );
};
