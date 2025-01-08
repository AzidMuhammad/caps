// components/Button.tsx
import React from 'react';

export interface ButtonProps {
  label: string; // Teks yang ditampilkan pada tombol
  onClick: () => void; // Fungsi yang akan dipanggil saat tombol diklik
  type?: 'button' | 'submit' | 'reset'; // Jenis tombol (opsional)
  disabled?: boolean; // Apakah tombol dinonaktifkan (opsional)
  className?: string; // Kelas CSS tambahan (opsional)
  width?: string; // Lebar tombol (opsional)
}

export const ButtonCustomer: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  width = 'auto',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 text-white font-medium rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
};
