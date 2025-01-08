"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './components/ui/Logo';
import Header from './components/ui/Header';
import Button from '../confirmationTelp/components/ui/Button';
import InputField from '../confirmationTelp/components/ui/Input';
import Footer from './components/ui/Footer';
import LogoFooter from '../confirmationTelp/components/ui/LogoFooter';

const ConfirmationPlatNomor: React.FC = () => {
  const [platNomor, setPlatNomor] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    if (platNomor.trim()) {
      console.log(`Navigating to /progressBM?platNomor=${platNomor}`); // Debug log
      router.push(`/progressBM?platNomor=${platNomor}`);
    } else {
      alert("Please enter a Plat Nomor.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between bg-gray-50 py-8">
      {/* Logo */}
      <Logo />

      {/* Header */}
      <Header />

      {/* Input Field */}
      <div className="w-full max-w-md px-4">
        <InputField
          placeholder="Plat Nomor"
          value={platNomor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatNomor(e.target.value)}
        />
      </div>

      {/* Tombol Scan */}
      <div className="w-full max-w-md px-4">
        <Button
          label="Scan Disini"
          onClick={handleButtonClick}
          className="w-full"
        />
      </div>

      {/* Footer */}
      <Footer />
      <LogoFooter />
    </div>
  );
};

export default ConfirmationPlatNomor;
