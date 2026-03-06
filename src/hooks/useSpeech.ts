import { useState, useCallback, useRef, useEffect } from "react";
import { WhisperProvider } from "../services/whisperProvider";

export function useSpeech() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [hasMicrophone, setHasMicrophone] = useState<boolean | null>(null);
  const providerRef = useRef<WhisperProvider | null>(null);

  useEffect(() => {
    async function checkMicrophone() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const micAvailable = devices.some(device => device.kind === 'audioinput');
        setHasMicrophone(micAvailable);
      } catch (err) {
        setHasMicrophone(false);
      }
    }
    checkMicrophone();
  }, []);

  const startRecording = useCallback(async () => {
    if (!providerRef.current) {
      providerRef.current = new WhisperProvider();
    }
    await providerRef.current.startRecording();
    setIsRecording(true);
    setIsPaused(false);
  }, []);

  const pauseRecording = useCallback(async () => {
    if (providerRef.current) {
      await providerRef.current.pauseRecording();
      setIsPaused(true);
    }
  }, []);

  const resumeRecording = useCallback(async () => {
    if (providerRef.current) {
      await providerRef.current.resumeRecording();
      setIsPaused(false);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!providerRef.current) return "";
    
    setIsRecording(false);
    setIsPaused(false);
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
    isPaused,
    isTranscribing,
    hasMicrophone,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  };
}
