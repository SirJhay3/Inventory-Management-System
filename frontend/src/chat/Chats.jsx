import React from "react";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { AiOutlineSearch } from "react-icons/ai";

const Chats = () => {
  return (
    <div className=" mt-16 md:mt-12  mx-8">
      <div className="flex gap-2 items-center relative">
        <p className="absolute left-3">
          {" "}
          <AiOutlineSearch />{" "}
        </p>
        <input
          className="bg-gray-200 focus:outline-none rounded  text-sm text-gray-500  pl-10 py-2"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-between mt-4">
        <MyChats />
        <ChatBox />
      </div>
    </div>
  );
};
export default Chats;
