import React, { useState } from "react";
import Select from "react-select";
import  SalesTable  from "./SalesTable";
import { useStateContext } from "../contexts/ContextProvider";

const Sales = () => {
  const { currentColor } = useStateContext();
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("wholesale");
  const handleRadioBtnChange = (e) => {
    setSelectedRadioBtn(e.target.value);
  };

  return (
    <>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Make Sales
        </p>
      </div>

      <div className="mt-8 m-3 md:flex gap-3 justify-center">
        {/* Product Info */}
        <div>
          <div>
            {/* stock */}
            <fieldset className="border-2 p-2">
              <legend>Stock Details</legend>
              <p className="mb-2 text-center">Invoice No: </p>

              <fieldset className="border px-2 py-1 mb-3">
                <legend htmlFor="product">Product Name</legend>
                <Select id="product" />
              </fieldset>

              <p className="my-1">Quantity Available: 5 Piece (s)</p>
              <p className="ml-16">Category:</p>
            </fieldset>

            {/* sales */}
            <fieldset className="border-2 p-2 mt-4">
              <legend>Sales Unit</legend>
              <div className="mb-1.5 flex gap-4">
                <label htmlFor="wholesale ">
                  <input
                    type="radio"
                    name="sale"
                    id="wholesale"
                    value="wholesale"
                    className="cursor-pointer"
                    onChange={handleRadioBtnChange}
                    checked={selectedRadioBtn === "wholesale"}
                  />{" "}
                  Wholesale
                </label>

                <label htmlFor="retail">
                  <input
                    type="radio"
                    name="sale"
                    id="retail"
                    value="retail"
                    className="cursor-pointer"
                    onChange={handleRadioBtnChange}
                    checked={selectedRadioBtn === "retail"}
                  />{" "}
                  Retail
                </label>
              </div>
              <fieldset className="border p-2 mb-4">
                <legend>Unit Price (₦)</legend>
                <input
                  type="number"
                  className="w-full text-center p-1 drop-shadow-sm"
                  value="2500"
                  disabled
                />
              </fieldset>

              <label htmlFor="quantity" className="flex gap-2 mb-4">
                Quantity:
                <input
                  type="number"
                  name=""
                  id="quantity"
                  className="p-0.5 text-center drop-shadow-md"
                />
              </label>

              <label htmlFor="discount" className="flex gap-2 mb-4">
                Discount/Price (₦):
                <input
                  type="number"
                  name=""
                  id="discount"
                  className="p-0.5 text-center drop-shadow-sm"
                  disabled={selectedRadioBtn === "wholesale"}
                />
              </label>

              <input
                type="submit"
                className=" block mx-auto p-2 mb-1 uppercase bg-white drop-shadow-xl cursor-pointer"
                value="Add item"
              />
            </fieldset>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="mt-3 md:mt-auto">
          <fieldset className="border-2 p-2 min-w-full">
            <legend>Transaction Information</legend>
            <div className="h-60 overflow-scroll ">
              <SalesTable />
            </div>
            {/* delete actions */}
            <div className="flex justify-end gap-3">
              <input
                className="p-1.5 border drop-shadow-md bg-white uppercase font-bold"
                type="button"
                value="Delete"
              />
              <input
                className="p-1.5 border drop-shadow-md bg-white text-red-700 uppercase font-bold"
                type="button"
                value="Delete All"
              />
            </div>

            {/* payment mode and amount */}
            <div className="flex justify-center gap-4 mb-1">
              <fieldset className="border flex flex-col p-2 w-32">
                <legend>Payment</legend>
                <label htmlFor="cash">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    className="mr-1 ml-4"
                  />
                  Cash
                </label>
                <label htmlFor="credit">
                  <input
                    type="radio"
                    name="payment"
                    id="credit"
                    className="mr-1 ml-4"
                  />
                  Credit
                </label>
              </fieldset>

              <fieldset className="border p-2">
                <legend>Total Amount</legend>
                <p className="w-60 pt-1 h-10 drop-shadow-md text-center text-xl bg-white">
                  ₦ 0.00{" "}
                </p>
              </fieldset>
            </div>

            {/* extra payment info */}
            <div className="flex flex-col md:flex-row justify-center gap-2 mx-auto w-48 md:w-auto">
              <div className="flex flex-col">
                <label htmlFor="cashPaid">Cash Paid</label>
                <input
                  type="number"
                  name=""
                  id="cashPaid"
                  className="p-0.5 text-center drop-shadow-md"
                />
              </div>

              <div className="flex flex-col ">
                <label htmlFor="transfer">Transfer</label>
                <input
                  type="number"
                  name=""
                  id="transfer"
                  className="p-0.5 text-center drop-shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <p>Cash Balance</p>
                <p className="md:w-48 h-7 bg-white drop-shadow-md text-center"></p>
              </div>
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Complete"
                style={{ backgroundColor: currentColor }}
                className="mt-2 p-2 uppercase text-white font-bold drop-shadow-md cursor-pointer text-xl"
              />
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Sales;
