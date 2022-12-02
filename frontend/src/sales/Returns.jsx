import axios from "axios";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";

// function to create react-select options
const createOption = (option) => ({
  label: option,
  value: option,
});

// handler to get customers
const getCustomers = async () => {
  const result = await axios.get("http://localhost:4000/customers");
  return result;
};

const Returns = () => {
  const { currentColor } = useStateContext();
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReturnLoading, setIsReturnLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [filteredFetchedData, setFilteredFetchedData] = useState([]);
  const [productName, setProductName] = useState("");
  const [returnQty, setReturnQty] = useState("");

  // handle my data fetch
  const { data: allCustomers } = useQuery("return_getCustomers", getCustomers);

  // function to find invoice details
  const handleFindInvoice = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/sales/returns/?customerName=${customer.value}&invoiceNo=${invoiceNo}`
      );
      toast.success(response.data.message);
      setFetchedData(response.data.sales);
      setIsLoading(false);
      setShow(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    const payload = {
      productName,
      returnQty
    }

    try {
      setIsReturnLoading(true);
      const response = await axios.patch(
        `http://localhost:4000/sales/returns/?customerName=${customer.value}&invoiceNo=${invoiceNo}`,
        payload
      );
      toast.success(response.data.message);
      setIsReturnLoading(false);
      setInvoiceNo("");
      setCustomer(null)
      setReturnQty('');
      setShow(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsReturnLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedData.length === 0) return
    
    const filtered = fetchedData.salesItems.filter(
      (item) => item.productName === productName
    );
    setFilteredFetchedData(filtered);
  }, [fetchedData, productName]);

  return (
    <div>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Make Returns
        </p>
      </div>

      <div className="w-400 mx-auto mt-8 flex flex-col gap-3">
        <fieldset className="border-2 p-6 ">
          <legend>Sales Info</legend>
          <div>
            <label htmlFor="customer_name">Customer Name</label>
            <Select
              id="customer_name"
              options={
                allCustomers?.data
                  ? allCustomers.data.results.map((data) =>
                      createOption(data.name)
                    )
                  : []
              }
              name="customers"
              className=""
              placeholder="Select a customer"
              isDisabled={show}
              onChange={(value) => setCustomer(value)}
              value={customer}
            />
          </div>
          <div className="mt-4 flex gap-2 justify-center items-baseline">
            <label htmlFor="invoice_no">Invoice No. :</label>
            <input
              type="number"
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="p-2 shadow"
              name="invoice_no"
              id="invoice_no"
              disabled={show}
            />
          </div>

          <div className="text-center">
            <button
              onClick={(e) => handleFindInvoice(e)}
              style={{ background: currentColor }}
              className={`mx-auto mt-3 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-md font-medium flex items-center gap-3 ${
                show ? "opacity-50" : ""
              }`}
              disabled={show}
            >
              Find Invoice Details
              {isLoading && (
                <svg
                  className="animate-spin h-7 w-7 mr-3 text-white"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="white"
                  />
                  <path
                    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                    fill="white"
                  />
                </svg>
              )}
            </button>
          </div>
        </fieldset>

        {show && (
          <>
            <fieldset className="border-2 p-6">
              <legend>Return Info</legend>
              <div>
                <label htmlFor="product_name">Product Name </label>
                <Select
                  id="product_name"
                  options={
                    fetchedData
                      ? fetchedData.salesItems.map((item) =>
                          createOption(item.productName)
                        )
                      : []
                  }
                  name="customers"
                  className=""
                  placeholder="Select a customer"
                  onChange={(value) => setProductName(value.value)}
                />
              </div>

              <p className="text-center mt-2">
                Quantity Bought: {filteredFetchedData[0]?.quantity}{" "}
              </p>

              <p className="text-center mt-2 ">
                Unit Price: {filteredFetchedData[0]?.unitPrice}
              </p>

              <div className="mt-4 flex gap-2 justify-center items-baseline">
                <label htmlFor="return_quantity">Return Qty :</label>
                <input
                  type="number"
                  name="return_quantity"
                  className="p-2 shadow"
                  id="return_quantity"
                  value={returnQty}
                  onChange={(e) => setReturnQty(e.target.value)}
                />
              </div>
            </fieldset>

            <div className="flex justify-center mb-3">
              <button
                style={{ backgroundColor: currentColor }}
                className="border p-4 rounded text-center outline-none flex items-center gap-3 text-xl font-bold  text-white"
                type="submit"
                onClick={(e) => handleReturn(e)}
              >
                Return
                {isReturnLoading && (
                  <svg
                    className="animate-spin h-7 w-7 mr-3 text-white"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="white"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Returns;
