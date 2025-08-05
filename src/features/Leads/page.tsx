"use client"

import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "../../utils/page";
import { PersonalDetails, LeadUpdates, Logs, Notes } from "./components/page";

export const LeadEditTab = ({ rowId }: { rowId: string }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="w-full mt-5">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className={
            "flex items-center mx-4 lg:mx-20 gap-6 font-nunito text-[15px] font-[500] flex-wrap"
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
            Personal Details
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-9"
              )
            }
          >
            Lead Updates
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-9"
              )
            }
          >
            Notes
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-9"
              )
            }
          >
            Reminder
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                selected ? "!bg-primary text-white border-none " : "",
                " rounded-full py-2 uppercase bg-tabColor border border-tabBorder outline-none px-9"
              )
            }
          >
            Logs
          </Tab>
        </TabList>
        <TabPanels
          className={
            "bg-lightSecondary rounded-[15px] max-w-[1000px] px-5 mt-5"
          }
        >
          <TabPanel>
            <PersonalDetails rowId={rowId} />
          </TabPanel>
          <TabPanel>
            <LeadUpdates  rowId={rowId}/>
          </TabPanel>
          <TabPanel>
            <Notes pageTitle="Add A Note" Reminder={false} buttonName="Note" rowId={rowId} />
          </TabPanel>
          <TabPanel>
            <Notes
              pageTitle="Add A Reminder"
              Reminder={true}
              buttonName="Reminder"
              rowId={rowId}
            />
          </TabPanel>
          <TabPanel>
            <Logs  rowId={rowId}/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default LeadEditTab;
