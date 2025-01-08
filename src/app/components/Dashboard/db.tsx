"use client";

import React, { useEffect, useState } from "react";
import DataStatsOne from "@/app/components/DataStats/DataStatsOne";
import TableThree from "@/app/components/Tables/TableThree";
import ChartThree from "@/app/components/Charts/ChartThree";
import CarAvailability from "@/app/components/Chat/ChatCard";
import ChartFive from "../Charts/ChartFive";

const Dashboard: React.FC = () => {

  return (
    <div className="p-2">
      <div className="mt-6 grid grid-cols-12 md:grid-cols-12 gap-6">
        <DataStatsOne />
        <ChartThree />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <CarAvailability />
        <TableThree />
        <ChartFive/>
      </div>
    </div>
  );
};

export default Dashboard;
