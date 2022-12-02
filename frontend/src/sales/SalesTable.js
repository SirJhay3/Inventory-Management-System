import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useStateContext } from "../contexts/ContextProvider";

const SalesTable = ({ salesData, isHighlighted, setIsHighlighted }) => {
  const { currentColor } = useStateContext();
  const columns = useMemo(
    () => [
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Description/Name",
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
  const data = useMemo(() => salesData, [salesData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
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
                className={`hover:bg-neutral-200 even:bg-zinc-100 ${
                  isHighlighted === row.original
                    ? "bg-slate-500 even:bg-slate-500 pointer-events-none"
                    : ""
                }`}
                {...row.getRowProps()}
                onClick={() => {
                  setIsHighlighted((prev) =>
                    prev !== null ? null : row.original
                  );
                }}
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
    </>
  );
};

export default SalesTable;
