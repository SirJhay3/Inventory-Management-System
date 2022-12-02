import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
// import SideDrawer from "./SideDrawer";
import Cart from "./Cart";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useStateContext } from "../contexts/ContextProvider";

// custom component for the navbar icons
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ backgroundColor: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const {
    setActiveMenu,
    isClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();
  const user = cookies.get("username");

  // get the width of the window
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [setActiveMenu, screenSize]);

  // useEffect(() => {
  //   setShow(false);
  // }, [location])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative ">
      <div className="flex gap-4">
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prev) => !prev)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
      </div>

      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03c9d7"
          customFunc={() => navigate("/chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => setProfile((prev) => !prev)}
        >
          <CgProfile />
          <p>
            <span className="text-gray-400 text-14">Hi, </span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              {user ? user : "User"}
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>
        {/* {isClicked.search && <SideDrawer />} */}
        {isClicked.cart && <Cart />}
        {isClicked.notification && <Notification />}
        {profile && <UserProfile setProfile={setProfile} />}
      </div>
    </div>
  );
};

export default Navbar;
