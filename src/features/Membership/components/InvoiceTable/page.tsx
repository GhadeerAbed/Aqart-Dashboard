import React from "react";
import { useTable, useRowSelect, Column, Row, TableOptions } from "react-table";
import { Checkbox, Pagination, Select } from "../../../../components/page";
import { Sorting } from "../../../../components/Svg/page";
import { TableProps } from "../../../../types/page";
import { ViewColumns } from "../../components/page";

import * as XLSX from "xlsx"; // Import the xlsx library
import { DownloadIcon } from "@/lib/@heroicons/page";

export const InvoiceTable: React.FC<{
  columns: Column<TableProps>[];
  data: TableProps[];
  showCheckboxes?: boolean;
  allowSorting?: boolean;
  allowHideen?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalEntries?: number;
  tableId?: string;
  fixedColumns?: any;
  selectedColumns?: any;
  setSortColumn?: any;
  className?: string;
}> = ({
  columns,
  data,
  showCheckboxes = true,
  allowSorting = true,
  allowHideen = true,
  currentPage = 1,
  totalPages = 0,
  onPageChange,
  totalEntries = 0,
  tableId,
  fixedColumns,
  selectedColumns,
  setSortColumn,
  className,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    selectedFlatRows, // Get selected rows
  } = useTable(
    {
      columns,
      data,
    } as TableOptions<TableProps>,
    useRowSelect,
    (hooks) => {
      if (showCheckboxes) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: { row: Row<TableProps> }) => (
              <div>
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  // Function to handle sheet download
  const handleDownloadSheet = () => {
    const selectedData = selectedFlatRows.map((row) => row.original);

    if (selectedData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data");
      XLSX.writeFile(workbook, "selected_data.xlsx");
    } else {
      alert("No rows selected!");
    }
  };

  return (
    <div className={`flex flex-col px-5 py-3 ${className}`}>
      {allowHideen && (
        <div className="flex justify-between items-center py-2">
          <div className="darkSecondary">Select</div>
          <div className="flex justify-center items-center">
            <p
              className="text-primary underline uppercase px-3 text-sm cursor-pointer max-sm:hidden"
              onClick={handleDownloadSheet} // Add the click handler here
            >
              download sheet
            </p>
            <DownloadIcon
              onClick={handleDownloadSheet}
              className="sm:hidden mx-5 "
              width={21}
              height={21}
            />
            <ViewColumns
              tableId={tableId}
              fixedColumns={fixedColumns}
              selectedColumns={selectedColumns}
            />
          </div>
        </div>
      )}
      {totalEntries === 0 ? (
        <div className="text-center bg-white text-darkSecondary font-[500] text-[15px] py-5">
          No data found
        </div>
      ) : (
        <>
          <div className="border rounded-md z-0 bg-white ">
            <div className="overflow-x-auto py-2">
              <table {...getTableProps()} className="w-full">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((column, i) => (
                        <th
                          {...column.getHeaderProps()}
                          key={column.id}
                          className={`text-darkSecondary font-[500] text-[15px] whitespace-nowrap ${
                            i < 2
                              ? `sticky left-0 bg-white z-1 sticky-column-${i} whitespace-nowrap`
                              : ""
                          }`}
                        >
                          <span className="flex flex-row items-center justify-center">
                            {column.render("Header")}
                            {allowSorting && i !== 0 && (
                              <Sorting
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => setSortColumn(column.id)}
                              />
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell, i) => (
                          <td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            className={`${
                              i < 2
                                ? `sticky left-0 bg-white z-1 sticky-column-${i} whitespace-nowrap`
                                : ""
                            } text-fontColor1 text-[15px] font-[500] `}
                          >
                            <span
                              className={`flex justify-center whitespace-nowrap${
                                cell.column.className || ""
                              }`}
                            >
                              {cell.render("Cell")}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className=" flex justify-between items-center px-10 pt-3 ">
                  <div></div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                  />
                  <span>Total Entries: {totalEntries}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceTable;
