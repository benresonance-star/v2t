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
    <div className="p-6 glass-panel rounded-[1.5rem] flex flex-col gap-3">
      <div className="flex justify-between items-center px-5">
        <h2 className="text-[13px] font-medium text-zinc-200">
          Target Passage
        </h2>
        <button
          onClick={onEditToggle}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 text-white text-[11px] font-bold transition-all hover:bg-red-700 shadow-lg"
        >
          {isEditing ? (
            <>
              <Check size={12} strokeWidth={3} />
              Save Text
            </>
          ) : (
            <>
              <Edit2 size={12} strokeWidth={3} />
              Edit Text
            </>
          )}
        </button>
      </div>
      
      <div className="p-6 glass-inner rounded-[1.25rem] min-h-[120px]">
        <div className="flex flex-wrap gap-x-1.5 gap-y-2 text-[17px] leading-relaxed font-normal text-white">
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
                    color: "#ffffff",
                    opacity: item.status === "correct" ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative inline-block",
                    item.status === "substituted" && "border-b border-amber-400/40"
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
