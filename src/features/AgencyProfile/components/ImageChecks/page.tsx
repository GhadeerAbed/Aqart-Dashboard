import React from "react";
import { CheckIconMini } from "../../../../lib/@heroicons/page";



export const ImageChecks = ({ images ,checkedIndex, handleCheck  }: { images: any,checkedIndex :any, handleCheck :any}) => {
  

  //if array  checkedStates[i] , if single checkedState === i
  return (
    <div className="flex gap-16 items-center w-full">
      {images.map((image:any,i:number) => (
        <div key={i} className="flex flex-col items-center py-2">
          <div
            onClick={() => handleCheck(i)}
            className={`cursor-pointer ${
              checkedIndex === i ? "text-primary" : "text-secondary"
            }`}
          >
            <CheckIconMini className="w-6 h-6 mx-auto" />
          </div>
          <div
            className={`w-9 h-9  py-4 ${
              checkedIndex === i ? "text-primary" : "text-fontColor1"
            }`}
          >
            {React.createElement(image.image)}
          </div>
          <p className="pt-5 text-[12px]">{image.name}</p>
        </div>
      ))}
    </div>
  );
};
