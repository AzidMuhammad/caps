"use client";

import React, { useEffect, useState } from "react";
import TableThree from "@/app/components/Tables/TableThree";

const Dashboard: React.FC = () => {

  return (
    <div className="p-2">
      <div className="-mt-6 grid grid-cols-1 gap-6">
        <TableThree />
      </div>
    </div>
  );
};

export default Dashboard;
