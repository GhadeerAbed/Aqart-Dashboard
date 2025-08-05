
import { Column } from "react-table";
import { TableProps } from "../../../types/page";



export const Activity_columns: Column<TableProps>[] = [
  { id: "data", Header: "Date", accessor: "date"},
  { id: "activity", Header: "Activity", accessor: "activity" },
  { id: "activity_type", Header: "Activity Type", accessor: "activity_type" ,className :"activity_class",
    Cell: ({ value }) => {
      switch (value) {
        case "AccessControl":
          return "Access Control ";
        case "ChangePassword":
          return "Change Password";
        default:
          return value;
      }
    }
  },
];
