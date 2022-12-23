import React from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";

const DebtsListing = () => {
  const { data } = useQuery("customersDebts", () => {
    return axios.get("http://localhost:4000/office/debts-listing");
  });

  return (
    <div className="m-3 mt-16 md:w-760 md:mx-auto">
      <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
          Debts Listing
        </p>
      </div>

      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-bold  text-left  pl-4">Customer Name</th>
              <th className="font-bold text-left pl-4">Date</th>
              <th className="font-bold text-left pl-4">Invoice No</th>
              <th className="font-bold text-left pl-4">Balance</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.data.map((data) => {
              return (
                <tr
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                  key={data._id}
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

                  <td className="pl-4 cursor-pointer">
                    <p className="font-medium">{data.balance}</p>
                  </td>
                </tr>
              );
            })}
            {/* <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">3673</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="inline font-medium p-2 bg-red-400  rounded-lg">
                  Pending
                </p>
              </td>
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">9871</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="inline font-medium p-2 rounded-lg bg-cyan-400">
                  Active
                </p>
              </td>
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">3445</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="inline font-medium p-2 rounded-lg bg-green-400">
                  Completed
                </p>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* <p className="p-4 bg-white mt-2 text-right pr-12">Total Amount: ₦15000</p> */}
    </div>
  );
};

export default DebtsListing;
