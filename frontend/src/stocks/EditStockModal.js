import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { useStateContext } from "../contexts/ContextProvider";
import { MdOutlineCancel } from "react-icons/md";

const EditStockModal = ({ stockDetails }) => {
  const navigate = useNavigate()
  const { id } = useParams();
  
  const { prodName, prodCategory, prodUnitPrice } = stockDetails;

  const { currentColor } = useStateContext();
  const [text, setText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("add");
  const [productName, setProductName] = useState(prodName);
  const [category, setCategory] = useState(prodCategory);
  const [unitPrice, setUnitPrice] = useState(prodUnitPrice);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [quantity, setQuantity] = useState("");

  

  const handleRadioBtnChange = (e) => {
    setSelectedRadioBtn(e.target.value);
  };

  const handleSubmit = async(e, id) => {
    e.preventDefault();
    const data = {
      productName,
      category,
      unitPrice,
      invoiceNo,
      quantity,
      stockActionType: selectedRadioBtn,
    };
    try {
      setText("Submitting...");
      setIsLoading(true);
      const response = await axios.patch(
        `http://localhost:4000/stocks/view/${id}`,
        data
      );
      toast.success(response.data.message);
      setInvoiceNo('');
      setQuantity('')
      setText('Submit');
      setIsLoading(false);
      navigate('/stocks/view')
    } catch (error) {
      console.log(error)
      toast.error(error.message);
      setIsLoading(false);
      setText("Submit");

    }
  };
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 left-0 bottom-0 flex justify-center items-center">
      <div className="dark:text-gray-200 bg-white dark:[#484B52] w-400 h-3/4 overflow-y-scroll">
        <div className="flex justify-between items-center p-4  bg-main-bg">
          <p className="font-semibold text-xl">Edit Stocks</p>
          <button
            type="button"
            onClick={() => navigate("/stocks/view")}
            style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <form className="px-10 py-5">
          <label
            htmlFor="productName"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            value={productName || ""}
            onChange={(e) => setProductName(e.target.value)}
            className="mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter product name"
          />

          <label
            htmlFor="category"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter category name"
          />

          <label
            htmlFor="unitPrice"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Unit Price(₦)
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={unitPrice || ""}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter unit price"
          />

          <label
            htmlFor="invoiceNo"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Invoice No
          </label>
          <input
            type="number"
            value={invoiceNo}
            name="invoiceNo"
            onChange={(e) => setInvoiceNo(e.target.value)}
            id="invoiceNo"
            className="mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter Invoice No"
          />

          <label
            htmlFor="quantity"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
            className="mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter quantity"
          />

          <fieldset className="border p-2">
            <legend className="tracking-normal leading-tight text-sm text-gray-800 font-bold">
              Action Type
            </legend>

            <div className="mb-1.5 flex gap-4">
              <label htmlFor="add ">
                <input
                  type="radio"
                  name="stockActionType"
                  id="add"
                  value="add"
                  className="cursor-pointer"
                  onChange={handleRadioBtnChange}
                  checked={selectedRadioBtn === "add"}
                />{" "}
                Add
              </label>

              <label htmlFor="remove">
                <input
                  type="radio"
                  name="stockActionType"
                  id="remove"
                  value="remove"
                  className="cursor-pointer"
                  onChange={handleRadioBtnChange}
                  checked={selectedRadioBtn === "remove"}
                />{" "}
                Remove
              </label>
            </div>
          </fieldset>

          <button
            style={{ background: currentColor }}
            className="mx-auto focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-sm flex items-center gap-3"
            onClick={(e) => handleSubmit(e, id)}
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
        </form>
      </div>
    </div>
  );
};

export default EditStockModal;