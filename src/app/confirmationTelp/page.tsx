// src/app/page.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Logo from './components/ui/Logo';
import Header from './components/ui/Header';
import Button from './components/ui/Button';
import InputField from './components/ui/Input';
import Footer from './components/ui/Footer';
import LogoFooter from './components/ui/LogoFooter';

const ConfirmationTelp: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    if (phoneNumber.trim()) {
      // Navigate to the SummaryCard page with the phone number as a query parameter
      router.push(`/progressSatu?nomorTelepon=${phoneNumber}`);
    } else {
      alert("Please enter a phone number.");
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
          placeholder="Nomor Hp"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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

export default ConfirmationTelp;
