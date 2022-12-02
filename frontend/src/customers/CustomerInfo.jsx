import React, { useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useStateContext } from "../contexts/ContextProvider";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./columns";
// import { CustomerInfoTable } from "./CustomerInfoTable";

const CustomerInfo = () => {
  const { id } = useParams();

  const { currentColor } = useStateContext();

  const { data: tableData } = useQuery("customerSalesDetails", () => {
    console.log(tableData);
    return axios.get(`http://localhost:4000/customers/${id}`);
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => (tableData ? tableData.data : []), [tableData]);

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
  return (
    <>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          {tableData?.data.length > 0 ? tableData.data[0].customerName : ""}
        </p>
      </div>

      <div className="mt-12 md:mx-auto md:w-780 drop-shadow-xl ">
        {/* customer info table */}
        {/* <CustomerInfoTable /> */}

        <>
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
      </div>
    </>
  );
};

export default CustomerInfo;
