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
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 min-h-[150px]">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Reference Text
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-lg leading-relaxed">
        {alignment.length === 0 ? (
          <span className="text-gray-300 italic">No reference text loaded...</span>
        ) : (
          alignment.map((item, idx) => {
            // Only show tokens that have a reference part
            if (!item.ref) return null;

            return (
              <span
                key={idx}
                className={cn(
                  "px-0.5 rounded transition-colors duration-200",
                  item.status === "correct" && "bg-green-100 text-green-800",
                  item.status === "omitted" && "bg-red-50 text-red-400 line-through",
                  item.status === "substituted" && "bg-yellow-100 text-yellow-800 border-b-2 border-yellow-400",
                  item.status === "inserted" && "hidden" // Insertions don't show in reference view
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
