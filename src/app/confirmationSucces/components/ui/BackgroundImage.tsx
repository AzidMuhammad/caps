// src/components/ui/BackgroundImage.tsx
import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <img
        src="/images/carwash/bg3.png" // Pastikan file gambar ada di public/images/
        alt="Car Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default BackgroundImage;
