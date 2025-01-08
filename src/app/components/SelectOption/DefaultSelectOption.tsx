import React from "react";

const DefaultSelectOption: React.FC<{ options: string[] }> = ({ options }) => {
  return (
    <select className="p-2 border rounded">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DefaultSelectOption;
