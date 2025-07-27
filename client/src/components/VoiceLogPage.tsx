import { useState } from "react";
import mic from "../assets/icons/mic.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useAuth } from "@clerk/clerk-react";
import { useUserStore } from "../stores/userStore";
import { createApiUrl } from "../lib/api";

function VoiceLogPage() {
  const { addLog, addMetric } = useUserStore();
  const { getToken } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const handleStartListening = async () => {
    console.log("clicked", { listening, isListening });

    if (listening || isListening) {
      await SpeechRecognition.stopListening();
      setIsListening(false);
      console.log("Stopping speech recognition");
    } else {
      resetTranscript();
      setIsListening(true);
      try {
        await SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
          interimResults: true,
        });
        console.log("Starting speech recognition");
      } catch (error) {
        console.error("Speech recognition error:", error);
        setIsListening(false);
        alert(
          "Speech recognition failed. Please check if you're using HTTPS and have microphone permissions."
        );
      }
    }
  };

  const handleClearTranscript = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    resetTranscript();
  };

  const sendRawData = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);

    SpeechRecognition.stopListening();
    setIsListening(false);
    const currentTranscript = transcript;
    resetTranscript();

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const token = await getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(createApiUrl("/api/voice-log"), {
        headers,
        method: "POST",
        body: JSON.stringify({ transcript: currentTranscript }),
      });
      const data = await response.json();

      if (data.session) {
        addLog(data.session);
      }
      if (data.metric) {
        addMetric(data.metric);
      }
    } catch (error) {
      console.error("Error logging voice data:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">
            Speech Recognition Not Supported
          </div>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support speech recognition. Please try a
            different browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-black-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black-900">
          Voice Logging
        </h2>

        {/* Voice Recording Controls */}
        <div className="space-y-6">
          <div className="text-center">
            <button
              onClick={handleStartListening}
              disabled={isProcessing}
              className={`w-20 h-20 rounded-full transition-all duration-200 flex items-center justify-center mx-auto ${
                listening || isListening
                  ? "bg-red-500 text-white animate-pulse scale-110"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <img src={mic} alt="Microphone" className="w-8 h-8" />
            </button>
            <p className="text-sm text-gray-600 mt-3 font-medium">
              {listening || isListening
                ? "Listening... (tap to stop)"
                : "Tap to start recording"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClearTranscript}
              disabled={!transcript || isProcessing}
              className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
            <button
              onClick={sendRawData}
              disabled={!transcript.trim() || isProcessing}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Log Workout"}
            </button>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Voice Input
              </div>
              <div className="text-sm text-gray-700 leading-relaxed max-h-40 overflow-y-auto">
                {transcript}
              </div>
            </div>
          )}

          {/* Listening Indicator */}
          {(listening || isListening) && !transcript && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Listening... speak now
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">
              💡 <strong>Tips:</strong>
            </p>
            <div className="text-left max-w-md mx-auto space-y-1">
              <p>• Say "I did 3 sets of bench press with 135 pounds"</p>
              <p>• Include exercise name, weight, sets, and reps</p>
              <p>• Speak clearly and wait for processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceLogPage;
