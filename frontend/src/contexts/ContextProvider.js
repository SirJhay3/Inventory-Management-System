import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StateContext = createContext();

const initialState = {
  cart: false,
  search: false,
  notification: false,
  userProfile: false,
};

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [profile, setProfile] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03c9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [salesId, setSalesId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  const [user, setUser] = useState("");

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);

    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);

    setThemeSettings(false);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);

  //   // if (!userInfo) {
  //   //   navigate("/dashboard");
  //   // }
  // }, [navigate]);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        profile,
        setProfile,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        invoiceNo,
        setInvoiceNo,
        salesId,
        setSalesId,
        currentCustomer,
        setCurrentCustomer,
        user,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default ContextProvider;

export const useStateContext = () => useContext(StateContext);
