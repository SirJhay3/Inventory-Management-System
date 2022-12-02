import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useQuery } from "react-query";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const IndividualSalesLog = () => {
  const { currentColor, salesId } = useStateContext();
  const { data: singleCustomerData } = useQuery(
    "singleSaleData",
    () => {
      return axios.get(`http://localhost:4000/sales/logs/${salesId}`);
    },
    {
      enabled: salesId.length === 24,
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );
  const data = useMemo(
    () => (singleCustomerData ? singleCustomerData.data.salesItems : []),
    [singleCustomerData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="m-3 mt-12 sm:w-[calc(400px_+_100px)] sm:mx-auto">
      <div className="mb-5 text-2xl font-bold text-center">
        {singleCustomerData?.data.customerName}
      </div>

      {/* react table */}
      <div className="h-72 overflow-scroll">
        <table
          {...getTableProps()}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      backgroundColor: currentColor,
                      color: "white",
                    }}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="hover:bg-neutral-300 even:bg-zinc-100"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{
                          textAlign: "center",
                          border: "1px solid #ddd",
                          padding: "8px",
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white shadow mt-2 p-2">
        <div>Total Sales Amount: {singleCustomerData?.data.totalAmount}</div>
        <div>Transfer: {singleCustomerData?.data.transfer}</div>
        <div>Balance: {singleCustomerData?.data.balance}</div>
        <div>Cash Paid: {singleCustomerData?.data.cashPaid}</div>
      </div>
    </div>
  );
};

export default IndividualSalesLog;
