"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSelectedState } from "../page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { toast } from "sonner";

function useOutsideAlerter(ref: any, setDropdownOpen: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setDropdownOpen]);
}

export const ActionDropdown = ({ onEdit, id , mutate}: { onEdit: any; id: any , mutate:()=>void}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, setDropdownOpen);

  const { selectedState } = useSelectedState();
  
  const { customTrigger: deleteUser } = useSWRMutationHook(
    API_SERVICES_URLS.DELATE_USER(id),
    "DELETE"
  );

  const { customTrigger: verifyStatus } = useSWRMutationHook(
    API_SERVICES_URLS.CHANGE_STATUS(id),
    "PUT"
  );
  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await verifyStatus({ userStatus: newStatus });
       mutate()
      if (response.isSuccessed) {
        toast.success("Status changed successfully!");
      } else {
        toast.error("Failed to change status.");
      }
    } catch (error) {
      toast.error("An error occurred while changing status.");
      console.error("Error:", error);
    } finally {
      setDropdownOpen(false);
    }
  };
  
  const handleUserDelete = async () => {
    try {
      const res = await deleteUser({ isDeleted: true });
      mutate()
      if (res.isSuccessed) {
        toast.success("User Deleted successfully!");
      } else {
        toast.error("Failed to Delete User.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting user.");
      console.error("Error:", error);
    } finally {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="relative inline-flex justify-center w-full  py-2 bg-white font-nunito font-medium text-gray-700  focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ...
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute font-nunito -ml-12 w-[120px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          style={{ position: "fixed", zIndex: "1000" }}
        >
          <div className="py-1" role="none">
            <button
              onClick={onEdit}
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Edit
            </button>
            {selectedState === "Pending" && (
              <>
                <button
                  onClick={() => handleStatusChange("Accepted")}
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                >
                  Active
                </button>
                <button
                  onClick={() => handleStatusChange("Blocked")}
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                >
                  Dis-Active
                </button>
              </>
            )}

            {selectedState === "Accepted" && (
              <button
                onClick={() => handleStatusChange("Blocked")}
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Dis-Active
              </button>
            )}

            {selectedState === "Blocked" && (
              <button
                onClick={() => handleStatusChange("Accepted")}
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                Active
              </button>
            )}

            <button
              onClick={() => handleUserDelete()}
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
