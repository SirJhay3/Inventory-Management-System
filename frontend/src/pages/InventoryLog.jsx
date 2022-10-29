import React from "react";
import { useNavigate } from "react-router-dom";



const InventoryLog = () => {
  const navigate = useNavigate();
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
              <th className="font-semibold  text-left border  pl-4">Product Name</th>
              <th className="font-semi-bold text-left pl-4">Quantity</th>
              
            </tr>
          </thead>
          <tbody className="w-full">
            <tr
              className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
              onClick={() => navigate("/office/inventory-log/product-name")}
            >
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
              
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
              
            </tr>

            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">UX Design &amp; Visual Strategy</p>
              </td>
              <td className="pl-4 cursor-pointer">
                <p className="font-medium">12/10/22</p>
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default InventoryLog;
