
import { InvoiceTable } from "@/features/Membership/components/page";
import React, { useEffect, useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { TableProps } from "@/types/page";
import { getAuthData } from "@/utils/page";
import { Column } from "react-table";
import { useRouter } from "next/navigation";
import { Select } from "@/components/page";
import { callStatus, states } from "../../data/page";
import LeadActionDot from "../LeadActionDot/page";

export const LeadTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
  setSortColumn: any;
  selectedState: any;
  mutate : ()=>void

}> = ({
  leadResponseData,
  isLoadingLeads,
  setCurrentPage,
  currentPage,
  setSortColumn,
  selectedState,
  mutate

}) => {
  const userId = getAuthData()?._id;
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [columns, setColumns] = useState<Column<TableProps>[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const router = useRouter();

  const fixedColumns: Column<TableProps>[] = [
    { id: "fullName", Header: "Full Name", accessor: "fullName" },
    { id: "creation_date", Header: "Creation Date", accessor: "creation_date" },
    { id: "source", Header: "Source", accessor: "source" },
    { id: "mobile_number", Header: "Mobile Number", accessor: "mobile_number" },
    { id: "country", Header: "Country", accessor: "country" },
    { id: "nationality", Header: "Nationality", accessor: "nationality" },
    { id: "email_address", Header: "Email Address", accessor: "email_address" },
    { id: "budget", Header: "Budget", accessor: "budget" },
    { id: "enquiryType", Header: "Enquiry Type", accessor: "enquiryType" },
    {
      id: "call_status",
      Header: "Call Status",
      accessor: "call_status",
      Cell: ({ row }) => {
        const [status, setStatus] = useState(row.original.call_status);
        const { customTrigger: updateLeadState } = useSWRMutationHook(
          API_SERVICES_URLS.UPDATE_LEAD_TABLE(row.original.id),
          "PUT"
        );

        useEffect(() => {
          setStatus(row.original.call_status);
        }, [ row.original.call_status]);

        const handleStatusChange = async (newStatus: string) => {
          setStatus(newStatus);
          try {
            await updateLeadState({ callStatus: newStatus });
            mutate()
            console.log("Lead status updated successfully");
          } catch (error) {
            console.error("Error updating lead status:", error);
            setStatus(row.original.call_status);
          }
        };
        const defaultValue =
          selectedState === status ? status : row.original.call_status;

        return (
          <Select
            key={row.id}
            defaultValue={defaultValue}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            options={callStatus}
            selectClassName="!bg-white border-none focus:border-none focus:outline-none focus:ring-0 !mt-[6px] "
            className="!w-[110px]"
          />
        );
      },
    },

    {
      id: "lead_status",
      Header: "Lead Status",
      accessor: "lead_status",
      Cell: ({ row }) => {
        const [status, setStatus] = useState(row.original.lead_status);
        const { customTrigger: updateLeadState } = useSWRMutationHook(
          API_SERVICES_URLS.UPDATE_LEAD_TABLE(row.original.id),
          "PUT"
        );

        useEffect(() => {
          setStatus(row.original.lead_status);
        }, [row.original.lead_status ]);

        const handleStatusChange = async (newStatus: string) => {
          setStatus(newStatus);
          try {
            await updateLeadState({ status: newStatus });
            mutate()
            console.log("Lead status updated successfully");
          } catch (error) {
            console.error("Error updating lead status:", error);
            setStatus(row.original.lead_status);
          }
        };
        const defaultValue =
          selectedState === status ? status : row.original.lead_status;

        return (
          <Select
            key={row.id}
            defaultValue={defaultValue}
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            options={states}
            selectClassName="!bg-white border-none focus:border-none focus:outline-none focus:ring-0 !mt-[6px] "
          />
        );
      },
    },
    {
      id: "preferred_language",
      Header: "Preferred Language",
      accessor: "preferred_language",
    },
    { id: "agent", Header: "Agent", accessor: "agent" },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <LeadActionDot
          id={row.original.id}
          onEdit={() => handleEdit(row.original.id)}
        />
      ),
    },
  ];
  const mapApiColumnsToFixed = (
    apiColumns: string[],
    fixedColumns: Column<TableProps>[]
  ) => {
    return fixedColumns.filter((column: any) =>
      apiColumns.includes(column.accessor)
    );
  };

  const { data: columnResponseData, isLoading: isLoadingColumns } = useSWRHook(
    API_SERVICES_URLS.GET_TABLE_UI(userId, "Leads/Deals1")
  );

  const tableId = columnResponseData?.data?.data[0]?._id;

  const { customTrigger: updateTableColumns } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_TABLE_UI(tableId),
    "PUT"
  );

  const { customTrigger: addTableColumns } = useSWRMutationHook(
    API_SERVICES_URLS.ADD_TABLE_UI,
    "POST"
  );

  useEffect(() => {
    if (columnResponseData) {
      console.log("Column Response Data:", columnResponseData.data?.data[0]);
      const columnsData = columnResponseData.data?.data[0];
      if (columnsData) {
        const { columns: apiColumns } = columnsData;
        setSelectedColumns(apiColumns);
        const mappedColumns = mapApiColumnsToFixed(apiColumns, fixedColumns);
        setColumns(mappedColumns);
      } else {
        if (columnResponseData.data?.data.length === 0) {
          const addTableColumnsBody = {
            columns: [
              "fullName",
              "creation_date",
              "source",
              "mobile_number",
              "country",
              "nationality",
              "email_address",
              "budget",
              "call_status",
              "lead_status",
              "preferred_language",
              "enquiryType",
              "agent",
              "action",
            ],
            user: userId,
            pageName: "Leads/Deals1",
            pageId: 1,
          };
          addTableColumns(addTableColumnsBody)
            .then((response) => {
              console.log("Columns added successfully", response);
              const updatedColumns = response.data?.data?.columns || [];
              const mappedColumns = mapApiColumnsToFixed(
                updatedColumns,
                fixedColumns
              );
              setColumns(mappedColumns);
            })
            .catch((error) => {
              console.error("Error adding columns", error);
            });
        }
      }
    }
  }, [columnResponseData]);

  useEffect(() => {
    if (leadResponseData) {
      console.log("Lead Response Data:", leadResponseData);
      if (leadResponseData.isSuccessed) {
        const { data, paginationResult, totalCount } = leadResponseData.data;
        const mappedData = data.map((lead: any) => ({
          id: lead._id,
          fullName: lead.fullName,
          creation_date: new Date(lead.createdAt).toLocaleDateString(),
          source: lead.source,
          mobile_number: lead.mobile,
          country: lead.country.name,
          nationality: lead.nationality.name,
          email_address: lead.email,
          budget: lead.budget,
          call_status: lead.callStatus,
          lead_status: lead.status,
          enquiryType: lead.enquiryType,
          preferred_language: lead.spokenLanguage?.name,
          agent: lead.agent.fullName,
          action: "action",
        }));
        setTableData(mappedData);
        setTotalPages(paginationResult.numberOfPages);
        setTotalEntries(totalCount);
      }
    }
  }, [leadResponseData]);


  

  const handleEdit = (id: string) => {
    router.push(`edit_leads/${id}`);
  };
  const handleCheckboxChange = async (columnId: string) => {
    let updatedSelectedColumns: string[];

    if (selectedColumns.includes(columnId)) {
      updatedSelectedColumns = selectedColumns.filter((id) => id !== columnId);
    } else {
      updatedSelectedColumns = [...selectedColumns, columnId];
    }
    setSelectedColumns(updatedSelectedColumns);

    try {
      await updateTableColumns({ columns: updatedSelectedColumns });
      const mappedColumns = mapApiColumnsToFixed(
        updatedSelectedColumns,
        fixedColumns
      );
      setColumns(mappedColumns);
    } catch (error) {
      console.error("Error updating columns", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady = columns.length > 0 && tableData.length > 0;

  return (
    <div>
      <div className="">
        <div className="bg-lightSecondary rounded-[15px] mt-2 pt-4">
          {isLoadingLeads || isLoadingColumns ? (
            <div className="flex justify-center items-center py-3">
              <p>Data is Loading...</p>
            </div>
          ) : areColumnsAndDataReady ? (
            <>
              <div>
                {fixedColumns?.slice(1).map((column) => (
                  <div className="form-group sr-only" key={column.id}>
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.accessor)}
                      onChange={() => handleCheckboxChange(column.accessor)}
                      id={`select-row-${column.id}`}
                    />{" "}
                    <label htmlFor={`select-row-${column.id}`}>
                      {typeof column.Header === "string"
                        ? column.Header
                        : column.id}
                    </label>
                  </div>
                ))}
              </div>
              <InvoiceTable
                columns={columns}
                data={tableData}
                showCheckboxes={true}
                allowSorting={true}
                allowHideen={true}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalEntries={totalEntries}
                tableId={columnResponseData.data?.data[0]?._id}
                fixedColumns={fixedColumns}
                selectedColumns={selectedColumns}
                setSortColumn={setSortColumn}
              />
            </>
          ) : (
            <div className="flex justify-center items-center py-3">
              <p>No data available to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadTable;
