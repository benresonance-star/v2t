export class WhisperProvider {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async startRecording(): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Your browser does not support audio recording. Please ensure you are using a modern browser like Safari on iOS or Chrome.");
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw new Error("Microphone access denied. Please enable microphone permissions in your browser settings.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        throw new Error("No microphone found. Please connect a microphone and try again.");
      } else if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error("Microphone access requires a secure connection (HTTPS). Please ensure you are visiting via HTTPS.");
      } else {
        throw new Error(`Microphone error: ${err.message || "Unknown error"}`);
      }
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error("Recording was not started correctly."));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
      // Stop all tracks to release the microphone
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    });
  }

  async pauseRecording(): Promise<void> {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
    }
  }

  async resumeRecording(): Promise<void> {
    if (this.mediaRecorder && this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
    }
  }

  async transcribe(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");
    formData.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "OpenAI transcription failed. Please check your API key.");
    }

    const data = await response.json();
    return data.text;
  }
}
