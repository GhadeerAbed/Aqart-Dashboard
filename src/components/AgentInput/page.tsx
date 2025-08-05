"use client"
// import React, { useState, useEffect } from "react";
// import { API_SERVICES_URLS } from "@/data/page";
// import { useSWRHook } from "@/hooks/page";
// import SelectBox from "../SelectBox/page";

// export const AgentInput = ({
//   register,
//   setValue,
//   type = "agent", 
// }: {
//   register: any;
//   setValue: any;
//   type?: "agent" | "agency" | "manager" | "all"; 
// }) => {
//   const apiUrl = {
//     agent: API_SERVICES_URLS.GET_ALL_Agent,
//     agency: API_SERVICES_URLS.GET_ALL_Agency,
//     manager: API_SERVICES_URLS.GET_ALL_AgencyManger,
//     all: API_SERVICES_URLS.GET_ALL_USER,
//   }[type];

//   const label = {
//     agent: "Agents",
//     agency: "Agencies",
//     manager: "Managers",
//     all: "Agents",
//   }[type];

//   const { data: listData } = useSWRHook(apiUrl);
//   const [selectedValue, setSelectedValue] = useState<string | null>(null);

//   const selectBoxOptions = Array.isArray(listData?.data?.data)
//     ? listData.data.data.map((item: any) => ({
//         value: item._id,
//         label: item.fullName, 
//       }))
//     : [];

//   useEffect(() => {
//     if (type === "all") {
//       register("agent");
//     } else {
//       register(type);
//     }
//   }, [register, type]);

//   const handleChange = (value: any) => {
//     setSelectedValue(value?.value ?? null);
//     setValue(type === "all" ? "agent" : type, value?.value ?? null);
//   };

//   return (
//     <SelectBox
//       value={selectedValue}
//       onChange={handleChange}
//       name={type === "all" ? "agent" : type}
//       options={selectBoxOptions}
//       defaultValue={type}
//       label={label}
//       selectClassName="!pl-3 !bg-backgroundColor"
//     />
//   );
// };

// export default AgentInput;
import { useEffect, useState } from "react";
import SelectBox from "../SelectBox/page";
import { useSWRHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";


export const AgentInput = ({
  register,
  setValue,
  type = "agent", // default type is "agent"
  initialValue,
}: {
  register: any;
  setValue: any;
  type?: "agent" | "agency" | "manager" | "all"; 
  initialValue?: { _id: string; fullName: string } | null; 
}) => {
  const apiUrl = {
    agent: API_SERVICES_URLS.GET_ALL_Agent,
    agency: API_SERVICES_URLS.GET_ALL_Agency,
    manager: API_SERVICES_URLS.GET_ALL_AgencyManger,
    all: API_SERVICES_URLS.GET_ALL_USER,
  }[type];

  const label = {
    agent: "Agents",
    agency: "Agencies",
    manager: "Managers",
    all: "Agents",
  }[type];

  const { data: listData } = useSWRHook(apiUrl);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    initialValue ? initialValue._id : null
  );

  const selectBoxOptions = Array.isArray(listData?.data?.data)
    ? listData.data.data.map((item: any) => ({
        value: item._id,
        label: item.fullName,
      }))
    : [];

  useEffect(() => {
    if (type === "all") {
      register("agent");
    } else {
      register(type);
    }

    if (initialValue) {
      setValue(type === "all" ? "agent" : type, initialValue._id);
    }
  }, [register, setValue, type, initialValue]);

  const handleChange = (value: { value: string; label: string }) => {
    setSelectedValue(value?.value);
    setValue(type === "all" ? "agent" : type, value?.value);
  };

  return (
    <SelectBox
      value={selectBoxOptions.find(option => option.value === selectedValue) || null}
      onChange={handleChange}
      name={type === "all" ? "agent" : type}
      options={selectBoxOptions}
      label={label}
      selectClassName="!pl-3 !bg-backgroundColor"
      defaultValue={selectedValue}
    />
  
  );
};

export default AgentInput;
