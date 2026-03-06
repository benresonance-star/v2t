import React from "react";
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
    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 min-h-[150px] shadow-xl">
      <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
        Reference Text
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-3 text-xl leading-relaxed font-medium">
        {alignment.length === 0 ? (
          <span className="text-zinc-700 italic">No reference text loaded...</span>
        ) : (
          alignment.map((item, idx) => {
            if (!item.ref) return null;

            return (
              <span
                key={idx}
                className={cn(
                  "px-1.5 py-0.5 rounded-md transition-all duration-300",
                  item.status === "correct" && "text-emerald-400 bg-emerald-400/10",
                  item.status === "omitted" && "text-rose-500/50 line-through decoration-rose-500/30",
                  item.status === "substituted" && "text-amber-400 bg-amber-400/10 border-b border-amber-400/50",
                  item.status === "inserted" && "hidden"
                )}
              >
                {item.ref}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};
