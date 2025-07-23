import home from "../assets/icons/home.svg";
import logs from "../assets/icons/logs.png";
import insights from "../assets/icons/insights.png";
import settings from "../assets/icons/settings.svg";
import SideBarFile from "./SideBarFile";
import mic from "../assets/icons/mic.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SideBar() {
  const sideBarItems = [
    {
      id: 1,
      title: "Dashboard",
      isFocusse: true,
      icon: home,
    },
    {
      id: 2,
      title: "Logs",
      isFocusse: false,
      icon: logs,
    },
    {
      id: 3,
      title: "Insights",
      isFocusse: false,
      icon: insights,
    },
    {
      id: 4,
      title: "Settings",
      isFocusse: false,
      icon: settings,
    },
  ];
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="bg-white p-8 flex-1/3 flex flex-col justify-between items-between min-h-[600px]">
        <div className="flex flex-col gap-4">
          {sideBarItems.map((item) => (
            <SideBarFile
              key={item.id}
              title={item.title}
              icon={item.icon}
              isFocussed={item.isFocusse}
            />
          ))}
        </div>
        <div className="text-center text-red-500 text-sm">
          Speech recognition not supported in this browser
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white p-8 flex-1/3 flex flex-col justify-between items-between min-h-[600px]">
        <div className="flex flex-col gap-4">
          {sideBarItems.map((item) => (
            <SideBarFile
              key={item.id}
              title={item.title}
              icon={item.icon}
              isFocussed={item.isFocusse}
            />
          ))}
        </div>
        <div className="flex gap-2  mb-4">
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
          <div className="p-3 bg-gray-50 rounded-lg border">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Voice Input
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {transcript}
            </div>
          </div>
        )}

        <div className="text-center cursor-pointer btn-primary">Log</div>
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
