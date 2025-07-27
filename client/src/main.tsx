import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SignInPage from "./components/SignInPage.tsx";
import SignUpPage from "./components/SignUpPage.tsx";
import { AuthWrapper } from "./components/AuthWrapper.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      >
        <AuthWrapper>
          <Routes>
            <Route index element={<App />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
          </Routes>
        </AuthWrapper>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
