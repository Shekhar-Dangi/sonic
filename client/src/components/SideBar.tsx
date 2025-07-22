import home from "../assets/icons/home.svg";
import logs from "../assets/icons/logs.png";
import insights from "../assets/icons/insights.png";
import settings from "../assets/icons/settings.svg";
import SideBarFile from "./SideBarFile";
import mic from "../assets/icons/mic.svg";

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
        <div className="bg-primary-600 flex justify-center rounded-2xl py-1 cursor-pointer">
          <img className=" p-1 w-8" src={mic} />
        </div>
      </div>
    </>
  );
}

export default SideBar;
