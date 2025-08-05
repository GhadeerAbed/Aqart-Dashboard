import { useSWRMutationHook } from "@/hooks/page";
import { ViewIcon } from "../../../../lib/@heroicons/page";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { API_SERVICES_URLS } from "@/data/page";
import { getAuthData } from "@/utils/page";
import { useState, useEffect, useRef } from "react";
import { Column } from "react-table";
import React from "react";

type ViewColumnsProps = {
  fixedColumns: Column<any>[];
  tableId?: any;
  selectedColumns?: any;
};

export const ViewColumns: React.FC<ViewColumnsProps> = ({
  fixedColumns,
  tableId,
  selectedColumns,
}) => {
  const userId = getAuthData()?._id;

  const { customTrigger: updateTableTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_TABLE_UI(tableId),
    "PUT"
  );

  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialVisibility = fixedColumns?.reduce((acc: any, column: any) => {
      acc[column.id] = !column.isHidden; // Initialize visibility based on `isHidden` property in fixedColumns
      return acc;
    }, {});
    setColumnVisibility(initialVisibility);
  }, [fixedColumns]);

  const handleCheckboxChange = (column: Column<any>) => {
    const columnId = column.id;
    const newVisibility = !columnVisibility[columnId];

    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnId]: newVisibility,
    }));

    const updatedVisibility = {
      ...columnVisibility,
      [columnId]: newVisibility,
    };

    const visibleColumns = fixedColumns
      .filter((col: Column<any>) => updatedVisibility[col.id])
      .map((col: Column<any>) => col.id);

    updateTableTrigger({
      columns: visibleColumns,
      user: userId,
    })
      .then((res) => {
        console.log("Table updated:", res);
      })
      .catch((err) => {
        console.error("Error updating table:", err);
      });
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Close menu if clicked outside
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Menu as="div" className="relative" onClose={() => setMenuOpen(false)}>
      <div className="relative" ref={menuRef}>
        <MenuButton
          as="button"
          className="text-fontColor1 w-[80px] rounded-[5px] bg-white border-2 border-borderColor2 hover:bg-[#f9f9f9] px-2 py-1 max-sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          <span className="flex items-center font-[600] gap-2">
            <ViewIcon width={14} height={14} />
            <span>View</span>
          </span>
        </MenuButton>
        <MenuButton
          as="button"
          className="sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          <ViewIcon width={20} height={20} className="mt-1"/>
        </MenuButton>
        <Transition
          show={menuOpen}
          as={React.Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <MenuItems
            className="bg-white shadow-TableShadow px-5 pt-3 rounded-[5px] absolute top-9 right-4 z-10 whitespace-nowrap"
            static // Prevents MenuItems from being removed when closed
          >
            {fixedColumns
              ?.slice(1, fixedColumns.length - 1)
              .map((column: any) => (
                <MenuItem key={column.id}>
                  <div className="form-group" key={column.id}>
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.accessor)}
                      onChange={() => handleCheckboxChange(column)}
                      onClick={(e) => e.stopPropagation()} // Prevents closing Menu on checkbox click
                      id={`select-row-${column.id}`}
                    />{" "}
                    <label htmlFor={`select-row-${column.id}`}>
                      {typeof column.Header === "string"
                        ? column.Header
                        : column.id}
                    </label>
                  </div>
                </MenuItem>
              ))}
          </MenuItems>
        </Transition>
      </div>
    </Menu>
  );
};

export default ViewColumns;
