"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "@/components/SelectBox/page";
import { Button, Search } from "@/components/page";
import { Types } from "./data/page";
import PropTable from "./components/PropTable/page";
import Modal from "./components/Modal/page";

interface PropertyProps {
  propStatus?: boolean;
  types?: any[];
  defaultState?: string;
}

export const PropList: React.FC<PropertyProps> = ({
  propStatus = false,
  types = Types,
  defaultState = "Sale",
}) => {
  const API_SERVICES_URLS = {
    GET_PROP_LIST: (
      page: number,
      status: string,
      keyword: string,
      params: any,
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/property?page=${page}&limit=20&keyword=${keyword}`;

      if (propStatus) {
        url += `&status=${status}`;
      } else {
        url += `&type=${status}`;
      }

      const queryStrings = Object.entries(params)
        .filter(([key, value]) => value)
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
  const [selectedState, setSelectedState] = useState(defaultState);

  const [initialSelectBoxOptions, setInitialSelectBoxOptions] = useState({
    category: [],
    PropertyType: [],
    RentalPeriod: [],
    FurnishedType: [],
    agent: [],
    area: [],
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    category: [],
    PropertyType: [],
    RentalPeriod: [],
    FurnishedType: [],
    agent: [],
    area: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [selectedFurnishedType, setSelectedFurnishedType] = useState<
    string | null
  >(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState<
    string | null
  >(null);
  const [advancedFilters, setAdvancedFilters] = useState({});

  const {
    data: propResponseData,
    isLoading: isLoadingProps,
    mutate,
  } = useSWRHook(
    API_SERVICES_URLS.GET_PROP_LIST(
      currentPage,
      selectedState,
      searchTerm,
      {
        ...advancedFilters,
        category: selectedCategory,
        propertyType: selectedPropertyType,
        rentalPeriod: selectedRentalPeriod,
        furnishingType: selectedFurnishedType,
        area: selectedArea,
        agent: selectedAgent,
      },
      sortColumn
    )
  );

  useEffect(() => {
    if (propResponseData && Array.isArray(propResponseData.data.data)) {
      const leads = propResponseData.data.data;

      // Extract all unique options
      const categories = getAllCategories(leads);
      const PropertyTypes = getAllPropertyTypes(leads);
      const FurnishedTypes = getAllFurnishedType(leads);
      const areas = getAllArea(leads);
      const agents = getAllAgents(leads);
      const RentalPeriods = getAllPeriods(leads);
      if (
        Object.keys(initialSelectBoxOptions).every(
          (key) => initialSelectBoxOptions[key].length === 0
        )
      ) {
        setInitialSelectBoxOptions({
          category: categories,
          PropertyType: PropertyTypes,
          RentalPeriod: RentalPeriods,
          FurnishedType: FurnishedTypes,
          area: areas,
          agent: agents,
        });
      }
    }
  }, [propResponseData]);

  useEffect(() => {
    setSelectBoxOptions(initialSelectBoxOptions);
    mutate();
  }, [
    selectedCategory,
    selectedAgent,
    selectedPropertyType,
    selectedFurnishedType,
    selectedArea,
    sortColumn,
    initialSelectBoxOptions,
    selectedRentalPeriod,
    mutate,
  ]);

  const getAllCategories = (props) => {
    return [...new Set(props.map((prop) => prop.category))].map((category) => ({
      label: category,
      value: category,
    }));
  };

  const getAllPropertyTypes = (props) => {
    return [...new Set(props.map((prop) => prop.propertyType))].map(
      (propertyType) => ({
        label: propertyType,
        value: propertyType,
      })
    );
  };

  const getAllFurnishedType = (props) => {
    return [...new Set(props.map((prop) => prop.furnishingType))].map(
      (propertyType) => ({
        label: propertyType,
        value: propertyType,
      })
    );
  };

  const getAllArea = (props) => {
    return [...new Set(props.map((prop) => prop.area))].map((area) => ({
      label: area,
      value: area,
    }));
  };

  const getAllAgents = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.agent?._id))].map((agent) => ({
      label: leads.find((lead) => lead.agent?._id === agent)?.agent?.fullName,
      value: agent,
    }));
  };

  const getAllPeriods = (props: any) => {
    return [...new Set(props.map((prop) => prop.rentalPeriod))].map(
      (period) => ({
        label: period,
        value: period,
      })
    );
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  const handleAdvancedFilterSubmit = (filters) => {
    setAdvancedFilters(filters);
  };

  return (
    <div className="max-w-[1200px] min-h-screen">
      <div className="flex flex-row justify-center items-center gap-x-4 pt-5  flex-wrap">
        {types.map((type) => (
          <Button
            key={type.value}
            onClick={() => {
              setSelectedState(type.value);
            }}
            buttonSize="small"
            className={`bg-tabColor border max-custom:mt-2 border-tabBorder text-fontColor1 font-[500] ${
              selectedState === type.value ? "bg-primary text-white" : ""
            }`}
          >
            {type.name}
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

        <p className="text-darkSecondary px-3 pt-16">Filter By</p>
        <div className="flex flex-row gap-3 pb-6 px-2 mt-1 flex-wrap">
          <SelectBox
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value?.value ?? null)}
            name={"Category"}
            options={selectBoxOptions.category}
            defaultValue={"Category"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedRentalPeriod}
            onChange={(value) => setSelectedRentalPeriod(value?.value ?? null)}
            name={"rentalPeriod"}
            options={selectBoxOptions.RentalPeriod}
            defaultValue={"Rental Periods"}
            className="max-w-[150px]"
          />
          <SelectBox
            value={selectedPropertyType}
            onChange={(value) => setSelectedPropertyType(value?.value ?? null)}
            name={"propertyType"}
            options={selectBoxOptions.PropertyType}
            defaultValue={"Property Type"}
            className="max-w-[140px]"
          />
          <SelectBox
            value={selectedFurnishedType}
            onChange={(value) => setSelectedFurnishedType(value?.value ?? null)}
            name={"furnishingType"}
            options={selectBoxOptions.FurnishedType}
            defaultValue={"Furnished Type"}
            className="max-w-[150px]"
          />
          <SelectBox
            value={selectedArea}
            onChange={(value) => setSelectedArea(value?.value ?? null)}
            name={"area"}
            options={selectBoxOptions.area}
            defaultValue={"Area"}
            className="max-w-[100px]"
          />
          <SelectBox
            value={selectedAgent}
            onChange={(value) => setSelectedAgent(value?.value ?? null)}
            name={"agent"}
            options={selectBoxOptions.agent}
            defaultValue={"Agent"}
            className="max-w-[130px]"
          />
          <Modal
            filterType={selectedState}
            onSubmit={handleAdvancedFilterSubmit}
          />
        </div>
      </div>
      <div className={"bg-lightSecondary rounded-[15px]   "}>
        <PropTable
          leadResponseData={propResponseData}
          isLoadingLeads={isLoadingProps}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setSortColumn={setSortColumn}
          filterTypes={types}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default PropList;
