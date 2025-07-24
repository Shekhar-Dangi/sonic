import { Link, useNavigate } from "react-router";
import sonic from "../assets/icons/sonic.png";
import pfp from "../assets/icons/pfp.jpg";
import { SignOutButton, useUser } from "@clerk/clerk-react";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleRoute = () => {
    if (!user) {
      navigate("/sign-in");
    }
  };
  return (
    <div className="main-container flex justify-between px-10 py-4 w-[85%]">
      <div className="flex gap-4 items-center">
        <img className="w-10" src={sonic} alt="sonic logo" />
        <h1 className="font-bold text-primary-600">sonic</h1>
      </div>
      <div className="flex gap-8 items-center">
        <Link className="text-black-700" to={"/dashboard"}>
          Dashboard
        </Link>
        <Link className="text-black-700" to={"/support"}>
          Support
        </Link>
        <Link className="text-black-700" to={"/#pricing"}>
          Pricing
        </Link>
      </div>
      <div className="flex gap-8">
        <a
          className="inline-block py-2 px-5 text-center cursor-pointer btn-primary"
          onClick={handleRoute}
        >
          {user ? <SignOutButton /> : "Sign In"}
        </a>
        <img className="w-10 rounded-full" src={pfp} alt="profile icon" />
      </div>
    </div>
  );
}

export default Navbar;
