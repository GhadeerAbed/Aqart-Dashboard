"use client"

import { Select, Input, Button, useAuth } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect, useMemo, useState } from "react";
import { Logs } from "../page";
import { InvoiceTable } from "@/features/Membership/components/page";
import { useForm } from "react-hook-form";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { toast } from "sonner";

// Define the columns
export const logsColumns: Column<TableProps>[] = [
  { id: "date", Header: "Date", accessor: "date" },
  { id: "subject", Header: "Subject", accessor: "subject" },
  { id: "priority", Header: "Priority", accessor: "priority" },
  { id: "description", Header: "Description", accessor: "description" },
  { id: "addedBy", Header: "Added By", accessor: "addedBy" },
];

export const Notes = ({
  pageTitle,
  Reminder = false,
  buttonName,
  rowId,
}: {
  pageTitle: string;
  Reminder: boolean;
  buttonName?: string;
  rowId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting },
  } = useForm();

  const Priority = [
    { value: "low Priority", name: "Low Priority" },
    { value: "Medium Priority", name: "Medium Priority" },
    { value: "high Priority", name: "High Priority" },
  ];
  const [tableData, setTableData] = useState<TableProps[]>([]);

  const notesAPI = Reminder 
    ? API_SERVICES_URLS.GET_LEAD_REMINDER(rowId) 
    : API_SERVICES_URLS.GET_LEAD_Note(rowId);
  const addNoteAPI = Reminder 
    ? API_SERVICES_URLS.ADD_LEAD_REMINDER
    : API_SERVICES_URLS.ADD_LEAD_Note;

  const { data: notes , mutate} = useSWRHook(notesAPI);
  const { customTrigger } = useSWRMutationHook(addNoteAPI, "POST");
  const { userData } = useAuth();
  useEffect(() => {
    if (notes) {
      console.log("Notes fetched:", notes); // Add this log
      const data = notes?.data?.data || [];
      const notesData = data?.map((note: any) => ({
        date: new Date(note.createdAt).toLocaleDateString(),
        subject: note.Subject,
        priority: note.Priority,
        description: note.description,
        addedBy: note.addedBy?.fullName ,
      }));

      console.log("Formatted notes data:", notesData); // Add this log
      setTableData(notesData);
    }
  }, [notes]);

  const onSubmit = async (data: any) => {
    try {
      const formData = {
        ...data,
        leadId: rowId,
        addedBy: userData._id,
      };

      const response = await customTrigger(formData);
      console.log("Response:", response);
      mutate();
      if (response.isSuccessed) {
        toast.success("Lead Updated Successfully");
      } else {
        toast.error("Failed to Update Lead");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full py-4">
      <InvoiceTable
        columns={logsColumns}
        data={tableData}
        showCheckboxes={false}
        allowSorting={false}
        allowHideen={false}
        totalEntries={tableData.length}
      />
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="py-3 font-nunito font-[550]">{pageTitle}</h1>
        <div className="grid grid-cols-3 gap-x-4">
          <Input
            type="text"
            label="Subject"
            id="Subject"
            inputClassName="!px-4 !bg-backgroundColor"
            {...register("Subject")}
          />

          <Select
            label="Priority"
            id="Priority"
            options={Priority}
            placeholder="Select priority"
            selectClassName="pl-4 !bg-backgroundColor !py-2"
            {...register("Priority")}
          />
          {Reminder && (
            <Input
              label=""
              id="Date"
              type="date"
              inputClassName="pl-4 !bg-backgroundColor mt-[28px]"
              {...register("Date")}
            />
          )}
        </div>
        <div className=" w-full pb-4">
          <p className="text-sm font-[500] text-darkSecondary py-3">Description</p>
          <textarea
            id="description"
            rows={5}
            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor"
            placeholder={"Write your thoughts here..."}
            {...register("description")}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-5">
          <Button
            className="bg-primary text-white uppercase px-8"
            type="submit"
            buttonSize="small"
            buttonLoadingProps={{ loadingText: "Saving..." }}
            loading={isSubmitting}
          >
            Save
          </Button>
          <Button
            className="bg-lightSecondary text-primary border-primary uppercase px-8 hover:bg-primary hover:text-white"
            type="button"
            buttonSize="small"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Notes;
