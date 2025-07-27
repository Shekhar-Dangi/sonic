import Footer from "../components/Footer";
import MainDash from "../components/MainDash";
import Navbar from "../components/Navbar";
import RightSideBar from "../components/RightSideBar";
import SideBar from "../components/SideBar";
import LogsPage from "../components/LogsPage";
import InsightsPage from "../components/InsightsPage";
import SettingsPage from "../components/SettingsPage";
import VoiceLogPage from "../components/VoiceLogPage";
import { useDashboardStore } from "../stores/dashboardStore";
import { useUserStore } from "../stores/userStore";
import WorkoutStreak from "../components/WorkoutStreak";

function Dashboard() {
  const { currentLocation } = useDashboardStore();
  const { logs } = useUserStore();

  const renderMainContent = () => {
    switch (currentLocation) {
      case "dashboard":
        return (
          <>
            <MainDash />
            <RightSideBar />
          </>
        );
      case "logs":
        return (
          <>
            <LogsPage />
            <RightSideBar />
          </>
        );
      case "insights":
        return (
          <>
            <InsightsPage />
            <RightSideBar />
          </>
        );
      case "settings":
        return <SettingsPage />;
      case "voicelog":
        return <VoiceLogPage />;
      default:
        return (
          <>
            <MainDash />
            <RightSideBar />
          </>
        );
    }
  };

  return (
    <>
      <SideBar />

      <div className="3xl:ml-[300px]">
        <Navbar />
        <div className="main-container flex flex-col 3xl:flex-row justify-between gap-16 3xl:gap-0 m-auto p-0 ">
          {renderMainContent()}
          <div className="3xl:hidden block">
            <WorkoutStreak workoutSessions={logs} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
