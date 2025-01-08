"use client";
import React, { useEffect, useState } from 'react';
import Logo from './components/ui/Logo';
import ProgressSteps from './components/ui/ProgressSteps';
import SummaryCard from './components/ui/SummaryCard';
import Divider from './components/ui/Divider';

interface Antrian {
  namaPelanggan: string;
  platNomor: string;
  tipeMobil: string;
  status: string;
  createdAt: string;
  nomorTelepon: string;
}

const ProgressBM: React.FC = () => {
  const [antrianData, setAntrianData] = useState<Antrian | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [estimatedTime, setEstimatedTime] = useState<string>('54 Min'); // Default value if loading

  const platNomor = ''; // You can replace this with the actual nomorTelepon value

  useEffect(() => {
    const fetchAntrianData = async () => {
      try {
        const response = await fetch(`/api/antrian?platNomor=${platNomor}`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const antrian = data.data[0];
          setAntrianData(antrian);
          calculateEstimatedTime(antrian.createdAt); // Calculate estimated time based on createdAt
        }
      } catch (error) {
        console.error('Error fetching antrian data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAntrianData();
  }, [platNomor]);

  const calculateEstimatedTime = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const elapsedTimeInMinutes = Math.floor((currentDate.getTime() - createdDate.getTime()) / (1000 * 60)); // Time in minutes

    const estimatedTime = `${elapsedTimeInMinutes} Min`; // Format as "x Min"
    setEstimatedTime(estimatedTime); // Update state
  };

  return (
    <div className="min-h-screen bg-white px-8 py-6 mx-auto">
      {/* Logo */}
      <div className="mb-6 flex justify-around mx-auto">
        <Logo />
        <div className="text-gray-500 text-sm">{loading ? 'Loading...' : `ESTIMATED TIME (${estimatedTime})`}</div>
      </div>

      {/* Carwash Image */}
      <div className="justify-center item-center mx-auto">
        <img src="images/carwash/progress.png" alt="" className="item-center justify-center mx-auto" />
      </div>

      {/* Progress Steps */}
      <ProgressSteps />

      {/* Carwash Summary */}
      <div>
        <h3 className="text-center font-semibold text-gray-700 text-lg mb-2 mt-12">Carwash Summary</h3>
        <p className="text-center text-sm text-gray-400 mb-4">
          Prices may change depending on the length of the Washing service and the price of your car.
        </p>
      </div>

      <Divider />
      <SummaryCard />
    </div>
  );
};

export default ProgressBM;
