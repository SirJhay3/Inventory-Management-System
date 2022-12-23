import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useQuery } from "react-query";
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

const Collections = () => {
  const { currentColor } = useStateContext();
  const [customer, setCustomer] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Select a payment mode");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle my data fetch
  const { data: allCustomers } = useQuery(
    "colletion_getCustomers",
    getCustomers
  );
  const { data: singleCustomerDetails } = useQuery(
    ["getSingleProduct", customer],
    () => {
      return axios.get(
        `http://localhost:4000/collections/?q=${customer.value}`
      );
    },
    {
      enabled: customer ? true : false,
    }
  );

  // update customer record with payload
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      paymentMode,
      amount,
    };
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:4000/collections/?q=${customer.value}`,
        payload
      );
      toast.success(response.data.message);
      setIsLoading(false);
      setCustomer(null);
      setAmount("");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Collections
        </p>
      </div>

      <div className="w-400 mx-auto mt-8 flex flex-col gap-3">
        <fieldset className="border-2 p-6">
          <legend>Customer Info</legend>
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
              className="mt-1"
              placeholder="Select a customer"
              value={customer}
              onChange={(value) => setCustomer(value)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 justify-center items-center">
            <p>
              Invoice No:{" "}
              {singleCustomerDetails?.data.length > 0
                ? singleCustomerDetails?.data[0].invoiceNo
                : ""}
            </p>

            <p>
              Balance:{" "}
              {singleCustomerDetails?.data.length > 0
                ? singleCustomerDetails?.data[0].balance
                : ""}
            </p>
          </div>
        </fieldset>

        <fieldset className="border-2 p-6">
          <legend>Payment Info</legend>
          <div className="flex flex-col gap-3 ">
            <label htmlFor="payment_mode">Payment Mode </label>
            <select
              name="paymentMode"
              id="payment_mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="h-10 text-center"
            >
              <option disabled hidden>
                Select a payment mode
              </option>
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2 justify-center items-baseline">
            <label htmlFor="amount">Amount :</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 shadow"
              id="amount"
            />
          </div>
        </fieldset>

        <div className="flex justify-center mb-3">
          <button
            style={{ backgroundColor: currentColor }}
            className="border p-4 rounded text-center outline-none flex items-center gap-3 text-xl font-bold  text-white"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Complete
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
      </div>
    </div>
  );
};

export default Collections;
