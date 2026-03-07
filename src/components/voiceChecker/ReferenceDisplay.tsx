"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlignmentResult } from "../../core/align";
import saveStyles from "../../app/SaveButton.module.css";

interface ReferenceDisplayProps {
  alignment: AlignmentResult[];
  isEditing: boolean;
  isRecording: boolean;
  onEditToggle: () => void;
}

export const ReferenceDisplay: React.FC<ReferenceDisplayProps> = ({ 
  alignment, 
  isEditing, 
  isRecording,
  onEditToggle 
}) => {
  return (
    <div className="p-12 glass-panel rounded-[2rem] flex flex-col gap-6 relative">
      <div className="flex justify-between items-center px-[25px] relative">
        <div className="flex-1" />
        <h2 
          className="text-[14px] font-semibold uppercase tracking-[0.0525em] text-center"
          style={{ color: '#71717a' }}
        >
          Target Passage
        </h2>
        <div className="flex-1 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97, y: 1 }}
            onClick={onEditToggle}
            className={`${saveStyles.container} w-[75px] h-[25px] z-10 touch-manipulation`}
          >
            <div className={saveStyles.bloom} />
            <div className={saveStyles.edgeGlow} />
            <div className={saveStyles.shell}>
              <div className={saveStyles.reflection} />
              <div 
                className={`${saveStyles.content} text-[12px] font-bold uppercase tracking-wider`}
                style={{ color: '#71717a' }}
              >
                {isEditing ? "SAVE" : "EDIT"}
              </div>
            </div>
          </motion.button>
        </div>
      </div>
      
      <div className="p-12 mx-[25px] mb-[25px] glass-inner rounded-[1.5rem] min-h-[140px] overflow-hidden">
        <div 
          className="text-[18px] leading-[1.61] font-normal text-white px-[25px] py-[10px] break-words whitespace-pre-wrap transition-opacity duration-500"
          style={{ opacity: isRecording ? 0.1 : 1 }}
        >
          {alignment.length === 0 ? (
            <span className="text-zinc-500 italic">Please use the edit button to enter your target passage here...</span>
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
                    color: item.status === "correct" ? "#34c759" : item.status === "substituted" ? "#f97316" : "#ffffff",
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
