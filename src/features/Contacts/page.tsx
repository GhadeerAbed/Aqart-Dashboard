"use client";

import React, { useEffect, useState } from "react";

import { Button, Search } from "../../components/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "@/components/SelectBox/page";
import ContactTable from "./components/ContactTable/page";

export const ContactsList: React.FC = () => {
  const API_SERVICES_URLS = {
    GET_LEADS_LIST: (
      page: number,
      keyword: string,
      params: any,
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/contact?page=${page}&limit=20&keyword=${keyword}`;
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

  const [initialSelectBoxOptions, setInitialSelectBoxOptions] = useState({
    source: [],
    country: [],
    nationality: [],
    spokenLanguage: [],
    enquiryType: [],
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    source: [],
    country: [],
    nationality: [],
    spokenLanguage: [],
    enquiryType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(
    API_SERVICES_URLS.GET_LEADS_LIST(
      currentPage,
      searchTerm,
      {
        source: selectedSource,
        country: selectedCountry,
        nationality: selectedNationality,
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
      const nationalities = getAllNationalities(leads);
      const spokenLanguages = getAllLanguages(leads);
      const enquiryTypes = getAllEnquiryTypes(leads);

      // Set initial options only once
      if (
        Object.keys(initialSelectBoxOptions).every(
          (key) => initialSelectBoxOptions[key].length === 0
        )
      ) {
        setInitialSelectBoxOptions({
          source: sources,
          country: countries,
          nationality: nationalities,
          spokenLanguage: spokenLanguages,
          enquiryType: enquiryTypes,
        });
      }
    }
  }, [initialSelectBoxOptions]);

  useEffect(() => {
    setSelectBoxOptions(initialSelectBoxOptions);
    mutate();
  }, [
    selectedSource,
    selectedCountry,
    selectedNationality,
    selectedLanguage,
    sortColumn,
    initialSelectBoxOptions,
    selectedType,
    mutate,
  ]);

  const getAllEnquiryTypes = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.enquiryType))].map(
      (source) => ({
        label: source,
        value: source,
      })
    );
  };

  const getAllSources = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.source))].map((source) => ({
      label: source,
      value: source,
    }));
  };

  const getAllCountries = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.country._id))].map(
      (country) => ({
        label: leads.find((lead) => lead.country._id === country)?.country.name,
        value: country,
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
            value={selectedNationality}
            onChange={(value) => setSelectedNationality(value?.value ?? null)}
            name={"nationality"}
            options={selectBoxOptions.nationality}
            defaultValue={"Nationality"}
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
            className="max-w-[175px]"
          />
        </div>
      </div>
      <div className={"bg-lightSecondary rounded-[15px]   "}>
        <ContactTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setSortColumn={setSortColumn}
        />
      </div>
    </div>
  );
};

export default ContactsList;
