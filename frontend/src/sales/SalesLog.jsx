import axios from "axios";
import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
import IndividualSalesLog from "./IndividualSalesLog";

const getSalesDetails = async ({ queryKey }) => {
  const salesInfo = await axios.get(
    `http://localhost:4000/sales/?page=${queryKey[1]}&limit=6`
  );
  return salesInfo;
};

const SalesLog = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());

  const { data, status, isPreviousData } = useQuery(
    ["salesLogInfo", page],
    getSalesDetails,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="m-4 mt-20 md:mt-12 md:flex  justify-center gap-3">
      {/* log section */}
      <div>
        <div className="w-56 mb-4 mx-auto">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            className="p-1 shadow"
            placeholderText="I have been cleared!"
          />
        </div>

        <div className="m-3 mt-8 md:w-760 md:mx-auto">
          <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Sales Log
            </p>
          </div>

          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-bold  text-left  pl-4">Customer Name</th>
                  <th className="font-bold text-left pl-4">Date</th>
                  <th className="font-bold text-left pl-4">Invoice No</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {data?.data.results.map((data) => {
                  return (
                    <tr
                      key={data._id}
                      onClick={() => {
                        navigate(`/sales/logs/${data._id}`);
                      }}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <p className="font-medium">{data.customerName}</p>
                      </td>
                      <td className="pl-4 cursor-pointer">
                        <p className="font-medium">
                          {format(parseISO(data.createdAt), "dd/MM/yyyy")}
                        </p>
                      </td>

                      <td className="pl-4 cursor-pointer">
                        <p className="font-medium">{data.invoiceNo}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {status === "success" && (
            <div className="mt-4 flex justify-center items-center">
              <button
                className="border-2 p-2.5 rounded-md cursor-pointer mr-2 bg-gray-100
                shadow disabled:cursor-not-allowed disabled:opacity-20"
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>{page}</span>
              <button
                className="border-2 p-2.5 rounded-md cursor-pointer ml-2 bg-gray-100 shadow disabled:cursor-not-allowed disabled:opacity-20"
                onClick={() => setPage((old) => old + 1)}
                // Disable the Next Page button until we know a next page is available
                disabled={isPreviousData || !data.data.next}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <Routes>
        <Route
          path=":id"
          element={<IndividualSalesLog customerData={data} />}
        />
      </Routes>
    </div>
  );
};

export default SalesLog;
