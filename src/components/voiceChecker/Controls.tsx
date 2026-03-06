import React from "react";
import { Mic, Square, RotateCcw } from "lucide-react";

interface ControlsProps {
  isRecording: boolean;
  isTranscribing: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  score: number;
}

export const Controls: React.FC<ControlsProps> = ({
  isRecording,
  isTranscribing,
  onStart,
  onStop,
  onReset,
  score,
}) => {
  return (
    <div className="flex flex-col gap-10 items-center w-full max-w-md mx-auto py-4">
      {/* Score Indicator */}
      <div className="flex flex-col gap-3 w-full px-2">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Accuracy</span>
          <span className="text-2xl font-black text-emerald-400 tracking-tight">
            {Math.round(score * 100)}%
          </span>
        </div>
        <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
          <div
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-700 ease-out"
            style={{ width: `${score * 100}%` }}
          />
        </div>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center justify-center gap-10 w-full">
        <button
          onClick={onReset}
          className="p-4 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all active:scale-90"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>

        {!isRecording ? (
          <button
            onClick={onStart}
            disabled={isTranscribing}
            className="w-24 h-24 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.2)] hover:bg-rose-500 transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed group relative"
          >
            <div className="absolute inset-0 rounded-full bg-rose-600 animate-ping opacity-20 group-hover:hidden" />
            <Mic size={36} className="relative z-10" />
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-24 h-24 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center shadow-2xl hover:bg-white transition-all animate-pulse active:scale-95"
          >
            <Square size={36} fill="currentColor" />
          </button>
        )}

        <div className="w-12" /> {/* Spacer to balance the reset button */}
      </div>
    </div>
  );
};
