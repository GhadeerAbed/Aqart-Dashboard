"use client"

import { useAuth } from '@/components/page';
import { URL_PATHS } from '@/data/page';
import React, { useState, useRef, useEffect } from 'react';

function useOutsideAlerter(ref:any, setDropdownOpen:any) {
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setDropdownOpen]);
}
export const CompanyDropdown= () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {  logout , userData} = useAuth();
  useOutsideAlerter(dropdownRef, setDropdownOpen);
  const companyName = userData.fullName

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full  py-2 bg-white font-nunito font-medium text-gray-700  focus:outline-none capitalize"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {companyName}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute font-nunito right-0 mt-2 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href={URL_PATHS.AGENCY_PROFILE.DETAILS}
              className="text-gray-700 block pl-6 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Profile Details
            </a>
            <a
              href={URL_PATHS.AGENCY_PROFILE.SETTING}
              className="text-gray-700 block pl-6 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a>
            <a
              onClick={logout}
              className="text-gray-700 block pl-6 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;
