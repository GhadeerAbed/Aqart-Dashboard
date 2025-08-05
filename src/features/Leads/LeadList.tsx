"use client";

import React, { useEffect, useState } from "react";
import { LeadTable } from "./components/page";
import { Button, Search } from "../../components/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "@/components/SelectBox/page";
import { states } from "./data/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWR } from "@/lib/swr/page";
import { getAuthData } from "@/utils/page";

export const LeadList: React.FC = () => {
  const authData = getAuthData();
  const accessToken = authData?.token || "";
  const API_SERVICES_URLS1 = {
    GET_LEADS_LIST: (
      page: number,
      status: string,
      keyword: string,
      params: any,
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/lead?page=${page}&limit=20&status=${status}&keyword=${keyword}`;
      const queryStrings = Object.entries(params)
        .filter(([key, value]) => value) // Only include params with non-empty values
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      if (queryStrings) {
        url += `&${queryStrings}`;
      }
      if (sortColumn) {
        url += `&sort=${sortColumn}`;
      }
      return url;
    },
  };

  const fetcher = (url: string) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.blob());

  // Use the SWR hook to fetch the sheet data
  const { data: getDownloadSheet, error } = useSWR(
    "https://aqrrat-2.onrender.com/api/v1/lead/downloadBulkSheetForLeads",
    fetcher
  );

  const handleDownload = () => {
    if (!getDownloadSheet) {
      console.error("No data to download");
      return;
    }

    try {
      // Create a blob URL from the API response data
      const url = window.URL.createObjectURL(getDownloadSheet);

      // Create a link element, set its href to the blob URL, and trigger a click to start the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads_bulk_sheet.xlsx"; // Specify the filename
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error while downloading the file:", error);
    }
  };

  const [selectedState, setSelectedState] = useState("New");
  const [initialSelectBoxOptions, setInitialSelectBoxOptions] = useState({
    source: [],
    country: [],
    callStatus: [],
    nationality: [],
    agent: [],
    spokenLanguage: [],
    enquiryType: [],
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    source: [],
    country: [],
    callStatus: [],
    nationality: [],
    agent: [],
    spokenLanguage: [],
    enquiryType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCallStatus, setSelectedCallStatus] = useState<string | null>(
    null
  );
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(
    API_SERVICES_URLS1.GET_LEADS_LIST(
      currentPage,
      selectedState,
      searchTerm,
      {
        source: selectedSource,
        country: selectedCountry,
        callStatus: selectedCallStatus,
        nationality: selectedNationality,
        agent: selectedAgent,
        spokenLanguage: selectedLanguage,
        enquiryType: selectedType,
      },
      sortColumn
    )
  );

  useEffect(() => {
    if (leadResponseData && Array.isArray(leadResponseData.data.data)) {
      const leads = leadResponseData.data.data;

      // Extract all unique options
      const sources = getAllSources(leads);
      const countries = getAllCountries(leads);
      const callStatuses = getAllCallStatuses(leads);
      const nationalities = getAllNationalities(leads);
      const agents = getAllAgents(leads);
      const spokenLanguages = getAllLanguages(leads);
      const selectedTypes = getAllTypes(leads);

      // Set initial options only once
      if (
        Object.keys(initialSelectBoxOptions).every(
          (key) => initialSelectBoxOptions[key].length === 0
        )
      ) {
        setInitialSelectBoxOptions({
          source: sources,
          country: countries,
          callStatus: callStatuses,
          nationality: nationalities,
          agent: agents,
          spokenLanguage: spokenLanguages,
          enquiryType: selectedTypes,
        });
      }
    }
  }, [initialSelectBoxOptions]);

  useEffect(() => {
    setSelectBoxOptions(initialSelectBoxOptions);
    mutate();
  }, [
    selectedSource,
    selectedAgent,
    selectedCountry,
    selectedNationality,
    selectedCallStatus,
    selectedLanguage,
    sortColumn,
    initialSelectBoxOptions,
    mutate,
    selectedType,
  ]);

  const getAllSources = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.source))].map((source) => ({
      label: source,
      value: source,
    }));
  };

  const getAllTypes = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.enquiryType))].map(
      (enquiryType) => ({
        label: enquiryType,
        value: enquiryType,
      })
    );
  };

  const getAllCountries = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.country._id))].map(
      (country) => ({
        label: leads.find((lead) => lead.country._id === country)?.country.name,
        value: country,
      })
    );
  };

  const getAllCallStatuses = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.callStatus))].map(
      (callStatus) => ({
        label: callStatus,
        value: callStatus,
      })
    );
  };

  const getAllNationalities = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.nationality._id))].map(
      (nationality) => ({
        label: leads.find((lead) => lead.nationality._id === nationality)
          ?.nationality.name,
        value: nationality,
      })
    );
  };

  const getAllAgents = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.agent._id))].map((agent) => ({
      label: leads.find((lead) => lead.agent._id === agent)?.agent.fullName,
      value: agent,
    }));
  };
  const getAllLanguages = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.spokenLanguage?._id))].map(
      (spokenLanguage) => ({
        label: leads.find((lead) => lead.spokenLanguage?._id === spokenLanguage)
          ?.spokenLanguage?.name,
        value: spokenLanguage,
      })
    );
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-[1200px]">
      <div className="flex flex-row justify-center items-center gap-x-4 pt-5 flex-wrap ">
        {states.map((state) => (
          <Button
            key={state.value}
            onClick={() => {
              setSelectedState(state.value);
            }}
            buttonSize="small"
            className={`bg-tabColor border border-tabBorder text-fontColor1 max-custom:mt-2 font-[500] ${
              selectedState === state.value ? "bg-primary text-white" : ""
            }`}
          >
            {state.name}
          </Button>
        ))}
      </div>
      <div>
        <div className="flex justify-end mt-10 ml-2">
          <div className="inline-block border-b-2 border-black xs:w-[350px] w-full">
            <Search
              setSearch={handleSearchSubmit}
              inputClass=" mb-4 bg-lightSecondary !py-[3px]"
            />
          </div>
        </div>
        <p className="text-darkSecondary px-3 pt-20">Filter By</p>
        <div className="flex flex-row gap-3 pb-6 px-2 mt-1 flex-wrap">
          <SelectBox
            value={selectedSource}
            onChange={(value) => setSelectedSource(value?.value ?? null)}
            name={"source"}
            options={selectBoxOptions.source}
            defaultValue={"Source"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedCountry}
            onChange={(value) => setSelectedCountry(value?.value ?? null)}
            name={"country"}
            options={selectBoxOptions.country}
            defaultValue={"Country"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedCallStatus}
            onChange={(value) => setSelectedCallStatus(value?.value ?? null)}
            name={"callStatus"}
            options={selectBoxOptions.callStatus}
            defaultValue={"Call Status"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedNationality}
            onChange={(value) => setSelectedNationality(value?.value ?? null)}
            name={"nationality"}
            options={selectBoxOptions.nationality}
            defaultValue={"Nationality"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedAgent}
            onChange={(value) => setSelectedAgent(value?.value ?? null)}
            name={"agent"}
            options={selectBoxOptions.agent}
            defaultValue={"Agent"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value?.value ?? null)}
            name={"spokenLanguage"}
            options={selectBoxOptions.spokenLanguage}
            defaultValue={"Preferred Language"}
            className="max-w-[175px]"
          />
          <SelectBox
            value={selectedType}
            onChange={(value) => setSelectedType(value?.value ?? null)}
            name={"enquiryType"}
            options={selectBoxOptions.enquiryType}
            defaultValue={"Enquiry Type"}
            className="max-w-[130px]"
          />
          <button onClick={handleDownload}>download sheet</button>
        </div>
      </div>
      <div className={"bg-lightSecondary rounded-[15px]   "}>
        <LeadTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setSortColumn={setSortColumn}
          selectedState={selectedState}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default LeadList;
