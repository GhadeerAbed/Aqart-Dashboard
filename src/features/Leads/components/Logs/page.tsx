import React, { useEffect, useState } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";

export const Logs = ({ rowId }:{rowId:string}) => {
  const { data: notes, isLoading } = useSWRHook(API_SERVICES_URLS.GET_ALL_LEAD_LOGS(rowId));
  const [formattedLogs, setFormattedLogs] = useState("");

  useEffect(() => {
    if (notes) {
      const logsData = notes.data.data.map((note:any) => {
        const date = new Date(note.createdAt);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).format(date);
        const subject = note.Subject;
        return `On ${formattedDate} ${subject}`;
      }).join("\n");
      setFormattedLogs(logsData);
    }
  }, [notes]);

  return (
    <div className="w-full pb-4 font-nunito">
      <p className="text-sm font-[500] text-darkSecondary py-3">Logs</p>
      {isLoading ? (
        <div className="bg-backgroundColor p-5">
        <p className=" text-gray-600 text-center font-[500]">Logs is loading...</p>
        </div>
      ) : (
        <textarea
          id="description"
          rows={5}
          className="block p-2.5 w-full text-[15px] text-gray-900 rounded-lg border border-borderColor focus:ring-black focus:border-black bg-backgroundColor h-[400px]"
          value={formattedLogs}
          readOnly
        />
      )}
    </div>
  );
};

export default Logs;
