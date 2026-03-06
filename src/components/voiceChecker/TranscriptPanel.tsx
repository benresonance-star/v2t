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
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px]">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Your Speech
      </h2>
      <div className="text-gray-700 italic leading-relaxed">
        {isTranscribing ? (
          <div className="flex items-center gap-2 text-blue-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            <span>Transcribing...</span>
          </div>
        ) : transcript ? (
          transcript
        ) : (
          <span className="text-gray-400">Speech transcript will appear here...</span>
        )}
      </div>
    </div>
  );
};
