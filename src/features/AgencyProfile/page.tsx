"use client"
import React, { useState } from "react";
import { AgencyDetails, AgencySecurity } from "./components/page";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "../../utils/page";

const AgencyProfile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="w-full">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className={
            "flex items-center mx-5 lg:mx-32 gap-8 font-nunito text-[15px] font-[500]"
          }
        >
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-4"
              )
            }
          >
            Profile Details
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-9"
              )
            }
          >
            Security
          </Tab>
        </TabList>
        <TabPanels
          className={"bg-lightSecondary rounded-[15px] max-w-[648px] px-5 mt-5"}
        >
          <TabPanel>
            <AgencyDetails />
          </TabPanel>
          <TabPanel>
            <AgencySecurity />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default AgencyProfile;
