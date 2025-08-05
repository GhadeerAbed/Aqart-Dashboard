
import React, { useEffect, useState } from "react";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { TableProps } from "@/types/page";
import { getAuthData } from "@/utils/page";
import { Column } from "react-table";
import InvoiceTable from "../InvoiceTable/page";
import { BigModal, Button } from "@/components/page";
import BankTransferForm from "../BankTransferForm/page";

export const MembershipTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
  setSortColumn: any;

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


  const fixedColumns: Column<TableProps>[] = [
    { id: "description", Header: "Description", accessor: "description" },
    { id: "creation_date", Header: "Issue Date", accessor: "creation_date" },
    {
      id: "invoiceNumber",
      Header: "Invoice Number",
      accessor: "invoiceNumber",
    },
    { id: "invoiceType", Header: "Invoice Type", accessor: "invoiceType" },
    { id: "billingType", Header: "Billing Type", accessor: "billingType" },
    {
      id: "status",
      Header: "Status",
      accessor: "status",
      Cell: ({ row }: { row: any }) => {
        const { isPaid } = row.original;
        const statusText = isPaid ? "Paid" : "Unpaid";
        const textColor = isPaid ? "text-primary" : "text-red-500"; // Use Tailwind CSS for text color

        return <span className={textColor}>{statusText}</span>;
      },
    },
    { id: "budget", Header: "Amount", accessor: "budget" },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }: { row: any }) => {
        const { isPaid } = row.original;
        const { id } = row.original;
        const [isModalOpen, setIsModalOpen] = useState(false);
        const openModal = () => setIsModalOpen(true);
        const closeModal = () => setIsModalOpen(false);
        return !isPaid ? (
          <Button className="bg-primary text-white !px-8" buttonSize="small">
            Download
          </Button>
        ) : (
          <>
            <Button
              className="bg-white text-primary border border-primary !px-8"
              buttonSize="small"
              onClick={openModal}
            >
              PayNow
            </Button>
            <BigModal
              isOpen={isModalOpen}
              closeModal={closeModal}
              ModalclassName="!w-[480px]"
            >
              <BankTransferForm id ={id}/>
            </BigModal>
          </>
        );
      },
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
    API_SERVICES_URLS.GET_TABLE_UI(userId, "invoices")
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
              "description",
              "creation_date",
              "invoiceNumber",
              "invoiceType",
              "billingType",
              "budget",
              "status",
              "action",
            ],
            user: userId,
            pageName: "invoices",
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
          description: lead.notes,
          creation_date: new Date(lead.createdAt).toLocaleDateString(),
          invoiceNumber: lead.invoiceNumber,
          invoiceType: lead.packagesType,
          billingType: lead.packagesPeriod,
          budget: lead.price + " AED",
          isPaid: lead.isPaid,
          status: lead.isPaid ? "Paid" : "Unpaid",
          action: "action",
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
      <div>
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

export default MembershipTable;
