// src/components/BackgroundImage.tsx
import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <div className="mt-10 left-0">
      <img
        src="images/carwash/bg3.png" // Pastikan file ada di public/images
        alt="Car Background"
        className="w-full h-auto"
      />
    </div>
  );
};

export default BackgroundImage;
