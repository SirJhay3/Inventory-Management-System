import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { NewCustomer } from "../components/components";
import { useStateContext } from "../contexts/ContextProvider";

const Customers = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
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
              <Link to='/customers/new' className="text-sm font-medium leading-none text-white">
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
              <th className="font-semibold  text-left border  pl-4">Name</th>
              <th className="font-semi-bold text-left pl-4">Address</th>
              <th className="font-semibold text-left pl-4">Telephone No.</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
            onClick={() => navigate('/customers/customer-name')}
            >
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">₦5000</p>
              </td>
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">₦5000</p>
              </td>
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">₦5000</p>
              </td>
            </tr>
          </tbody>
          
        </table>
      </div>

      <Routes>
        <Route path="new" element={<NewCustomer />} />
      </Routes>
    </div>
  );
};

export default Customers;
