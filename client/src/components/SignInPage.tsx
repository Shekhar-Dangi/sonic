import { SignIn } from "@clerk/react-router";
import Navbar from "./Navbar";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <div className="mt-20 flex justify-center items-center">
        <SignIn />
      </div>
    </>
  );
}
