// src/components/ui/LogoFooter.tsx
import React from 'react';

const LogoFooter: React.FC = () => {
  return (
    <div className="w-full flex justify-center -mb-6">
      <img
        src="/images/carwash/bg3.png"
        alt="Carwash Background"
        className="w-full h-auto max-w-screen-xl object-cover"
      />
    </div>
  );
};

export default LogoFooter;
