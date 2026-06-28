import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Profile from "./Profile";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <GeneralContextProvider>
          <WatchList />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/apps" element={<Apps />} />
            </Routes>
          </div>
        </GeneralContextProvider>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
