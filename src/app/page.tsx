"use client";

import React, { useState } from "react";
import { useVoiceChecker } from "@/hooks/useVoiceChecker";
import { ReferenceDisplay } from "@/components/voiceChecker/ReferenceDisplay";
import { TranscriptPanel } from "@/components/voiceChecker/TranscriptPanel";
import { Controls } from "@/components/voiceChecker/Controls";

const DEFAULT_REFERENCE = "For God so loved the world that he gave his only Son that whoever believes in him should not perish but have eternal life";

export default function Home() {
  const [inputText, setInputText] = useState(DEFAULT_REFERENCE);
  const {
    alignment,
    transcript,
    score,
    isRecording,
    isTranscribing,
    error,
    handleStart,
    handleStop,
    handleReset,
    setReferenceText,
  } = useVoiceChecker(inputText);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6 md:p-12">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Voice Reference Checker
          </h1>
          <p className="text-gray-500">
            Practice your recitation and get instant feedback.
          </p>
        </header>

        {/* Reference Input/Display Area */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Target Passage
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {isEditing ? "Save & Close" : "Edit Text"}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setReferenceText(e.target.value);
              }}
              className="w-full p-4 h-32 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
              placeholder="Enter reference text here..."
            />
          ) : (
            <ReferenceDisplay alignment={alignment} />
          )}
        </section>

        {/* Feedback Area */}
        <section className="space-y-6">
          <TranscriptPanel 
            transcript={transcript} 
            isTranscribing={isTranscribing} 
          />

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          <Controls
            isRecording={isRecording}
            isTranscribing={isTranscribing}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            score={score}
          />
        </section>

        {/* Instructions */}
        <footer className="mt-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-semibold text-gray-800 mb-2">How to use:</h4>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Enter the text you want to recite (or use the default).</li>
            <li>Tap the microphone icon to start recording.</li>
            <li>Recite the text clearly.</li>
            <li>Tap the stop icon when finished.</li>
            <li>Review your accuracy and highlighted words.</li>
          </ol>
        </footer>
      </div>
    </main>
  );
}
