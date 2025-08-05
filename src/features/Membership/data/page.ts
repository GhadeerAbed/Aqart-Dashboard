
import { Column } from "react-table";
import { TableProps } from "../../../types/page";

export const MembershipColumns: Column<TableProps>[] = [
  { id: "description", Header: "Description", accessor: "description" },
  { id: "InvoiceNumber", Header: "Invoice Number", accessor: "invoiceNumber" },
  { id: "date", Header: "Issue Date", accessor: "date" },
  { id: "invoiceType", Header: "Invoice Type", accessor: "invoiceType" },
  { id: "billingType", Header: "Billing Type", accessor: "billingType" },
  { id: "amount", Header: "Amount", accessor: "amount" },
  { id: "status", Header: "Status", accessor: "status" },
  { id: "action", Header: "Action", accessor: "action" },
];


