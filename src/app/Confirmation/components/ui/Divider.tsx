// src/components/Divider.tsx
import React from 'react';

const Divider: React.FC = () => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-2 text-gray-400">or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
