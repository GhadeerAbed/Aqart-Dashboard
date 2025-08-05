"use client"
import React, { useState, useEffect } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "../SelectBox/page";

export const LanguageInput = ({register,setValue}:{register:any,setValue:any}) => {
    const { data: spokenLanguages } = useSWRHook(
        API_SERVICES_URLS.GET_ALL_SPOKENLANGUAGE
      );

  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    register("preferredLanguage"); // Register the field with react-hook-form
  }, [register]);

  const handleChange = (value:any) => {
    setSelectedSource(value?.value ?? null);
    setValue("preferredLanguage", value?.value ?? null); // Update the form value
  };

  const selectBoxOptions = Array.isArray(spokenLanguages?.data?.data)
    ? spokenLanguages.data.data.map((city:any) => ({
        value: city.value,
        label: city.label,
      }))
    : [];


  return (
    <SelectBox
      value={selectedSource}
      onChange={handleChange}
      name="preferredLanguage"
      options={selectBoxOptions}
      defaultValue="Preferred Language"
      label="Preferred Language"
      selectClassName="!pl-3 !bg-backgroundColor"
    />
  );
};

export default LanguageInput;