import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type IncomeData = {
  month: string;
  income: number;
  lastYearIncome: number;
};

const EarningSummary = () => {
  const [data, setData] = useState<IncomeData[]>([]);

  const fetchIncomeData = async (
    startDate: string,
    endDate: string
  ): Promise<number> => {
    try {
      const res = await fetch(
        `/api/antrian?createdAt_gte=${startDate}&createdAt_lte=${endDate}`
      );
      const result = await res.json();

      if (!Array.isArray(result.data)) {
        console.error("Invalid data format:", result.data);
        return 0;
      }

      const totalIncome = result.data.reduce(
        (sum: number, item: { harga: number }) => sum + (item.harga || 0),
        0
      );

      return totalIncome;
    } catch (error) {
      console.error("Error fetching data:", error);
      return 0;
    }
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2025-01-01"; // January 1, 2025
      const endDate = "2025-06-30"; // June 30, 2025
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const newData: IncomeData[] = [];

      for (let i = 0; i < 6; i++) {
        const start = new Date(startDate); // Start from January 1, 2025
        start.setMonth(start.getMonth() + i); // Increment month

        const end = new Date(start);
        end.setMonth(start.getMonth() + 1); // Next month

        const lastYearStart = new Date(start.getFullYear() - 1, start.getMonth(), 1);
        const lastYearEnd = new Date(lastYearStart.getFullYear(), lastYearStart.getMonth() + 1, 0);

        // Fetch the data for this month and the same month last year
        const incomeThisMonth = await fetchIncomeData(formatDate(start), formatDate(end));
        const incomeLastYear = await fetchIncomeData(formatDate(lastYearStart), formatDate(lastYearEnd));

        newData.push({
          month: months[i],
          income: incomeThisMonth,
          lastYearIncome: incomeLastYear,
        });
      }

      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-6 pb-6 pt-5 shadow-md dark:bg-gray-800 dark:shadow-lg xl:col-span-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Earning Summary
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last 6 Months (Jan - Jun 2025)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#006AFF" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#006AFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLastYearIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D9D9D9" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#D9D9D9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            padding={{ left: 14 }}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            padding={{ bottom: 14 }}
            domain={[0, "auto"]}
            unit=" Juta"
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
            itemStyle={{ color: "#374151" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{ fontSize: 12, color: "#6B7280" }}
          />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#006AFF"
            fill="url(#colorIncome)"
            strokeWidth={2}
            name="Income This Year"
          />
          <Area
            type="monotone"
            dataKey="lastYearIncome"
            stroke="#D9D9D9"
            fill="url(#colorLastYearIncome)"
            strokeDasharray="5 5"
            strokeWidth={2}
            name="Income Last Year"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningSummary;
