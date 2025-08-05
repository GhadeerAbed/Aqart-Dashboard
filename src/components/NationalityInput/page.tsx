"use client"
import React, { useState, useEffect } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "../SelectBox/page";

export const NationalityInput = ({ register, setValue ,initialValue}:{ register:any, setValue:any, initialValue?: { name: string, _id: string } }) => {
  const { data: Nationalities } = useSWRHook(
    API_SERVICES_URLS.GET_ALL_NATIONALITY
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

  const selectBoxOptions = Array.isArray(Nationalities?.data?.data)
    ? Nationalities.data.data.map((city:any) => ({
        value: city.value,
        label: city.label,
      }))
    : [];

  useEffect(() => {
    if (initialValue) {
      setValue("city", initialValue._id);
    }
    register("nationality");
  }, [register]);

  const handleChange = (value:any) => {
    setSelectedSource(value?.value ?? null);
    setValue("nationality", value?.value ?? null); // Update the form value
  };

  return (
    <SelectBox
      value={selectedSource}
      onChange={handleChange}
      name="nationality"
      options={selectBoxOptions}
      defaultValue="Nationalities"
      label="Nationalities"
      selectClassName="!pl-3 !bg-backgroundColor"
    />
  );
};

export default NationalityInput;
