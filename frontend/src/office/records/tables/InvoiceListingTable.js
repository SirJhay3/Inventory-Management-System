import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useStateContext } from "../../../contexts/ContextProvider";

const InvoiceListingTable = ({listingData}) => {
    const { currentColor } = useStateContext();
  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "product.productName",
      },
      {
        Header: "Category",
        accessor: "product.category",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Unit Price",
        accessor: "product.unitPrice",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
    ],
    []
  );
  const data = useMemo(() =>listingData ? listingData.data : [] , [listingData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    
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
  );
};

export default InvoiceListingTable;
