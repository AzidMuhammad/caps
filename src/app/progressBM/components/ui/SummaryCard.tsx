import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCar } from 'react-icons/fa';

interface AntrianData {
  totalIncome: number;
  tipeMobil: string; // Make sure to include tipeMobil here
}

const SummaryCard: React.FC = () => {
  const searchParams = useSearchParams();
  const platNomor = searchParams.get("platNomor");

  const [antrianData, setAntrianData] = useState<AntrianData | null>(null);

  useEffect(() => {
    const fetchAntrianData = async () => {
      if (platNomor) {
        try {
          const response = await fetch(`/api/antrian?platNomor=${platNomor}`);
          const data = await response.json();
          console.log(data);  // Log the response to ensure all the fields are there
          setAntrianData({
            ...data.data[0],  // Ensure you're correctly accessing the first item of the array
            totalIncome: data.totalIncome || 0,  // Make sure totalIncome is always valid
          });
        } catch (error) {
          console.error("Error fetching antrian data:", error);
        }
      }
    };

    fetchAntrianData();
  }, [platNomor]);


  return (
    <div className="flex justify-between gap-6 p-6 rounded-lg w-full max-w-6xl mx-auto bg-white">
      <div className="flex items-start gap-4">
        <FaCar className="text-blue-700 text-5xl" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Jenis Mobil
          </h3>
          <p className="text-gray-500 text-sm">{antrianData?.tipeMobil || "Loading..."}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex justify-between w-52">
          <p className="text-gray-500 text-sm">Biaya Layanan</p>
          <p className="text-gray-900 text-sm">
            {antrianData?.totalIncome
              ? `${antrianData.totalIncome.toLocaleString("id-ID")}`
              : "Loading..."}
          </p>
        </div>
        <div className="flex justify-between w-52 mt-1">
          <p className="text-gray-500 text-sm">Admin</p>
          <p className="text-gray-900 text-sm">-</p>
        </div>
        <div className="flex justify-between w-52 mt-2 font-semibold">
          <p className="text-gray-900 text-sm">Total Price</p>
          <p className="text-gray-900 text-sm">
            {antrianData?.totalIncome
              ? `${antrianData.totalIncome.toLocaleString("id-ID")}`
              : "Loading..."}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-2">Overall price Care</p>
      </div>
    </div>
  );
};

export default SummaryCard;
