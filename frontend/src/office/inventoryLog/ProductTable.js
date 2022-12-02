import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
} from "react-table";
import { format, parseISO } from "date-fns";
import { useStateContext } from "../../contexts/ContextProvider";




export const ProductTable = ({tableData}) => {
  // needs both data and columns to be memoized
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: (props) => {
          return (
            <p>
              {format(parseISO(props.row.original.createdAt), "dd/MM/yyyy")}
            </p>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: (props) => {
          if (props.row.original.description === "Sales") {
            return (
              <p className="flex justify-center text-red-500">
                {props.row.original.quantity}
              </p>
            );
          } else {
            return (
              <p className="flex justify-center">
                {props.row.original.quantity}
              </p>
            );
          }
        },
      },
      {
        Header: "Quantity In-Stock",
        accessor: "balanceQty",
      },
    ],
    []
  );
  const data = useMemo(() => tableData ? tableData : [], [tableData]);

  // create a table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,

    // to use pagination, rows is replaced with page
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,

    prepareRow,
    state,
    // setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    // useGlobalFilter,
    // useSortBy,
    usePagination
  );

  // Global filtering
  const { pageIndex, pageSize } = state;
  const { currentColor } = useStateContext();

  return (
    <>
      {/* <div className="flex justify-center md:justify-end mb-4 p-2">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div> */}

      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // implementing the sorting feature
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: currentColor,
                    color: "white",
                  }}
                >
                  {column.render("Header")}

                  {/* <div>{ column.canFilter ? column.render('Filter') : null }</div> */}

                  {/* <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="hover:bg-neutral-300 even:bg-slate-100"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        textAlign: "center",
                        border: "1px solid #ddd",
                        padding: "8px",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        {/* <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>

      {/* Paginations */}
      <div className="flex justify-center gap-1 mt-4">
        <span className="p-1">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <span className="p-1">|</span>

        <span className="p-1">
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>

        <select
          className="p-1 mr-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        <button
          className="bg-white rounded-md px-1"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>

        <button
          className="p-1 w-20 bg-white rounded-md disabled:opacity-60"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="p-1 w-20  bg-white rounded-md disabled:opacity-60"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>

        <button
          className="bg-white rounded-md px-1"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};
