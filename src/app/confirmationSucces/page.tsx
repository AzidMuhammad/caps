// src/app/confirmationSucces/page.tsx
import React from 'react';
import Logo from './components/ui/Logo';
import Header from './components/ui/Header';
import Button from './components/ui/Button';
import Footer from './components/ui/Footer';
import BackgroundImage from './components/ui/BackgroundImage';

const ConfirmationPage: React.FC = () => {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-between bg-gray-50 pt-12"> {/* Tambahkan padding-top */}
        {/* Background Image */}
        <BackgroundImage />
  
        <div className="relative z-10 flex flex-col items-center justify-center w-full mt-16"> {/* Tambahkan margin-top */}
          {/* Logo */}
          <div className="mb-6">
            <Logo />
          </div>
  
          {/* Header */}
          <Header title="Confirmation Successfully" className="mt-4" />
  
          {/* Tombol Continue */}
          <div className="w-full max-w-md px-4 mt-8">
            <Button
              label="CONTINUE"
              onClick={() => alert('Continue clicked!')}
              className="w-full text-lg"
            />
          </div>
  
          {/* Footer */}
          <Footer />
        </div>
      </div>
    );
  };
  
  export default ConfirmationPage;