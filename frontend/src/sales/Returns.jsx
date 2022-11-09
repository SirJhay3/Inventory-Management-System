import React from "react";
import Select from "react-select";
import { useStateContext } from "../contexts/ContextProvider";
// import SalesLog from './SalesLog'

const Returns = () => {
  const { currentColor } = useStateContext();
  return (
    <div>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Make Returns
        </p>
      </div>

      <div className="w-400 mx-auto mt-8 flex flex-col gap-3">
        <fieldset className="border-2 p-6">
          <legend>Sales Info</legend>
          <div>
            <label htmlFor="customer_name">Customer Name</label>
            <Select />
          </div>
          <div className="mt-4 flex gap-2 justify-center items-baseline">
            <label htmlFor="invoice_no">Invoice No. :</label>
            <input
              type="text"
              className="p-2 shadow"
              name="invoice_no"
              id="invoice_no"
            />
          </div>
        </fieldset>

        <fieldset className="border-2 p-6">
          <legend>Return Info</legend>
          <div>
            <label htmlFor="product_name">Product Name </label>
            <Select />
          </div>

          <p className="text-center mt-2">Quantity Bought: 10</p>

          <p className="text-center mt-2 ">Unit Price: ₦2100</p>

          <div className="mt-4 flex gap-2 justify-center items-baseline">
            <label htmlFor="return_quantity">Return Qty :</label>
            <input
              type="number"
              name="return_quantity"
              className="p-2 shadow"
              id="return_quantity"
            />
          </div>
        </fieldset>

        <div className="flex justify-center mb-3">
          <button
            style={{ backgroundColor: currentColor }}
            className="border p-4 text-center text-2xl font-bold shadow text-white"
            type="submit"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default Returns;
