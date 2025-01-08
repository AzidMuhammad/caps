// src/app/components/ui/ProgressDetail.tsx
import React from 'react';

interface ProgressDetailProps {
  antrian: {
    namaPelanggan: string;
    platNomor: string;
    tipeMobil: string;
    status: string;
    createdAt: string;
    nomorTelepon: string;
  };
}

const ProgressDetail: React.FC<ProgressDetailProps> = ({ antrian }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-4">
      <h4 className="text-lg font-semibold text-gray-700">Antrian Detail</h4>
      <p className="text-sm text-gray-600">Nama Pelanggan: {antrian.namaPelanggan}</p>
      <p className="text-sm text-gray-600">Plat Nomor: {antrian.platNomor}</p>
      <p className="text-sm text-gray-600">Tipe Mobil: {antrian.tipeMobil}</p>
      <p className="text-sm text-gray-600">Nomor Telepon: {antrian.nomorTelepon}</p>
      <p className="text-sm text-gray-600">Status: {antrian.status}</p>
      <p className="text-sm text-gray-600">
        Created At: {new Date(antrian.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ProgressDetail;
