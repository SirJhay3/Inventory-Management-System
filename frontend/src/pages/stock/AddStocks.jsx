import React, { useState } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';
import Select from 'react-select';
import { useStateContext } from "../../contexts/ContextProvider";
import { NewCategory } from '../../components/components';

const viewCategory = async () => {
  const data = await axios.get('/stocks/category')
  return data;
}
const createOption = (option) => ({
  label: option.category.toUpperCase(),
  value: option.category.toLowerCase().replace(/\W/g, ""),
});


const AddStocks = () => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useQuery("categories", viewCategory);
  const { currentColor } = useStateContext();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');



   
  return (
    <div className="flex flex-col place-content-center w-full ">
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Add Stocks
        </p>
      </div>

      <form className="flex flex-col items-center py-8 px-4 m-auto mt-8 bg-white border">
        {/* Code block starts */}
        <div className="flex flex-col">
          <label
            htmlFor="products"
            className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Product Name
          </label>

          <div className="w-64">
            <input
              type="text"
              id="products"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className= "text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
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
              className="w-3/4"
              placeholder="Select a category"
              onChange={(value) => setCategory(value.value)}
              
            />
            <button
              style={{ background: currentColor }}
              className="border p-2 text-white text-sm font-normal rounded-sm"
              onClick={() => setShowModal(true)}
            >
              New
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-3">
          <label
            htmlFor="quantity"
            className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Invoice No.
          </label>
          <input
            type="number"
            id="quantity"
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
            accept="image/*"
            id="image"
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
            className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Input quantity"
          />
        </div>

        <div className="flex flex-col mt-3">
          <label
            htmlFor="unit_price"
            className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Unit Price(₦)
          </label>
          <input
            type="number"
            id="unit_price"
            className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Input item price"
          />

          <button
            style={{ background: currentColor }}
            className="mx-auto block mt-6 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-sm"
          >
            Submit
          </button>
        </div>
        {/* Code block ends */}
      </form>
      

      {showModal && <NewCategory setShowModal={setShowModal} />}
    </div>
  );
};

export default AddStocks;
