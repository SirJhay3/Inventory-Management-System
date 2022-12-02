import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useQueryClient } from "react-query";

const NewCategory = () => {
  const navigate = useNavigate();
  const { currentColor } = useStateContext();
  const [categoryName, setCategoryName] = useState("");
  const [text, setText] = useState("Submit");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { category: categoryName };
    

    try {
      setText("Submitting...");
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/stocks/add/category",
        newCategory
      );
      toast.success(response.data.message);
      queryClient.invalidateQueries('categories')
      setCategoryName("");
      setText("Submit");
      setIsLoading(false);
      navigate("/stocks/add");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 left-0 bottom-0 flex justify-center items-center">
      <div className="dark:text-gray-200 bg-white dark:[#484B52] w-400 ">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">New Category</p>
          <button
            type="button"
            onClick={() => navigate("/stocks/add")}
            style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="px-10 py-5">
            <label
              htmlFor="name"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Name
            </label>
            <input
              id="name"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Enter category name"
            />

            <button
              style={{ background: currentColor }}
              className="mx-auto focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-sm flex items-center gap-3"
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
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
