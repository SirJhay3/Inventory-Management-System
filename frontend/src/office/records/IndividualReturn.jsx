import React, { useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useTable } from "react-table";
import { useQuery } from "react-query";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";

const IndividualReturn = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams();
  const { data: returnData } = useQuery(
    "singleSaleData",
    () => {
      return axios.get(`http://localhost:4000/office/return-records/${id}`);
    },
  );

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: 'Initial Quantity',
        accessor: 'quantity'
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice",
      },
      {
        Header: "Return Quantity",
        accessor: "returnQty",
      },
    ],
    []
  );
  const data = useMemo(
    () => (returnData ? returnData.data.returnArray : []),
    [returnData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div className="m-3 mt-16 sm:w-[calc(400px_+_100px)] sm:mx-auto">
      <div className="mb-5 text-2xl font-bold text-center">
        {returnData?.data.customerName}
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
      <div className="grid justify-center bg-white shadow mt-2 p-2">
        <div>Total Return Amount: {returnData?.data.returnAmount}</div>
      </div>
    </div>
  );
};

export default IndividualReturn;
