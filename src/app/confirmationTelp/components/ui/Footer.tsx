// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-500">
        <i className="fas fa-shield-alt"></i> All your data are safe
        <br />
        <span className="text-sm">
          We are using the most advanced security to provide you the best experience ever.
        </span>
      </p>
      <p className="mt-4 text-sm">
        Not Registered yet?{' '}
        <a href="#" className="text-blue-600 hover:underline">
          Ask To Register Table
        </a>
      </p>
    </div>
  );
};

export default Footer;
