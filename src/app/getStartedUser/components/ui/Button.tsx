import React from 'react';

export interface ButtonProps {
  label: string; 
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; 
  className?: string; 
  width?: string;
}

const ButtonGetStarted: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  width = '628px', // Lebar default sesuai desain
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-white font-medium rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
      style={{
        backgroundColor: '#3676E0', // Warna biru dari desain
        color: '#FFFFFF', // Warna teks putih
        width: width, // Lebar tombol
        height: '49px', // Tinggi tombol sesuai desain
        border: 'none', // Hilangkan border
        borderRadius: '4px', // Sesuai desain
      }}
    >
      {label}
    </button>
  );
};

export default ButtonGetStarted;