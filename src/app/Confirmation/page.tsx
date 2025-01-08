"use client"
import React from 'react';
import Logo from './components/ui/Logo';
import Header from './components/ui/Header';
import Button from './components/ui/Button';
import Divider from './components/ui/Divider';
import Footer from './components/ui/Footer';
import LogoFooter from './components/ui/LogoFooter';
import { useRouter } from 'next/navigation'; 

const HomePage: React.FC = () => {
  const router = useRouter();
  
  const handleRedirect = () => {
    router.push('/underDevelopment');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50 py-6 px-4">
      {/* Logo */}
      <Logo />

      {/* Header */}
      <Header />

      {/* Tombol Scan */}
      <div className="w-full max-w-md">
        <Button
          label="Scan Disini"
          icon={<i className="fas fa-qrcode"></i>}
          onClick={handleRedirect}
          className="w-full"
        />
      </div>

      {/* Divider */}
      <Divider />

      {/* Tombol Telepon dan Plat Nomor */}
      <div className="w-full max-w-md space-y-2">
        <Button
          label="Gunakan Nomor Telepon"
          icon={<i className="fas fa-phone"></i>} // Ikon untuk nomor telepon
          onClick={() => router.push('/confirmationTelp')}
          className="w-full"
        />
        
        <Button
          label="Gunakan Plat Nomor"
          icon={<i className="fas fa-car"></i>} // Ikon untuk plat nomor
          onClick={() => router.push('/confirmationBM')}
          className="w-full"
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Background Image */}
      <div className="w-full">
        <LogoFooter />
      </div>
    </div>
  );
};

export default HomePage;