import React from 'react';
// import { Link } from 'react-router-dom';
// import { SalesTable } from "../components/components";

const Orders = () => {
  return (
    <div className="m-3 mt-16 md:w-760 md:mx-auto">
      <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Orders
          </p>
      </div>

      <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-semibold  text-left  pl-4">Customer Name</th>
              <th className="font-semi-bold text-left pl-4">Order ID</th>
              <th className="font-semibold text-left pl-4">Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
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

            <tr
              className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              
            >
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
            </tr>
          </tbody>
        </table>
      </div>

      {/* <p className="p-4 bg-white mt-2 text-right pr-12">Total Amount: ₦15000</p> */}
    </div>
  );
}

export default Orders