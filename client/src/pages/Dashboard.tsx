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

function Dashboard() {
  const { currentLocation } = useDashboardStore();

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
      <Navbar />

      <div className="main-container flex flex-col 3xl:flex-row justify-between gap-16 3xl:gap-0">
        <SideBar />
        {renderMainContent()}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
