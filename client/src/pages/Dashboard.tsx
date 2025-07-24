import Footer from "../components/Footer";
import MainDash from "../components/MainDash";
import Navbar from "../components/Navbar";
import RightSideBar from "../components/RightSideBar";
import SideBar from "../components/SideBar";
import LogsPage from "../components/LogsPage";
import InsightsPage from "../components/InsightsPage";
import SettingsPage from "../components/SettingsPage";
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

      <div className="min-h-[70vh] main-container flex justify-between">
        <SideBar />
        {renderMainContent()}
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
