import React from "react";
import { PropDesc, PropDetails } from "../page";

export const FirstStep = ({
  selectedTransaction,
  register,
  setValue,
  propertyData,
  watch
}: {
  selectedTransaction: string;
  register: any;
  setValue: any;
  propertyData:any
  watch:any
}) => {
  return (
    <div className="max-w-[648px]">
      <PropDesc
        register={register}
        setValue={setValue}
        propertyData={propertyData}
      />
      <PropDetails
        selectedTransaction={selectedTransaction}
        register={register}
        setValue={setValue}
        propertyData={propertyData}
        watch={watch}
      />
    </div>
  );
};

export default FirstStep;
