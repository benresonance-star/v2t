import { useState, useCallback, useRef } from "react";
import { WhisperProvider } from "../services/whisperProvider";

export function useSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const providerRef = useRef<WhisperProvider | null>(null);

  const startRecording = useCallback(async () => {
    if (!providerRef.current) {
      providerRef.current = new WhisperProvider();
    }
    await providerRef.current.startRecording();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(async () => {
    if (!providerRef.current) return "";
    
    setIsRecording(false);
    setIsTranscribing(true);
    
    try {
      const audioBlob = await providerRef.current.stopRecording();
      const text = await providerRef.current.transcribe(audioBlob);
      return text;
    } finally {
      setIsTranscribing(false);
    }
  }, []);

  return {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
  };
}
