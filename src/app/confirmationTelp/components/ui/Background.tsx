// src/components/BackgroundImage.tsx
import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <img
        src="/images/carwash/car.png" // Pastikan file ada di public/images
        alt="Car Background"
        className="w-full h-auto"
      />
    </div>
  );
};

export default BackgroundImage;
