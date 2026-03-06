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
    <div className="!p-12 glass-panel rounded-[2rem] flex flex-col gap-6">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide">
          Target Passage
        </h2>
        <button
          onClick={onEditToggle}
          className="flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#f00000] text-white text-[12px] font-bold uppercase transition-all hover:bg-red-700 shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:scale-105 active:scale-95 min-w-[120px]"
        >
          {isEditing ? (
            <>
              <Check size={14} strokeWidth={3} />
              SAVE TEXT
            </>
          ) : (
            <>
              <Edit2 size={14} strokeWidth={3} />
              EDIT TEXT
            </>
          )}
        </button>
      </div>
      
      <div className="glass-inner rounded-[1.5rem] min-h-[140px]">
        <div className="flex flex-wrap gap-x-2 gap-y-3 text-[18px] leading-relaxed font-normal text-white">
          {alignment.length === 0 ? (
            <span className="text-zinc-600 italic">No reference text loaded...</span>
          ) : (
            alignment.map((item, idx) => {
              if (!item.ref) return null;

              return (
                <React.Fragment key={idx}>
                  <motion.span
                    initial={false}
                    animate={{
                      color: "#ffffff",
                      opacity: item.status === "correct" ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "relative inline-block whitespace-pre",
                      item.status === "substituted" && "border-b border-amber-400/40"
                    )}
                  >
                    {item.ref}
                  </motion.span>
                  {idx < alignment.length - 1 && <span className="whitespace-pre"> </span>}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
