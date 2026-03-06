"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlignmentResult } from "../../core/align";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Edit2, Check } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ReferenceDisplayProps {
  alignment: AlignmentResult[];
  isEditing: boolean;
  onEditToggle: () => void;
}

export const ReferenceDisplay: React.FC<ReferenceDisplayProps> = ({ 
  alignment, 
  isEditing, 
  onEditToggle 
}) => {
  return (
    <div className="p-6 glass-panel rounded-[1.5rem] flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.15em]">
          Target Passage
        </h2>
        <button
          onClick={onEditToggle}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-button text-zinc-400 hover:text-zinc-100 text-[10px] font-medium transition-all"
        >
          {isEditing ? (
            <>
              <Check size={12} />
              Save Text
            </>
          ) : (
            <>
              <Edit2 size={12} />
              Edit Text
            </>
          )}
        </button>
      </div>
      
      <div className="p-5 glass-inner rounded-2xl min-h-[120px]">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2 text-[17px] leading-relaxed font-normal text-zinc-300">
          {alignment.length === 0 ? (
            <span className="text-zinc-600 italic">No reference text loaded...</span>
          ) : (
            alignment.map((item, idx) => {
              if (!item.ref) return null;

              return (
                <motion.span
                  key={idx}
                  initial={false}
                  animate={{
                    color: 
                      item.status === "correct" ? "#ffffff" : 
                      item.status === "substituted" ? "#fbbf24" : 
                      item.status === "omitted" ? "rgba(244, 63, 94, 0.4)" : 
                      "rgba(161, 161, 170, 0.6)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative inline-block",
                    item.status === "omitted" && "line-through decoration-rose-500/30",
                    item.status === "substituted" && "border-b border-amber-400/20"
                  )}
                >
                  {item.ref}
                </motion.span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
