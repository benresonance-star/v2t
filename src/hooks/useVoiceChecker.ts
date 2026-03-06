import { useState, useCallback, useEffect } from "react";
import { useSpeech } from "./useSpeech";
import { tokenizeText } from "../core/normalize";
import { alignTokens, AlignmentResult } from "../core/align";
import { calculateScore } from "../core/score";

export function useVoiceChecker(initialReferenceText: string) {
  const [referenceText, setReferenceText] = useState(initialReferenceText);
  const [transcript, setTranscript] = useState("");
  const [alignment, setAlignment] = useState<AlignmentResult[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const { isRecording, isTranscribing, hasMicrophone, startRecording, stopRecording } = useSpeech();

  // Initialize alignment when reference text changes
  useEffect(() => {
    const tokens = tokenizeText(referenceText);
    const initialAlignment: AlignmentResult[] = tokens.map((token) => ({
      ref: token,
      spoken: null,
      status: "omitted",
    }));
    setAlignment(initialAlignment);
    setScore(0);
    setTranscript("");
  }, [referenceText]);

  const handleStart = useCallback(async () => {
    setError(undefined);
    if (hasMicrophone === false) {
      setError("No microphone detected on this device.");
      return;
    }
    try {
      await startRecording();
    } catch (err: any) {
      setError(err.message || "Failed to start recording");
    }
  }, [startRecording, hasMicrophone]);

  const handleStop = useCallback(async () => {
    try {
      const text = await stopRecording();
      setTranscript(text);

      const refTokens = tokenizeText(referenceText);
      const spokenTokens = tokenizeText(text);
      const result = alignTokens(refTokens, spokenTokens);
      
      setAlignment(result);
      setScore(calculateScore(result));
    } catch (err: any) {
      setError(err.message || "Transcription failed");
    }
  }, [stopRecording, referenceText]);

  const handleReset = useCallback(() => {
    setTranscript("");
    const tokens = tokenizeText(referenceText);
    const initialAlignment: AlignmentResult[] = tokens.map((token) => ({
      ref: token,
      spoken: null,
      status: "omitted",
    }));
    setAlignment(initialAlignment);
    setScore(0);
    setError(undefined);
  }, [referenceText]);

  return {
    referenceText,
    setReferenceText,
    transcript,
    alignment,
    score,
    isRecording,
    isTranscribing,
    hasMicrophone,
    error,
    handleStart,
    handleStop,
    handleReset,
  };
}
