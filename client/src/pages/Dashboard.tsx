import MainDash from "../components/MainDash";
import Navbar from "../components/Navbar";
import RightSideBar from "../components/RightSideBar";
import SideBar from "../components/SideBar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="main-container flex justify-between">
        <SideBar />
        <MainDash />
        <RightSideBar />
      </div>
    </>
  );
}

export default Dashboard;
