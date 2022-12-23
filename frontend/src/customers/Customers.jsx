import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import NewCustomer from "./NewCustomer";
import { useStateContext } from "../contexts/ContextProvider";

const getAllCustomers = async ({ queryKey }) => {
  const invoices = await axios.get(
    `http://localhost:4000/customers/?page=${queryKey[1]}&limit=5`
  );
  return invoices;
};

const Customers = () => {
  const [page, setPage] = useState(1);
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const { data, status, isPreviousData } = useQuery(
    ["allCustomers", page],
    getAllCustomers,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="m-3 mt-16 md:w-760 md:mx-auto">
      <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Customers
          </p>
          <div>
            <button
              className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 hover:bg-indigo-600 focus:outline-none rounded"
              style={{ backgroundColor: currentColor }}
            >
              <Link
                to="/customers/new"
                className="text-sm font-medium leading-none text-white"
              >
                New Customer
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white  shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-bold  text-left pl-4">Name</th>
              <th className="font-bold text-left pl-4">Address</th>
              <th className="font-bold text-left pl-4">Telephone No.</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.data.results.map((data) => {
              return (
                <tr
                  key={data._id}
                  onClick={() => {
                    navigate(`/customers/${data.name}`);
                  }}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <p className="font-medium">{data.name}</p>
                  </td>

                  <td className="pl-4 cursor-pointer">
                    <p className="font-medium">{data.address}</p>
                  </td>

                  <td className="pl-4 cursor-pointer">
                    <p className="font-medium">{data.phoneNo}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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

      <Routes>
        <Route path="new" element={<NewCustomer />} />
      </Routes>
    </div>
  );
};

export default Customers;
