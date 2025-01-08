import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/antrian");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        const data = result.data || [];

        // Hitung jumlah untuk setiap status
        const progressCount = data.filter((item: any) => item.status === "Progress").length;
        const doneCount = data.filter((item: any) => item.status === "Done").length;
        const queueCount = data.filter((item: any) => item.status === "Queue").length;

        setSeries([progressCount, doneCount, queueCount]);
      } catch (error) {
        console.error("Error fetching antrian data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#6BDDDD", "#3762CC", "#F9A7A7"],
    labels: ["Progress", "Done", "Queue"],
    legend: {
      show: false,
      position: "top",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Customers",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-8">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-body-2xlg font-semibold text-black">Car Wash Progress</h4>
        <button className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded">
          Today
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mb-8">
          <div className="mx-auto flex justify-center">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[550px]">
        <div className="-mx-7.5 flex flex-col items-center justify-center gap-y-2.5 sm:flex-row">
          <div className="w-full px-8.5 sm:w-1/2">
            <div className="flex w-full items-center gap-2">
              <span className="block h-4 w-full max-w-4 rounded-full bg-[#3762CC]"></span>
              <p className="flex w-full gap-2 text-body-md font-medium text-dark dark:text-dark-6">
                <span>Done</span>
                <span>{series[1]}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8.5 sm:w-1/2">
            <div className="flex w-full items-center gap-2">
              <span className="block h-4 w-full max-w-4 rounded-full bg-[#6BDDDD]"></span>
              <p className="flex w-full gap-2 text-body-md font-medium text-dark dark:text-dark-6">
                <span>Progress</span>
                <span>{series[0]}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8.5 sm:w-1/2">
            <div className="flex w-full items-center gap-2">
              <span className="block h-4 w-full max-w-4 rounded-full bg-[#F9A7A7]"></span>
              <p className="flex w-full gap-2 text-body-md font-medium text-dark dark:text-dark-6">
                <span>Queue</span>
                <span>{series[2]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
