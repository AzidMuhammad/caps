import React, { useEffect, useState } from "react";

const DataStatsOne: React.FC = () => {
  const [totalIncome, setTotalIncome] = useState<string>("Loading...");
  const [comparisonIncome, setComparisonIncome] = useState<string>("Loading...");
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];

  const fetchIncome = async (date: string, setIncome: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const response = await fetch('/api/antrian');
      const data = await response.json();
      setIncome(data.totalIncome || "Rp0");
    } catch (error) {
      console.error("Failed to fetch income:", error);
      setIncome("Error");
    }
  };

  useEffect(() => {
    fetchIncome(today, setTotalIncome);
    fetchIncome(yesterday, setComparisonIncome);
  }, []);

  return (
    <div className="bg-white col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-body-2xlg font-semibold text-black">Income</h4>
        <button className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded">
          Today
        </button>
      </div>
      <div className="flex-col items-center text-start mb-4">
        <h2 className="text-4xl font-bold text-gray-800 text-start justify-start">{totalIncome}</h2>
        <div className="flex items-center text-start gap-2 mt-4 text-2xl font-bold text-red-300">
          <span>↓</span>
          <span>-1.5%</span>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
      <p className="text-md text-gray-500 mt-2">
        Compared to <span className="font-medium">{comparisonIncome}</span> yesterday
      </p>
    </div>
  );
};

export default DataStatsOne;
