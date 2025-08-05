"use client";

import React, { useEffect, useState } from "react";
import { DashTable } from "./components/page";
import { useSWRHook } from "@/hooks/page";

export const DashboardList: React.FC = () => {
  const API_SERVICES_URLS1 = {
    GET_LEADS_LIST: (
      page: number,
      keyword?: string,
      params: any,
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/analysis?page=${page}&limit=20&&keyword=${keyword}`;
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

  const [currentPage, setCurrentPage] = useState(1);

  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS1.GET_LEADS_LIST(currentPage, sortColumn ,{}));

  useEffect(() => {
    mutate();
  }, [sortColumn, mutate]);

  return (
    <div className="max-w-[900px] mt-12">
      <div className={"bg-lightSecondary rounded-[15px]   "}>
        <DashTable
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

export default DashboardList;
