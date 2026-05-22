import React, { useState, useEffect } from "react";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const getStoredUser = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("username");
  };

  const [user, setUser] = useState(() => getStoredUser() || null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = () => setUser(localStorage.getItem("username") || null);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [authMode, setAuthMode] = React.useState("login");

  if (user) return <Chat user={user} />;

  return authMode === "login" ? (
    <Login
      onLogin={(username) => setUser(username)}
      onSwitchToSignup={() => setAuthMode("signup")}
    />
  ) : (
    <Signup
      onSignup={(username) => setUser(username)}
      onSwitchToLogin={() => setAuthMode("login")}
    />
  );
}

export default App;