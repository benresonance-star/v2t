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
    <div className="flex flex-col gap-6 items-center w-full max-w-md mx-auto">
      {/* Score Indicator */}
      <div className="flex items-center gap-4 w-full px-4">
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${score * 100}%` }}
          />
        </div>
        <span className="text-lg font-bold text-gray-700 min-w-[3rem]">
          {Math.round(score * 100)}%
        </span>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center justify-center gap-8 w-full">
        <button
          onClick={onReset}
          className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Reset"
        >
          <RotateCcw size={24} />
        </button>

        {!isRecording ? (
          <button
            onClick={onStart}
            disabled={isTranscribing}
            className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mic size={32} />
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all animate-pulse active:scale-95"
          >
            <Square size={32} />
          </button>
        )}

        <div className="w-14" /> {/* Spacer to balance the reset button */}
      </div>
    </div>
  );
};
