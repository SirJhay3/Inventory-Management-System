import React, { useEffect, useState } from "react";
import Select from "react-select";
import SalesTable from "./SalesTable";
import axios from "axios";
import { toast } from 'react-toastify';
import { useStateContext } from "../contexts/ContextProvider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

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

const Sales = () => {
  // states
  const [salesData, setSalesData] = useState([]);
  const { currentColor } = useStateContext();
  const [customer, setCustomer] = useState(null);
  const [invoiceCounter, setInvoiceCounter] = useState(0);
  const [productName, setProductName] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [salesRadioBtn, setSalesRadioBtn] = useState("wholesale");
  const [modeRadioBtn, setModeRadioBtn] = useState("cash");
  const [isHighlighted, setIsHighlighted] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cashPaid, setCashPaid] = useState("");
  const [transfer, setTransfer] = useState("");
  const [cashBalance, setCashBalance] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  // handle my data fetch
  const { data: allProducts } = useQuery("getProducts", () => {
    return axios.get("http://localhost:4000/stocks/view");
  });

  const { data: singleProduct } = useQuery(
    ["getSingleProduct", productName],
    () => {
      return axios.get(`http://localhost:4000/stocks/view/${productName.value}`);
    },
    {
      enabled: productName ? true : false ,
    }
  );
  const { data: allCustomers } = useQuery("selectCustomers", getCustomers);

  const [unitPrice, setUnitPrice] = useState(singleProduct?.data.unitPrice);

  // handle payment mode radio button change
  const handleModeRadioBtnChange = (e) => {
    setModeRadioBtn(e.target.value);
  };

  // handle sales unit radio button change
  const handleSalesRadioBtnChange = (e) => {
    setSalesRadioBtn(e.target.value);
  };

  // add items to sales data array to populate react table
  const handleAddItems = () => {
    const objectItems = {
      productName: productName.value,
      quantity: +quantity,
      unitPrice: +unitPrice,
      amount: +quantity * +unitPrice,
      returnQty: 0
    };
    setSalesData((prev) => [...prev, objectItems]);

    setProductName(null);
    setQuantity("");
    setSalesRadioBtn("wholesale");
    setDiscountPrice("");
  };

  // handle delete button
  const handleDelete = () => {
    const newData = salesData.filter((value) => value !== isHighlighted);
    setSalesData(newData);
    setIsHighlighted(null);
  };

  // set unit price after every product fetch
  useEffect(() => {
    setUnitPrice(singleProduct?.data.unitPrice);
  }, [singleProduct]);

  // calculate total amounts for  products
  useEffect(() => {
    const sum = salesData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    setTotalAmount(sum);
  }, [salesData]);

  // calculate cash balance off some input values 
  useEffect(() => {
    if (cashPaid && transfer) {
      setCashBalance(+totalAmount - (+cashPaid + +transfer));
      return;
    }
    if (!cashPaid || transfer) {
      setCashBalance(+totalAmount - +transfer);
      return;
    }
    if (!transfer || cashPaid) {
      setCashBalance(+totalAmount - +cashPaid);
      return;
    }
  }, [cashPaid, transfer, totalAmount]);

  // submit necessary data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      customerName: customer.value,
      invoiceNo: +invoiceCounter,
      salesItems: salesData,
      totalAmount: +totalAmount,
      salesMode: modeRadioBtn,
      cashPaid: +cashPaid,
      transfer: +transfer,
      balance: +cashBalance
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://localhost:4000/sales/new",
        payload
      );
      // console.log(response)
      toast.success(response.data.message)
      setIsLoading(false);
      setSalesData([]);
      setCashPaid('');
      setCustomer(null)
      setTransfer('');
      setCashBalance('');
      setInvoiceCounter(prev => prev + 1); 

    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Make Sales
        </p>
      </div>

      {/* customer dropdown */}
      <div className="flex mx-10 mt-3 justify-center md:justify-end">
        <div className="flex items-end justify-end gap-2 ">
          <div className="flex flex-col">
            <label
              htmlFor="customers"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2 justify-self-end"
            >
              Customer Name
            </label>

            <Select
              id="customers"
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
              value={customer}
              onChange={(value) => setCustomer(value)}
            />
          </div>

          <Link
            to="/customers/new"
            style={{ background: currentColor }}
            className="border p-2 text-white text-sm font-normal rounded-sm"
          >
            New
          </Link>
        </div>
      </div>

      <div className="mt-4 m-3 md:flex  gap-3 justify-center">
        {/* Product Info */}
        <div>
          <div>
            {/* stock */}
            <fieldset className="border-2 p-2">
              <legend>Stock Details</legend>
              <p className="mb-2 text-center">Invoice No: {invoiceCounter} </p>

              <fieldset className="border px-2 py-1 mb-3">
                <legend htmlFor="product">Product Name</legend>
                <Select
                  id="product"
                  options={
                    allProducts?.data
                      ? allProducts.data.map((data) =>
                          createOption(data.productName)
                        )
                      : []
                  }
                  name="product"
                  // className="w-3/4"
                  placeholder="Select a product"
                  value={productName}
                  onChange={(value) => setProductName(value)}
                />
              </fieldset>

              <p className="my-1">
                Quantity Available: {singleProduct?.data.quantity} Piece (s)
              </p>
              <p className="ml-16">Category: {singleProduct?.data.category}</p>
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
                    onChange={handleSalesRadioBtnChange}
                    checked={salesRadioBtn === "wholesale"}
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
                    onChange={handleSalesRadioBtnChange}
                    checked={salesRadioBtn === "retail"}
                  />{" "}
                  Retail
                </label>
              </div>
              <fieldset className="border p-2 mb-4">
                <legend>Unit Price (₦)</legend>
                <input
                  type="number"
                  className="w-full text-center p-1 drop-shadow-sm"
                  value={singleProduct ? singleProduct.data.unitPrice : ""}
                  disabled
                />
              </fieldset>

              <label htmlFor="quantity" className="flex gap-2 mb-4">
                Quantity:
                <input
                  type="number"
                  name="prodQuantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  id="quantity"
                  value={quantity}
                  className="p-0.5 text-center drop-shadow-md"
                />
              </label>

              <label htmlFor="discount" className="flex gap-2 mb-4">
                Discount/Price (₦):
                <input
                  type="number"
                  // min={`${+unitPrice}`}
                  // max={`${+unitPrice + 300}`}
                  // name="discount"
                  id="discount"
                  value={discountPrice}
                  className="p-0.5 text-center drop-shadow-sm"
                  disabled={salesRadioBtn === "wholesale"}
                  onChange={(e) => {
                    setDiscountPrice(e.target.value);
                    setUnitPrice(e.target.value);
                  }}
                />
              </label>

              <button
                type="button"
                onClick={handleAddItems}
                className=" block mx-auto p-2 mb-1 uppercase bg-white drop-shadow-xl cursor-pointer"
              >
                Add item{" "}
              </button>
            </fieldset>
          </div>
        </div>

        {/* Transaction Info */}
        <div className="mt-3 md:mt-auto">
          <fieldset className="border-2 p-2 min-w-full">
            <legend>Transaction Information</legend>
            <div className="h-60 overflow-scroll ">
              <SalesTable
                salesData={salesData}
                isHighlighted={isHighlighted}
                setIsHighlighted={setIsHighlighted}
              />
            </div>
            {/* delete actions */}
            <div className="flex justify-end gap-3">
              <button
                className="p-1.5 border drop-shadow-md bg-white uppercase font-bold disabled:cursor-not-allowed disabled:opacity-20"
                type="button"
                onClick={() => handleDelete()}
                disabled={!isHighlighted}
              >
                {" "}
                Delete
              </button>
              <button
                className="p-1.5 border drop-shadow-md bg-white text-red-700 uppercase font-bold"
                type="button"
                onClick={() => {
                  setSalesData([]);
                  setIsHighlighted(null);
                }}
              >
                Delete All
              </button>
            </div>

            {/* payment mode and amount */}
            <div className="flex justify-center gap-4 mb-1">
              <fieldset className="border flex flex-col p-2 w-32">
                <legend>Sales Mode</legend>
                <label htmlFor="cash">
                  <input
                    type="radio"
                    name="payment"
                    id="cash"
                    value="cash"
                    onChange={handleModeRadioBtnChange}
                    checked={modeRadioBtn === "cash"}
                    className="mr-1 ml-4"
                  />
                  Cash
                </label>
                <label htmlFor="credit">
                  <input
                    type="radio"
                    name="payment"
                    onChange={handleModeRadioBtnChange}
                    id="credit"
                    value="credit"
                    checked={modeRadioBtn === "credit"}
                    className="mr-1 ml-4"
                  />
                  Credit
                </label>
              </fieldset>

              <fieldset className="border p-2">
                <legend>Total Amount</legend>
                <p className="w-60 pt-1 h-10 drop-shadow-md text-center text-xl bg-white">
                  ₦ {totalAmount}.00{" "}
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
                  value={cashPaid}
                  onChange={(e) => setCashPaid(e.target.value)}
                  id="cashPaid"
                  className="p-0.5 text-center drop-shadow-md"
                  disabled={modeRadioBtn === "credit"}
                />
              </div>

              <div className="flex flex-col ">
                <label htmlFor="transfer">Transfer</label>
                <input
                  type="number"
                  name=""
                  value={transfer}
                  onChange={(e) => setTransfer(e.target.value)}
                  id="transfer"
                  disabled={modeRadioBtn === "credit"}
                  className="p-0.5 text-center drop-shadow-md"
                />
              </div>

              <div className="flex flex-col">
                <p>Cash Balance</p>
                <p
                  className="md:w-48 h-7 bg-white drop-shadow-md text-center"
                  onChange={(e) => setCashBalance(e.target.value)}
                >
                  {cashBalance}
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={(e) => handleSubmit(e)}
                style={{ background: currentColor }}
                className="mx-auto mt-3 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-md font-medium flex items-center gap-3"
              >
                Make Sales
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
        </div>
      </div>
    </>
  );
};

export default Sales;
