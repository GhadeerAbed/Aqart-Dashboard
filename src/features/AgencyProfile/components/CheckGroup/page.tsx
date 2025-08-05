import { CheckIconMini } from '@/lib/@heroicons/page';
import React from 'react';

export const CheckGroup: React.FC<{
  className: string;
  options: any[];
  selectedOptions: any[];
  onCheckboxChange: (value: string) => void;
  fontClassName: string;
}> = ({ className, options, selectedOptions, onCheckboxChange, fontClassName }) => {
  return (
    <div className={className}>
      {options?.map((item) => (
        <div key={item.value}>
          <div className={fontClassName}>
            {/* Display the name without a checkbox */}
            <strong className='capitalize'>{item.label}</strong>
          </div>
          <div className="pt-3">
            {item.permissions?.map((permission: any) => (
    
            <div
            key={permission.value}
            className="flex flex-row py-[5px] items-center"
            onClick={() => onCheckboxChange(permission.value)}
          >
            <CheckIconMini
              className={`w-6 h-6 cursor-pointer ${
                selectedOptions?.includes(permission.value)
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
              }`}
            />
            <span className={`px-2 font-nunito text-sm ${fontClassName}`}>{permission.label}</span>
          </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Usage
