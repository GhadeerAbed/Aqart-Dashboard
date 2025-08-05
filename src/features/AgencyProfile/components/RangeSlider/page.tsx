import React, { useState } from "react";

export const RangeSlider = ({ initialValue, rangeName, onRangeChange }: { initialValue: number; rangeName: string; onRangeChange: (value: number) => void }) => {
  const [value, setValue] = useState(initialValue);

  const handleRangeChange = (event: any) => {
    const newValue = event.target.value;
    setValue(newValue);
    onRangeChange(newValue); // Call the callback to update the parent component
  };

  return (
    <div className="w-full flex-1">
      <div className="text-sm flex justify-between items-center px-1">
        <span>{rangeName}</span>
        <span>{value}%</span>
      </div>
      <input
        className="h-4 max-w-90 bg-gray-800 rounded-full outline-none range"
        type="range"
        value={value}
        min="0"
        max="100"
        onChange={handleRangeChange}
        onMouseMove={handleRangeChange}
      />
    </div>
  );
};

export default RangeSlider;
