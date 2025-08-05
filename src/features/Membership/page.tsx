"use client";

import React, { useEffect, useState } from "react";
import { MembershipTable } from "./components/page";
import { Search } from "../../components/page";
import { useSWRHook } from "@/hooks/page";
import SelectBox from "@/components/SelectBox/page";

export const MembershipInvoiceWarper: React.FC = () => {
  const API_SERVICES_URLS = {
    GET_INVOICE_LIST: (
      page: number,
      keyword: string,
      params: any,
      sortColumn: string | null = null
    ) => {
      let url = `/api/v1/payment?page=${page}&limit=20&status=Accepted&keyword=${keyword}`;
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
    status: [],
    invoiceType: [],
  });
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    status: [],
    invoiceType: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate
  } = useSWRHook(
    API_SERVICES_URLS.GET_INVOICE_LIST(
      currentPage,
      searchTerm,
      {
        packagesType: selectedType,
        status: selectedStatus,
      },
      sortColumn
    )
  );

  useEffect(() => {
    if (leadResponseData && Array.isArray(leadResponseData.data.data)) {
      const leads = leadResponseData.data.data;

      const selectedTypes = getAllTypes(leads);
      const statues = getAllStatuses(leads);

      if (
        Object.keys(initialSelectBoxOptions).every( (key) => initialSelectBoxOptions[key].length === 0)) {
        setInitialSelectBoxOptions({
          invoiceType: selectedTypes,
          status: statues,
        });
      }
    }
  }, [initialSelectBoxOptions]);

  useEffect(() => {
    if (
      Object.keys(initialSelectBoxOptions).some(
        (key) => initialSelectBoxOptions[key].length > 0
      )
    ) {
      setSelectBoxOptions(initialSelectBoxOptions);
      mutate()
    }
  }, [sortColumn, initialSelectBoxOptions, selectedType]);

  const getAllTypes = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.packagesType))].map(
      (packagesType) => ({
        label: packagesType,
        value: packagesType,
      })
    );
  };

  const getAllStatuses = (leads: any[]) => {
    return [...new Set(leads.map((lead) => lead.isPaid))].map((isPaid) => ({
      label: isPaid ? "Paid" : "Not Paid",
      value: isPaid,
    }));
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
            value={selectedType}
            onChange={(value) => setSelectedType(value?.value ?? null)}
            name={"invoiceType"}
            options={selectBoxOptions.invoiceType}
            defaultValue={"Invoice Type"}
            className="max-w-[130px]"
          />
          <SelectBox
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value?.value ?? null)}
            name={"status"}
            options={selectBoxOptions.status}
            defaultValue={"Status"}
            className="max-w-[130px]"
          />
        </div>
      </div>
      <div className={"bg-lightSecondary rounded-[15px]   "}>
        <MembershipTable
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

export default MembershipInvoiceWarper;
