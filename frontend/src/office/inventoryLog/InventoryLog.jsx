import React, { useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const getProducts = async ({ queryKey }) => {
  const products = await axios.get(
    `http://localhost:4000/office/inventory-log/?page=${queryKey[1]}&limit=10`
  );
  return products;
};

const InventoryLog = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, status, isPreviousData } = useQuery(
    ["allInvoices", page],
    getProducts,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="m-3 mt-16 md:w-760 md:mx-auto">
      <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Inventory Log
          </p>
        </div>
      </div>

      <div className="bg-white  shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-bold  text-left pl-4">Product Name</th>
              <th className="font-bold text-left pl-4">Quantity</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              data?.data.results.map(data => {
                return (
                  <tr
                    key={data._id}
                    className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    onClick={() =>
                      navigate(`/office/inventory-log/${data._id}`)
                    }
                  >
                    <td className="pl-4 cursor-pointer">
                      <p className="font-medium">{data.productName}</p>
                    </td>

                    <td className="pl-4 cursor-pointer">
                      <p className="font-medium">{data.quantity}</p>
                    </td>
                  </tr>
                );
              })
            }
            
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
  );
};

export default InventoryLog;
