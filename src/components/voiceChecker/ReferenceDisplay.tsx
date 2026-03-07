"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlignmentResult } from "../../core/align";

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
    <div className="p-12 glass-panel rounded-[2rem] flex flex-col gap-6 relative">
      <div className="flex justify-center items-center px-[25px]">
        <h2 className="text-[14px] font-semibold text-zinc-100 uppercase tracking-wide text-center">
          Target Passage
        </h2>
        <button
          onClick={onEditToggle}
          className="absolute right-[25px] flex items-center justify-center rounded-[35px] bg-[#ffffff0d] text-[#ffffff] text-[12px] font-bold uppercase transition-all hover:bg-white/10 shadow-lg w-[75px] h-[25px] border-none p-0"
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>
      
      <div className="p-12 mx-[25px] mb-[25px] glass-inner rounded-[1.5rem] min-h-[140px] overflow-hidden">
        <div className="text-[18px] leading-relaxed font-normal text-white px-[25px] py-[10px] break-words whitespace-pre-wrap">
          {alignment.length === 0 ? (
            <span className="text-zinc-600 italic">No reference text loaded...</span>
          ) : (
            alignment.map((item, idx) => {
              if (item.status === "whitespace") {
                return (
                  <span key={idx}>
                    {item.ref}
                  </span>
                );
              }

              if (!item.ref) return null;

              return (
                <motion.span
                  key={idx}
                  initial={false}
                  animate={{
                    color: item.status === "substituted" ? "#f97316" : "#ffffff",
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative inline"
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
