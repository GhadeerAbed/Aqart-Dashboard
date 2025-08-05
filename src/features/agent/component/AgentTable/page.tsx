
import { InvoiceTable } from "@/features/Membership/components/page";
import React, { useEffect, useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { TableProps } from "@/types/page";
import { getAuthData } from "@/utils/page";
import { Column } from "react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ActionDropdown from "@/components/ActionDropdown/page";


export const AgentTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
  setSortColumn: any;
  mutate : () => void
}> = ({
  leadResponseData,
  isLoadingLeads,
  setCurrentPage,
  currentPage,
  setSortColumn,
  mutate
}) => {
  const fixedColumns: Column<TableProps>[] = [
    {
      id: "agent",
      Header: "Agent",
      accessor: "agent",
      Cell: ({ value }: { value: any }) => (
        <div className="flex items-center">
          {value.profileImage && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${value.profileImage}`}
              alt={value.fullName}
              className="w-[50px] h-[50px] rounded mr-3"
              width={50}
              height={50}
            />
          )}
          <span>{value.fullName}</span>
        </div>
      ),
    },
    { id: "creation_date", Header: "Creation Date", accessor: "creation_date" },
    { id: "email_address", Header: "Email Address", accessor: "email_address" },
    { id: "role", Header: "Role", accessor: "role" },
    { id: "nationality", Header: "Nationality", accessor: "nationality" },
    { id: "city", Header: "City", accessor: "city" },
    { id: "manger", Header: "Manger", accessor: "manger" },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <ActionDropdown
          onEdit={() => handleEdit(row.original.id)}
          id={row.original.id}
          mutate = {mutate}
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

  const userId = getAuthData()?._id;
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [columns, setColumns] = useState<Column<TableProps>[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const router = useRouter();

  const { data: columnResponseData, isLoading: isLoadingColumns } = useSWRHook(
    API_SERVICES_URLS.GET_TABLE_UI(userId, "Agents")
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
        console.error("Column data is undefined");
        if (columnResponseData.data?.data.length === 0) {
          const addTableColumnsBody = {
            columns: [
              "agent",
              "creation_date",
              "email_address",
              "role",
              "nationality",
              "city",
              "manger",
              "action",
            ],
            user: userId,
            pageName: "Agents",
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
          agent: {
            profileImage: lead.profileImage,
            fullName: lead.fullName,
          },
          creation_date: new Date(lead.createdAt).toLocaleDateString(),
          email_address: lead.email,
          nationality: lead.nationality?.name,
          role: lead.role,
          manger: lead.Manager?.fullName,
          city: lead.city?.name,
          action: "action",
        }));
        setTableData(mappedData);
        setTotalPages(paginationResult.numberOfPages);
        setTotalEntries(totalCount);
      }
    }
  }, [leadResponseData]);

  const handleEdit = (id: string) => {
    router.push(`edit_agent_profile/${id}`);
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

export default AgentTable;
