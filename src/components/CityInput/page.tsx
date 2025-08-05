"use client"
import React, { useState, useEffect } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "../SelectBox/page";

export const CityInput = ({
  register,
  setValue,
  initialValue,
  id
}: {
  register: any;
  setValue: any;
  initialValue?: any;
  id?:any
}) => {
  const { data: cities } = useSWRHook(
    API_SERVICES_URLS.GET_CITY_BY_COUNTRY_ID("66107d86bb7961c5a8528bff")
  );

  const [selectedSource, setSelectedSource] = useState(() => {
    if (initialValue) {
      return {
        value: initialValue._id,
        label: initialValue.name,
      };
    }
    return null;
  });

  const selectBoxOptions = Array.isArray(cities?.data?.data)
    ? cities.data.data.map((city: any) => ({
        value: city.value,
        label: city.label,
      }))
    : [];

  useEffect(() => {
    if (initialValue) {
      setValue("city", initialValue._id);
    }
    register("city"); // Register the field with react-hook-form
  }, [register]);


  const handleChange = (value: any) => {
    setSelectedSource(value?.value ?? null);
    setValue("city", value?.value ?? null); // Update the form value
  };
  return (
    <SelectBox
      value={selectedSource}
      onChange={handleChange}
      name="city"
      options={selectBoxOptions}
      defaultValue="City"
      label="City"
      selectClassName="!pl-3 !bg-backgroundColor"
    />
  );
};

export default CityInput;
