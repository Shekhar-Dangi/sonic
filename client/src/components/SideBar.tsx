import { useState, useEffect } from "react";
import home from "../assets/icons/home.svg";
import logs from "../assets/icons/logs.png";
import insights from "../assets/icons/insights.png";
import settings from "../assets/icons/settings.svg";
import micIcon from "../assets/icons/bmic.png";
import SideBarFile from "./SideBarFile";
import mic from "../assets/icons/mic.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useAuth } from "@clerk/clerk-react";

import { useUserStore } from "../stores/userStore";
import { useDashboardStore } from "../stores/dashboardStore";
import { createApiUrl } from "../lib/api";

function SideBar() {
  const { addLog, addMetric } = useUserStore();
  const { currentLocation, setCurrentLocation } = useDashboardStore();

  const [isLarge3xl, setIsLarge3xl] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLarge3xl(window.innerWidth >= 1300);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sideBarItems = [
    {
      id: 1,
      title: "Dashboard",
      isFocused: currentLocation === "dashboard",
      icon: home,
      location: "dashboard" as const,
    },
    {
      id: 2,
      title: "Logs",
      isFocused: currentLocation === "logs",
      icon: logs,
      location: "logs" as const,
    },
    {
      id: 3,
      title: "Insights",
      isFocused: currentLocation === "insights",
      icon: insights,
      location: "insights" as const,
    },
    {
      id: 4,
      title: "Settings",
      isFocused: currentLocation === "settings",
      icon: settings,
      location: "settings" as const,
    },
    // Voice Log item only visible on screens smaller than 3xl
    {
      id: 5,
      title: "Voice Log",
      isFocused: currentLocation === "voicelog",
      icon: micIcon,
      location: "voicelog" as const,
      hideOn3xl: true, // Special flag to hide on 3xl+
    },
  ];

  const handleNavClick = (location: (typeof sideBarItems)[0]["location"]) => {
    setCurrentLocation(location);
  };

  const { getToken } = useAuth();
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="bg-white p-8 flex flex-col justify-between items-between">
        <div className="flex flex-row 3xl:flex-col justify-center gap-4 mt-0">
          {sideBarItems
            .filter((item) => {
              // Hide voice log on 3xl+ screens, and also hide if speech not supported
              if (item.hideOn3xl) {
                return false; // Don't show voice log if speech recognition not supported
              }
              return true;
            })
            .map((item) => (
              <SideBarFile
                key={item.id}
                title={item.title}
                icon={item.icon}
                isFocussed={item.isFocused}
                onClick={() => handleNavClick(item.location)}
              />
            ))}
        </div>
        <div className="text-center text-red-500 text-sm">
          Speech recognition not supported in this browser
        </div>
      </div>
    );
  }

  const sendRawData = async () => {
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
      body: JSON.stringify({ transcript }),
    });
    const data = await response.json();
    console.log(data);
    if (data.session) {
      addLog(data.session);
    }
    if (data.metric) {
      addMetric(data.metric);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg main-container 3xl:p-16 gap-8 flex flex-col justify-between items-between mt-0 3xl:h-[100vh] 3xl:fixed 3xl:left-0 3xl:top-0 3xl:mt-0 3xl:w-[300px]">
        <div className="flex flex-row 3xl:flex-col justify-center gap-4">
          {sideBarItems
            .filter((item) => {
              if (item.hideOn3xl) {
                return !isLarge3xl;
              }
              return true;
            })
            .map((item) => (
              <SideBarFile
                key={item.id}
                title={item.title}
                icon={item.icon}
                isFocussed={item.isFocused}
                onClick={() => handleNavClick(item.location)}
              />
            ))}
        </div>
        <div className="flex-col gap-2 hidden 3xl:flex  ">
          <div
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening();
              } else {
                resetTranscript();
                SpeechRecognition.startListening({
                  continuous: true,
                  language: "en-US",
                  interimResults: true,
                });
              }
            }}
            className={`${
              listening ? "bg-red-600 animate-pulse" : "bg-primary-600"
            } btn-primary flex-1 flex justify-center`}
          >
            <img className="w-6 h-6" src={mic} alt="Microphone" />
          </div>
          <button onClick={resetTranscript} className="flex-1 btn-secondary">
            Clear
          </button>
        </div>

        {transcript && (
          <div className="hidden 3xl:block p-3 bg-gray-50 rounded-lg border">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Voice Input
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {transcript}
            </div>
          </div>
        )}

        <div
          onClick={sendRawData}
          className="hidden 3xl:block ex mx-auto text-center cursor-pointer btn-primary"
        >
          Log
        </div>
        {listening && !transcript && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs text-blue-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Listening... speak now
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SideBar;
