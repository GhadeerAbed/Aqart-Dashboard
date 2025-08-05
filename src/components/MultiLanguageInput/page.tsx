"use client"
import React, { useState, useEffect } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import MultiSelectBox from "../MultiSelectBox/page";

export const MultiLanguageInput = ({ register, setValue ,initialValue=[]}: { register: any; setValue: any , initialValue?: { name: string, _id: string }[]}) => {
  const { data: spokenLanguages } = useSWRHook(API_SERVICES_URLS.GET_ALL_SPOKENLANGUAGE);

  const [selectedSource, setSelectedSource] = useState(initialValue.map((lang) => ({
    value: lang._id,
    label: lang.name,
  })));

  useEffect(() => {
    setValue(
      "spokenLanguage",
      initialValue.map((lang) => lang._id)
    );
    register("spokenLanguage"); // Register the field with react-hook-form
  }, [register]);
 
  const handleChange = (selectedOptions:any[]) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setSelectedSource(selectedOptions);
    setValue("spokenLanguage", selectedIds); // Update the form value with the array of IDs
  };

  const selectBoxOptions = Array.isArray(spokenLanguages?.data?.data)
    ? spokenLanguages.data.data.map((language: any) => ({
        value: language.value,
        label: language.label,
      }))
    : [];

  return (
    <MultiSelectBox
      value={selectedSource}
      onChange={handleChange}
      name="spokenLanguage"
      options={selectBoxOptions}
      defaultValue="Spoken Language"
      label="Spoken Language"
      selectClassName="!pl-3 !bg-backgroundColor"
    />
  );
};

export default MultiLanguageInput;
