import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { MdOutlineCancel } from "react-icons/md";

const EditStockModal = ({ setShowModal }) => {
  const { currentColor } = useStateContext();
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 left-0 bottom-0 flex justify-center items-center">
      <div className="dark:text-gray-200 bg-white dark:[#484B52] w-400 ">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">New Category</p>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="px-10 py-5">
          <label
            htmlFor="name"
            className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
          >
            Name
          </label>
          <input
            id="name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Enter category name"
          />

          <button
            style={{ background: currentColor }}
            className="mx-auto block focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStockModal;
