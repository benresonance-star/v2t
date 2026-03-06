import { AlignmentResult } from "../core/align";

export interface VoiceCheckerSession {
  referenceText: string;
  transcript: string;
  alignment: AlignmentResult[];
  score: number;
  isRecording: boolean;
  status: "idle" | "recording" | "transcribing" | "completed" | "error";
  error?: string;
}

export interface SpeechProvider {
  startRecording(): Promise<void>;
  stopRecording(): Promise<Blob>;
  transcribe(audioBlob: Blob): Promise<string>;
}
