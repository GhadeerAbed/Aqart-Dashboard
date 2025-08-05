import { InvoiceTable } from "@/features/Membership/components/page";
import React, { useEffect, useMemo, useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { TableProps } from "@/types/page";
import { getAuthData } from "@/utils/page";
import { Column } from "react-table";

export const DashTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
  setSortColumn: any;
  selectedState?: any;
  mutate: () => void;
}> = ({
  leadResponseData,
  isLoadingLeads,
  setCurrentPage,
  currentPage,
  setSortColumn,
}) => {
  const userId = getAuthData()?._id;
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [columns, setColumns] = useState<Column<TableProps>[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);


  const fixedColumns : Column<TableProps>[] = useMemo(() => [
    { id: "Property", Header: "Property", accessor: "Property" },
    { id: "Category", Header: "Category", accessor: "Category" },
    { id: "Agents", Header: "Agents", accessor: "Agents" },
    { id: "Views", Header: "Views", accessor: "Views" },
    { id: "Clicks", Header: "Clicks", accessor: "Clicks" },
    { id: "Leads", Header: "Leads", accessor: "Leads" },
    { id: "Reference", Header: "Reference", accessor: "Reference" },
], []);

  const mapApiColumnsToFixed = (
    apiColumns: string[],
    fixedColumns: Column<TableProps>[]
  ) => {
    return fixedColumns.filter((column: any) =>
      apiColumns.includes(column.accessor)
    );
  };

  const { data: columnResponseData, isLoading: isLoadingColumns } = useSWRHook(
    API_SERVICES_URLS.GET_TABLE_UI(userId, "dashboard")
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
              "Property",
              "Category",
              "Agents",
              "Views",
              "Clicks",
              "Leads",
              "Reference",
            ],
            user: userId,
            pageName: "dashboard",
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
          Property: lead.property,
          Category:"test",
          Agents:"agents",
          Clicks:lead.clicks,
          Reference:"reference",
          Leads:"leads",
          Views:lead.views
        }));
        setTableData(mappedData);
        setTotalPages(paginationResult.numberOfPages);
        setTotalEntries(totalCount);
      }
    }
  }, [leadResponseData]);

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

export default DashTable;
