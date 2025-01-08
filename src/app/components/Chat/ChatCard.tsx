import React, { useState } from "react";
import { FaCar, FaCalendarAlt } from "react-icons/fa";

const CarAvailability = () => {
  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");
  const [date, setDate] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const checkAvailability = async () => {
    if (!carNumber || !carType || !date) {
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    try {
      const query = new URLSearchParams({
        platNomor: carNumber,
        tipeMobil: carType,
        createdAt: date,
      });

      const response = await fetch(`/api/antrian?${query.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const { data } = await response.json();

      if (data.length > 0) {
        setStatusMessage(data[0].status);
      } else {
        setStatusMessage("Car is not in the queue.");
      }
    } catch (error) {
      console.error("Error checking availability:", error);
      setStatusMessage("Error checking availability. Please try again later.");
    }
  };

  const getDotColor = (currentStatus: string, targetStep: string) => {
    const steps = ["Queue", "Progress", "Done"];
    const currentIndex = steps.indexOf(currentStatus);
    const targetIndex = steps.indexOf(targetStep);

    return currentIndex >= targetIndex ? "bg-blue-600" : "bg-gray-400";
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-6 pb-6 pt-5 shadow-md dark:bg-gray-800 dark:shadow-lg xl:col-span-5">
      <h3 className="text-body-2xlg font-semibold text-gray-900 dark:text-white mb-8">
        Car Availability
      </h3>
      <div className="flex flex-col gap-4 mb-4">
        {/* Plate Number Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Plate Number"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            className="block w-full border rounded-md px-9 py-2"
          />
          <FaCar className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Car Type Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Car Type"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="block w-full border rounded-md px-9 py-2"
          />
          <FaCar className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Date Picker */}
        <div className="relative">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full border rounded-md px-8 py-2"
          />
          <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <button
        onClick={checkAvailability}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Check
      </button>

      {statusMessage && (
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8">
            {/* Dot Step Indicators */}
            <div className="flex flex-col items-center">
              <span
                className={`w-4 h-4 rounded-full ${getDotColor(
                  statusMessage,
                  "Queue"
                )}`}
              ></span>
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Queue
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`w-4 h-4 rounded-full ${getDotColor(
                  statusMessage,
                  "Progress"
                )}`}
              ></span>
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span
                className={`w-4 h-4 rounded-full ${getDotColor(
                  statusMessage,
                  "Done"
                )}`}
              ></span>
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Done
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CarAvailability;
