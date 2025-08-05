"use client"
import React, { useState } from "react";
import { AccessControl, WaterMark } from "./components/page";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "../../utils/page";

export const SettingTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className={
            "flex items-center flex-wrap whitespace-nowrap mx-2 lg:mx-44 gap-4 font-nunito text-[15px] font-[500] mt-10"
          }
        >
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-3"
              )
            }
          >
            access control
          </Tab>

          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-8"
              )
            }
          >
            Water Mark
          </Tab>
        </TabList>
        <TabPanels
          className={
            "bg-lightSecondary rounded-[15px] max-w-[750px] px-5 py-5 mt-6"
          }
        >
          <TabPanel>
            <AccessControl />
          </TabPanel>

          <TabPanel>
            <WaterMark />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default SettingTab;
