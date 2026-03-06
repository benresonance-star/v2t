import React from "react";

interface TranscriptPanelProps {
  transcript: string;
  isTranscribing: boolean;
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  transcript,
  isTranscribing,
}) => {
  return (
    <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 min-h-[120px] backdrop-blur-sm">
      <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
        Your Speech
      </h2>
      <div className="text-zinc-300 italic text-lg leading-relaxed">
        {isTranscribing ? (
          <div className="flex items-center gap-3 text-sky-400">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s]" />
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
            </div>
            <span className="text-sm font-medium tracking-wide">Processing audio...</span>
          </div>
        ) : transcript ? (
          <span className="not-italic text-zinc-200">{transcript}</span>
        ) : (
          <span className="text-zinc-600 text-base">Wait for transcript...</span>
        )}
      </div>
    </div>
  );
};
