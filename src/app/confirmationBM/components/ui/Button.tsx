// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      className={`px-6 py-3 font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;