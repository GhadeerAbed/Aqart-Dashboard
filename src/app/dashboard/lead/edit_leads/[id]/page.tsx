import LeadEditTab from "@/features/Leads/page";
import React from "react";

const EditLeadPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <LeadEditTab rowId={id} />
    </div>
  );
};

export default EditLeadPage;
