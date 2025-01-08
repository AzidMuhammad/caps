// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">Confirmation</h2>
      <p className="text-gray-600">
        Untuk Melihat Progres Pencucian Mobil, Scan Barcode Pada Nomor Struk Anda
      </p>
    </div>
  );
};

export default Header;
