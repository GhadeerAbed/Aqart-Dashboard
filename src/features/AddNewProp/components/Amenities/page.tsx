
import React from "react";
import { CheckIconMini } from "@/lib/@heroicons/page";

export const Amenities = ({
  options,
  selectedOptions,
  onCheckboxChange,
  className,
  fontClassName
}: {
  options: any[];
  selectedOptions: string[];
  onCheckboxChange: (value: string) => void;
  className?:string;
  fontClassName?:string
}) => {
  return (
    <div className={`${className}`}>
      {options?.map((option, index) => (
        <div
          key={index}
          className="flex flex-row py-[5px] items-center"
          onClick={() => onCheckboxChange(option.value)}
        >
          <CheckIconMini
            className={`w-6 h-6 cursor-pointer ${
              selectedOptions?.includes(option.value)
                ? "text-primary"
                : "text-secondary hover:text-primary"
            }`}
          />
          <span className={`px-2 font-nunito text-sm ${fontClassName}`}>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
