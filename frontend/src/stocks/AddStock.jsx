import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import Select from "react-select";
import { toast } from 'react-toastify';
import { useStateContext } from "../contexts/ContextProvider";
import  NewCategory  from "./NewCategory";


const viewCategory = async () => {
  const data = await axios.get("/stocks/add/category");
  return data;
};
const createOption = (option) => ({
  label: option.name.replace(/^./, option.name[0].toUpperCase()),
  value: option.name.replace(/^./, option.name[0].toUpperCase())
});


const AddStocks = () => {
  const { data } = useQuery("categories", viewCategory);

  const { currentColor } = useStateContext();

  const form = useRef(null);
  const imageRef = useRef(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [text, setText] = useState("Submit");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    
    try {
      setText("Submitting...");
      setIsLoading(true);
      const response = await axios.post("/stocks/add", data);
      toast.success(response.data.message);
      setProductName('');
      imageRef.current.value = null;
      setQuantity('');
      setUnitPrice('');
      setInvoiceNo('');
      setText('Submit');
      setIsLoading(false);

    } catch (error) {
      toast.error(error.message)
      setIsLoading(false);
      setText('Submit');
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col place-content-center w-full ">
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Add Stocks
        </p>
      </div>

      <form ref={form} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col items-center py-8 px-4 m-auto mt-8 bg-white border w-72">
          {/* Code block starts */}
          <div className="flex flex-col">
            <label
              htmlFor="productName"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Product Name
            </label>

            <div className="w-64">
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                name="productName"
                className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                placeholder="Input product name"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <label
              htmlFor="category"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Category
            </label>

            <div className="w-64 flex justify-between">
              <Select
                id="category"
                options={
                  data?.data ? data.data.map((data) => createOption(data)) : []
                }
                name="category"
                className="w-3/4"
                placeholder="Select a category"
                onChange={(value) => setCategory(value.value)}
              />
              <Link
                to="/stocks/add/category"
                style={{ background: currentColor }}
                className="border p-2 text-white text-sm font-normal rounded-sm"
              >
                New
              </Link>
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <label
              htmlFor="invoiceNo"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Invoice No.
            </label>
            <input
              type="number"
              id="invoiceNo"
              name="invoiceNo"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              placeholder="Input invoice No."
            />
          </div>

          <div className="flex flex-col mt-3">
            <label
              htmlFor="image"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Image File
            </label>
            <input
              type="file"
              name="image"
              ref={imageRef}
              accept="image/*"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              // placeholder="Input item price"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label
              htmlFor="quantity"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              name="quantity"
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              placeholder="Input quantity"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label
              htmlFor="unitPrice"
              className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Unit Price(₦)
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
              placeholder="Input item price"
            />
          </div>
        </div>

        <div>
          <button
            style={{ background: currentColor }}
            className="mx-auto block mt-6 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-sm flex items-center gap-3 mb-4"
          >
            {text}
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

        {/* Code block ends */}
      </form>

      <Routes>
        <Route path="/category" element={<NewCategory />} />
      </Routes>
    </div>
  );
};

export default AddStocks;
