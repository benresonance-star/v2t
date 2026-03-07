"use client";

import React, { useState, useRef } from "react";
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
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStartHold = () => {
    if (isEditing || isRecording) return;
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      onEditToggle();
      setIsHolding(false);
    }, 700); // 700ms for long hold
  };

  const handleEndHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHolding(false);
  };

  return (
    <div className="p-12 glass-panel rounded-[2rem] flex flex-col gap-6 relative">
      <div className="flex justify-center items-center px-[25px] relative">
        <h2 
          className="text-[14px] font-semibold uppercase tracking-[0.0525em] text-center"
          style={{ color: '#71717a' }}
        >
          Target Passage
        </h2>
      </div>
      
      <motion.div 
        className="p-12 mx-[25px] mb-[15px] rounded-[1.5rem] min-h-[140px] overflow-hidden cursor-pointer touch-none select-none"
        onMouseDown={handleStartHold}
        onMouseUp={handleEndHold}
        onMouseLeave={handleEndHold}
        onTouchStart={handleStartHold}
        onTouchEnd={handleEndHold}
        animate={isHolding ? { scale: 0.98, opacity: 0.8 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className="text-[18px] leading-[1.61] font-normal text-white px-[25px] py-[10px] break-words whitespace-pre-wrap transition-opacity duration-500"
          style={{ opacity: isRecording ? 0.1 : 1 }}
        >
          {alignment.length === 0 ? (
            <span className="text-zinc-500 italic">Please long-press here to enter your target passage...</span>
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
      </motion.div>

      {/* No buttons here anymore - Edit button removed as requested */}
    </div>
  );
};
