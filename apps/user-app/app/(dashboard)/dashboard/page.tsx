import React from "react";
import { getDashboardStats } from "../../lib/actions/dashboard";
import DashboardClient from "../_components/DashboardClient";

const DashboardPage = async () => {
  const stats = await getDashboardStats();

  return <DashboardClient stats={stats} />;
};

export default DashboardPage;
