import React from "react";
import { AmenitiesGroup, PropsNumbers } from "../page";

export const ThirdStep = ({
  selectedType,
  register,
  setValue,
  propertyData
}: {
  selectedType: string;
  register: any;
  setValue: any;
  propertyData:any;
}) => {
  return (
    <div className="max-w-[648px]">
      <PropsNumbers
        selectedType={selectedType}
        register={register}
        setValue={setValue}
        propertyData={propertyData}
      />
      <AmenitiesGroup
        selectedType={selectedType}
        register={register}
        setValue={setValue}
        // propertyData={propertyData}
      />
    </div>
  );
};

export default ThirdStep;
