
import { Column } from "react-table";
import { TableProps } from "../../../types/page";

export const Leads_columns: Column<TableProps>[] = [
  { id: "fullName", Header: "Full Name", accessor: "fullName" },
  { id: "creation_date", Header: "Creation Date", accessor: "creation_date" },
  { id: "source", Header: "Source", accessor: "source" },
  { id: "mobile_number", Header: "Mobile Number", accessor: "mobile_number" },
  { id: "email_address", Header: "Email Address", accessor: "email_address" },
  { id: "country", Header: "Country", accessor: "country" },
  { id: "nationality", Header: "Nationality", accessor: "nationality" },
  { id: "budget", Header: "Budget", accessor: "budget" },
  { id: "call_status", Header: "Call Status", accessor: "call_status" },
  { id: "lead_status", Header: "Lead Status", accessor: "lead_status" },
];



export const states = [
  { value: "New", name: "NEW" },
  { value: "Hot", name: "HOT" },
  { value: "Cold", name: "COLD" },
  { value: "Closed", name: "CLOSED" },
  { value: "Archived", name: "ARCHIVED" },
];

export const callStatus = [
  { value: "Waiting", name: "Waiting" },
  { value: "Not Answering", name: "Not Answering" },
  { value: "Answering", name: "Answering" },
  { value: "Blocked", name: "Blocked" },
];

export const communicationMethod = [
  { value: "Email", name: "Email" },
  { value: "WhatsApp", name: "WhatsApp" },
  { value: "Mobile", name: "Mobile" },
];

export const enquiryType= [
  { value: "Rent", name: "Rent" },
  { value: "Sale", name: "Sale" },
];




export const logsColumns: Column<TableProps>[] = [
  { id: "date", Header: "Date", accessor: "date" },
  { id: "subject", Header: "Subject", accessor: "subject" },
  { id: "priority", Header: "Priority", accessor: "priority" },
  { id: "description", Header: "Description", accessor: "description" },
  { id: "addedBy", Header: "Added By", accessor: "addedBy" },
];

