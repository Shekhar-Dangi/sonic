import { useSession } from "@clerk/clerk-react";
import "./App.css";

import Home from "./pages/Home";
import { useEffect } from "react";

function App() {
  const { isLoaded, session, isSignedIn } = useSession();
  useEffect(() => {
    async function send() {
      const token = await session?.getToken();
      const res = await fetch("http://localhost:4000/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      });
      console.log(res);
    }
    if (session) send();
  }, [session]);
  return (
    <>
      <Home />
    </>
  );
}

export default App;
