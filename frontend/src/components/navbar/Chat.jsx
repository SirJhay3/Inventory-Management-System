import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";

const Chat = () => {
  const { isClicked, setIsClicked } = useStateContext();
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">Chat</p>
          <button
            type="button"
            onClick={() => setIsClicked({ ...isClicked, chat: false })}
            style={{ color: "rgb(153,171,180)", borderRadius: "50%" }}
            className="text-2xl p-3 hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
