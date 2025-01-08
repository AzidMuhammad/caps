"use client";
import React from 'react';
import ButtonGetStarted from './Button';
import { useRouter } from 'next/navigation'; 

const PageGetStarted: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/Confirmation');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/images/logo/logo.png"
          alt="Kenz Logo"
          className="h-50"
        />
      </div>

      {/* Judul */}
      <h1 className="text-2xl font-bold text-center mb-4">
        The best place for Treatment Car
      </h1>

      {/* Sub-judul */}
      <p className="text-gray-600 text-center mb-8">
        Your destination is at your fingertips. Open app & enter where you want to go.
      </p>

      {/* Tombol */}
      <ButtonGetStarted
        label="Get Started"
        onClick={handleRedirect} // Tambahkan handler redirect
        className="bg-blue-500 mb-30"
        width="628px" // Sesuai desain
      />

      {/* Background Image */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src="/images/carwash/bg3.png" // Pastikan gambar sesuai path
          alt="Car Illustration"
          className="w-300 h-auto"
        />
      </div>
    </div>
  );
};

export default PageGetStarted;
