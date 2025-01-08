// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
