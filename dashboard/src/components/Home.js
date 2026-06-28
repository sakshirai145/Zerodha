import React from "react";

import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <AuthProvider>
      <TopBar />
      <Dashboard />
    </AuthProvider>
  );
};

export default Home;
