
import {
  CheckIconMini,
} from "../../../../lib/@heroicons/page";
import { useSingleChecked } from "../../../../hooks/page";
import React from "react";

export const PropertyType = ({ images, className, onChange }: { images: any, className?: string, onChange: Function }) => {
  const { checkedIndex, handleCheck } = useSingleChecked(0);

  const handleCheckAndChange = (index: number) => {
    handleCheck(index);
    onChange(images[index].name);
  };

  return (
    <div className={`flex gap-x-14 justify-center items-center w-full ${className}`}>
      {images.map((image: any, i: number) => (
        <div key={i} className="flex flex-col items-center justify-center py-2">
          <div
            onClick={() => handleCheckAndChange(i)}
            className={`cursor-pointer pb-4 ${checkedIndex === i ? "text-primary" : "text-secondary"}`}
          >
            <CheckIconMini className="w-6 h-6 mx-auto" />
          </div>
          <div className={`${checkedIndex === i ? "text-primary" : "text-darkSecondary"}`}>
            {React.createElement(image.image)}
            <p className="pt-3 text-sm text-center">{image.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyType;
