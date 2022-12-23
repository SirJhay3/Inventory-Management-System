import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ setProfile }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    setProfile(false);
    navigate("/");
  };
  return (
    <div className="flex items-center absolute right-6 cursor-pointer">
      <div className="rounded-full">
        <ul className="p-2 w-full border-r bg-white rounded  shadow mt-10 ">
          <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx={12} cy={7} r={4} />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <span className="text-sm ml-2">My Profile</span>
            </div>
          </li>
          <li
            className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2"
            onClick={handleSignOut}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
              <span className="text-sm ml-2">Sign out</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default UserProfile;
