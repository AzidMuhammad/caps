import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartTwo: React.FC<{ data: { timestamp: string; value: number }[] }> = ({ data }) => {
  const series = [
    {
      name: "Motion Detected",
      data: data.map(d => d.value),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 250,
    },
    xaxis: {
      categories: data.map((d) => d.timestamp),
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Motion Detected by PIR Sensor</h4>
      <ReactApexChart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default ChartTwo;
