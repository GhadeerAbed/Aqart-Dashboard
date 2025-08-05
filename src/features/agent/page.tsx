"use client"

import React, { useEffect, useState } from "react";
import { Button, Search, useSelectedState } from "../../components/page";
import { useSWRHook } from "@/hooks/page";
import AgentTable from "./component/AgentTable/page";

export const AgentList: React.FC = () => {
  const API_SERVICES_URLS = {
    GET_PROPS_LIST: (
      page: number,
      status: string,
      keyword: string,
      params: any = {},
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/users?page=${page}&limit=20&userStatus=${status}&keyword=${keyword}&role=Agent`;
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
  const states = [
    { name: "Pending", value: "Pending" },
    { name: "active", value: "Accepted" },
    { name: "Dis-active", value: "Blocked" },
  ];

  const { selectedState, setSelectedState } = useSelectedState();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(
    API_SERVICES_URLS.GET_PROPS_LIST(
      currentPage,
      selectedState,
      searchTerm,
      {},
      sortColumn
    )
  );

  useEffect(() => {
    mutate();
  }, [sortColumn, mutate]);

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-[1200px]">
      <div className="flex flex-row justify-center items-center gap-x-4 pt-5">
        {states.map((state) => (
          <Button
            key={state.value}
            onClick={() => {
              console.log(`State changed to ${state.value}`);
              setSelectedState(state.value);
            }}
            buttonSize="small"
            className={`bg-tabColor border border-tabBorder text-fontColor1 font-[500] uppercase ${
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
      </div>
      <div className={"bg-lightSecondary rounded-[15px] mt-24  "}>
        <AgentTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setSortColumn={setSortColumn}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default AgentList;
