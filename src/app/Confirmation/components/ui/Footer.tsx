// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="text-center mt-2">
      <p className="mt-2 text-sm">
        Not Registered yet?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Ask To Register Table
        </a>
      </p>
    </div>
  );
};

export default Footer;
