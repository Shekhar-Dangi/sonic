import { useState } from "react";
import mic from "../../assets/icons/mic.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useAuth } from "@clerk/clerk-react";
import { useUserStore } from "../../stores/userStore";
import { createApiUrl } from "../../lib/api";
import Card from "../ui/Card";
import { Button } from "../ui/Button";
import RightSideBar from "../RightSideBar";

function VoiceLogPage() {
  const { addLog, addMetric, toProcess, setToProcess } = useUserStore();
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

  const handleClearTranscript = async () => {
    resetTranscript();
    console.log(!toProcess.trim());
    if (toProcess.trim())
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        const token = await getToken();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(createApiUrl("/api/logs/save"), {
          headers,
          method: "POST",
          body: JSON.stringify({ data: "" }),
        });
        const data = await response.json();
        setToProcess("");
        console.log(data);
      } catch (error) {
        console.error("Error clearing saved log:", error);
      }
  };

  const stopSpeechInterface = (): string => {
    setIsProcessing(true);
    SpeechRecognition.stopListening();
    setIsListening(false);
    const script = transcript;
    resetTranscript();
    return script;
  };

  const saveLog = async () => {
    console.log("saving...");
    const script = stopSpeechInterface();
    if (!transcript.trim()) return;

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const token = await getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(createApiUrl("/api/logs/save"), {
        headers,
        method: "POST",
        body: JSON.stringify({ data: script }),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error logging voice data:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const sendRawData = async () => {
    if (!transcript.trim()) return;

    const currentTranscript = stopSpeechInterface();

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
    <div className="flex w-full flex-row gap-8">
      <Card
        size="lg"
        animate={false}
        className="flex-1 max-w-2xl mx-auto gap-4 "
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black-900">
          Voice Logging
        </h2>
        <div></div>
        {
          <div className="px-4 py-1 bg-gray-100 rounded-lg">
            <div className="text-sm text-black-700 flex items-center gap-2 justify-center">
              {listening ? "listening" : "idle"}
            </div>
          </div>
        }
        <div className="space-y-10">
          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartListening}
              disabled={isProcessing}
              roundness="full"
              className={`w-20 h-20 rounded-full ${
                listening || isListening
                  ? "bg-red-500 text-white animate-pulse scale-110"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              text={<img src={mic} alt="Microphone" className="w-8 h-8" />}
            ></Button>
          </div>

          <div className="flex gap-4">
            <Button
              size="md"
              text="Clear"
              variant="secondary"
              onClick={handleClearTranscript}
              disabled={!transcript || isProcessing}
              className="flex-1  disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              text="Save"
              size="md"
              onClick={saveLog}
              variant="accent"
              className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <Button
            text={isProcessing ? "Processing..." : "Log"}
            size="md"
            variant="primary"
            onClick={sendRawData}
            disabled={!transcript.trim() || isProcessing}
            className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed w-full"
          />
          {
            <div className="p-4 bg-gray-100 p-4 w-[350px] min-h-[80px] rounded-lg">
              <div className="text-sm text-gray-500 leading-relaxed overflow-y-auto">
                {toProcess + transcript || (
                  <p>
                    No Saved Log Found. <br /> Click mic to start speaking.
                  </p>
                )}
              </div>
            </div>
          }

          {/* Listening Indicator */}

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
      </Card>
      <div className="hidden 3xl:block">
        <RightSideBar />
      </div>
    </div>
  );
}

export default VoiceLogPage;
