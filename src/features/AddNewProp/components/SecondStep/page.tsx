import { Input } from "../../../../components/page";

import React, { useRef } from "react";
import GoogleMapSearch from "../GoogleMapSearch/page";

export const SecondStep = ({
  register,
  setValue,
  propertyData,
}: {
  register: any;
  setValue: any;
  propertyData: any;
}) => {
  const searchBoxRef = useRef(null);

  return (
    <div className="max-w-[648px] bg-lightSecondary w-full rounded-2xl px-3 py-2 mt-5">
      <h1 className="font-semibold mb-4 uppercase">Property location</h1>
      <form>
        <Input
          label="Property Location*"
          id="area"
          type="text"
          placeholder="Search for a location in UAE"
          inputClassName="pl-4 !bg-backgroundColor sr-only"
          {...register("area")}
        />
        <input
        {...register("propertyLocation")}
          ref={searchBoxRef}
          type="text"
          placeholder="Search for a location in UAE"
          className="w-full rounded-full !bg-backgroundColor !py-[6px] !border-borderColor !focus:border-black focus:ring-black"
        />

        <div className="grid custom:grid-cols-2 gap-4 py-1 mt-2">
          <Input
            label="City"
            id="city"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("city")}
          />
          <Input
            label="Building Name"
            id="buildingName"
            type="text"
            inputClassName="pl-4 !bg-backgroundColor"
            {...register("buildingName")}
          />
        </div>
        <div className="grid custom:grid-cols-2 gap-x-4  ">
        <Input
          label="Area"
          id="area"
          type="text"
          inputClassName="pl-4 !bg-backgroundColor "
          {...register("area")}
        />
          <Input
          label="district"
          id="district"
          type="text"
          inputClassName="pl-4 !bg-backgroundColor "
          {...register("district")}
        />
        </div>

        <span className="text-darkSecondary text-sm font-[500]">
          Address Location*
        </span>
        <GoogleMapSearch searchBoxRef={searchBoxRef} setValue={setValue} />
      </form>
    </div>
  );
};
