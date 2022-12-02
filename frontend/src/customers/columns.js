import { BsBatteryHalf } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { format, parseISO } from "date-fns";

export const COLUMNS = [
  {
    Header: "Date",
    accessor: "createdAt",
    Cell: (props) => {
      return (
        <p>{format(parseISO(props.row.original.createdAt), "dd/MM/yyyy")}</p>
      );
    },
  },
  {
    Header: "Invoice No",
    accessor: "invoiceNo",
  },
  {
    Header: "Total Amount",
    accessor: "totalAmount",
  },
  {
    Header: "Balance",
    accessor: "balance",
  },
  {
    Header: "status",
    accessor: "debtStatus",

    Cell: (props) => {
      if (props.row.original.debtStatus === "completed") {
        return (
          <p className="flex justify-center">
            <TiTick />
          </p>
        );
      } else {
        return (
          <p className="flex justify-center">
            <BsBatteryHalf />
          </p>
        );
      }
    },
  },
];
