import React from "react";
import Select from "react-select";
import SalesTable from "../sales/SalesTable";
import { useStateContext } from "../contexts/ContextProvider";



const PurchaseOrder = () => {
  const { currentColor } = useStateContext();
  return (
    <>
      <div className="m-3 mt-16 md:mt-6 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Purchase Order
        </p>
      </div>

      <div className="p-2 m-3 mt-4 flex flex-col md:flex-row gap-3 justify-center items-center">
        {/* Stock details */}
        <div className="w-[calc(400px_+_50px)] md:w-400">
          <label className="mb-1 block" htmlFor="product-category">
            Product Category
          </label>
          <Select />

          <fieldset className="border-2 p-2 mt-4">
            <legend>Stock Details</legend>
            <label className="mb-1 block" htmlFor="product-name">
              Product Name
            </label>
            <Select />

            <p className="my-3 text-center">Qty Available: 5 Piece(s)</p>

            <div className="flex gap-3 items-baseline mr-6 justify-center mb-3">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                className="p-1 shadow text-center outline-none"
                id="quantity"
              />
            </div>

            <div className="flex gap-3 items-baseline mb-3 justify-center mr-6">
              <label htmlFor="unit-cost">Unit Cost:</label>
              <input
                type="number"
                name="unit-cost"
                id="unit-cost"
                className="p-1 shadow text-center outline-none"
              />
            </div>

            <fieldset className="border p-2 w-10 mx-auto">
              <legend>Total Cost</legend>
              <input
                type="number"
                name=""
                id=""
                className="p-1 shadow text-center outline-none"
              />
            </fieldset>
          </fieldset>
        </div>

        {/* Purchase Table */}
        <div className="mt-3 md:mt-0 md:w-auto w-[calc(400px_+_50px)]">
          <fieldset className="border-2 p-2 min-w-full">
            <legend>Purchase Information</legend>
            <div className="h-60 overflow-scroll ">
              <SalesTable />
            </div>

            <p className="text-right mr-8 mt-4 p-2 font-bold text-xl">
              Total Amount: <span>100000</span>
            </p>

            <button
              style={{ background: currentColor }}
              className="mt-3 p-3 text-white font-bold mx-auto block"
              type="submit"
            >
              Generate Order
            </button>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default PurchaseOrder;
