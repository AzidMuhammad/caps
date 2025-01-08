// src/components/ui/InputGroup.tsx
import React from 'react';

interface InputGroupProps {
  values: {
    first: string;
    second: string;
    third: string;
  };
  onChange: (field: 'first' | 'second' | 'third', value: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ values, onChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="BM"
        value={values.first}
        onChange={(e) => onChange('first', e.target.value)}
        className="w-20 px-4 py-3 border border-gray-300 rounded-md text-gray-700 text-center focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />
      <input
        type="text"
        placeholder="XXXX"
        value={values.second}
        onChange={(e) => onChange('second', e.target.value)}
        className="w-32 px-4 py-3 border border-gray-300 rounded-md text-gray-700 text-center focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />
      <input
        type="text"
        placeholder="XXX"
        value={values.third}
        onChange={(e) => onChange('third', e.target.value)}
        className="w-20 px-4 py-3 border border-gray-300 rounded-md text-gray-700 text-center focus:ring-2 focus:ring-blue-600 focus:outline-none"
      />
    </div>
  );
};

export default InputGroup;
