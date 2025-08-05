"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { aqarat, notification, team } from "../../../public/assests/page";
import { useAuth } from "../../components/page";
import CompanyDropdown from "../components/CompanyDropdown/page";
import {  SidebarIcon } from "@/lib/@heroicons/page";


export const NavBar = () => {
  const { userData } = useAuth();
  const [profileImageUrl, setProfileImageUrl] = useState(team);

  useEffect(() => {
    if (userData?.profileImage) {
      const profileImage = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${userData.profileImage}`;
      setProfileImageUrl(profileImage);
    }
  }, [userData]);

  return (
    <nav className="bg-white fixed top-0 left-0 z-10 h-[76px] w-full border-b-1 shadow-NavShadow rounded-b-[24px]">
      <div className="flex justify-between items-center content-center pr-16 pl-10 pt-2">
      {/* <button
        className="fixed top-5 left-5 z-50 bg-primary text-white p-2 rounded-lg ss:hidden"
        onClick={openModal}onClick={openModal}
      >
        Menu
      </button> */}
      
        <Image src={aqarat} alt="aqarat_logo" width={199} height={55} />
        <div className="flex gap-5 items-center">
          <Image
            src={notification}
            alt="notification"
            width={42}
            height={42}
            className="border-e-2 pe-3"
          />
          <Image
            src={profileImageUrl}
            alt="team"
            width={50}
            height={50}
            className="rounded-[50%] w-[50px] h-[50px]"
          />
          <div className=" text-fontColor1 font-[500] max-ss:hidden">
            <CompanyDropdown/>
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default NavBar;
