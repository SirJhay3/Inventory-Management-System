import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiCircleClaws, GiReceiveMoney } from "react-icons/gi";
import { MdOutlineCancel, MdOutlineSell } from "react-icons/md";
import { SiEsphome } from "react-icons/si";
import { GrCatalog } from "react-icons/gr";
import { HiChevronDown, HiChevronUp, HiOutlineUsers } from "react-icons/hi";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { ImOffice } from "react-icons/im";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  // States
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();
  const [stockMenu, setStockMenu] = useState(false);
  const [salesMenu, setSalesMenu] = useState(false);
  const [officeMenu, setOfficeMenu] = useState(false);
  const [officeRecords, setOfficeRecords] = useState(false);
  const [purchaseMenu, setPurchaseMenu] = useState(false);
  // const [officeManagement, setOfficeManagement] = useState(false);

  // Custom component to render the menu
  const NavLinkFunc = ({ icon, link, title, customFunc }) => (
    <NavLink
      to={link}
      onClick={customFunc}
      className={({ isActive }) => (isActive ? activeLink : normalLink)}
      style={({ isActive }) => ({
        backgroundColor: isActive ? currentColor : "",
      })}
    >
      {icon}
      {title}
    </NavLink>
  );

  // close the sidebar on small screens onclick of a menu
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // Custom links
  const activeLink =
    "flex items-center gap-3  rounded-lg text-md m-1 border w-full pt-1 pb-1 bg-sky-500 text-white";
  const normalLink =
    "flex items-center p-1 gap-3 rounded-lg text-white text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray w-full";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* Logo and Company name */}
          <div className="flex justify-between items-center">
            <div className="items-center gap-3 ml-2 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <GiCircleClaws /> <span>Inventory</span>
            </div>

            <button
              onClick={() => setActiveMenu((prev) => !prev)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>

          {/* MenuLists */}
          <div className="mt-10">
            {/* Dashboard */}
            <div className="flex justify-between m-3 mt-4 items-center">
              <NavLinkFunc
                link="/dashboard"
                title="DASHBOARD"
                icon={<SiEsphome />}
                customFunc={() => handleCloseSidebar()}
              />
            </div>

            {/* Stocks */}
            <div>
              <div className="flex justify-between m-3 mt-4 items-center">
                <div className="flex gap-3 items-center ml-1">
                  <GrCatalog />
                  <p className="text-gray-500 uppercase">stocks</p>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => setStockMenu((prev) => !prev)}
                >
                  {stockMenu ? <HiChevronUp /> : <HiChevronDown />}
                </span>
              </div>
              {/* stock sub-menu */}
              {stockMenu && (
                <div className="mx-8">
                  <NavLinkFunc
                    link="/stocks/view"
                    title="View Stocks"
                    customFunc={() => handleCloseSidebar()}
                  />
                  <NavLinkFunc
                    link="stocks/add"
                    title="Add New Stock"
                    customFunc={() => handleCloseSidebar()}
                  />
                  
                  {/* <NavLinkFunc
                    link="stocks/transfer"
                    title="Stock Transfer"
                    customFunc={() => handleCloseSidebar()}
                  /> */}
                </div>
              )}
            </div>

            {/* Sales */}
            <div>
              <div className="flex justify-between m-3 mt-4 items-center">
                <div className="flex gap-3 items-center ml-1">
                  <AiOutlineCodeSandbox />
                  <p className="text-gray-500 uppercase">sales</p>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => setSalesMenu((prev) => !prev)}
                >
                  {salesMenu ? <HiChevronUp /> : <HiChevronDown />}
                </span>
              </div>
              {/* sales sub-menu */}
              {salesMenu && (
                <div className="mx-8">
                  <NavLinkFunc
                    link="sales/new"
                    title="Make Sales"
                    customFunc={() => handleCloseSidebar()}
                  />
                  <NavLinkFunc
                    link="sales/returns"
                    title="Make Returns"
                    customFunc={() => handleCloseSidebar()}
                  />
                  <NavLinkFunc
                    link="sales/logs"
                    title="Sales Log"
                    customFunc={() => handleCloseSidebar()}
                  />
                  <NavLinkFunc
                    link="sales/evaluation"
                    title="Sales Evaluation"
                    customFunc={() => handleCloseSidebar()}
                  />
                </div>
              )}
            </div>

            {/* Purchases */}
            <div>
              <div className="flex justify-between m-3 mt-4 items-center">
                <div className="flex gap-3 items-center ml-1">
                  <MdOutlineSell />
                  <p className="text-gray-500 uppercase">purchases</p>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => setPurchaseMenu((prev) => !prev)}
                >
                  {purchaseMenu ? <HiChevronUp /> : <HiChevronDown />}
                </span>
              </div>

              {/* Purchase subMenu */}
              {purchaseMenu && (
                <div className="mx-8">
                  <NavLinkFunc
                    link="purchases/order"
                    title="Purchase Order"
                    customFunc={() => handleCloseSidebar()}
                  />
                  <NavLinkFunc
                    link="purchases/return"
                    title="Purchase Return"
                    customFunc={() => handleCloseSidebar()}
                  />
                </div>
              )}
            </div>

            {/* Customers */}
            <div className="flex justify-between m-3 mt-4 items-center">
              <NavLinkFunc
                link="/customers"
                title="CUSTOMERS"
                customFunc={() => handleCloseSidebar()}
                icon={<HiOutlineUsers />}
              />
            </div>

            {/* Orders */}
            <div className="flex justify-between m-3 mt-4 items-center">
              <NavLinkFunc
                link="/orders"
                title="ORDERS"
                customFunc={() => handleCloseSidebar()}
                icon={<IoCartOutline />}
              />
            </div>

            {/* Collections */}
            <div className="flex justify-between m-3 mt-4 items-center">
              <NavLinkFunc
                link="/collections"
                title="COLLECTIONS"
                icon={<GiReceiveMoney />}
                customFunc={() => handleCloseSidebar()}
              />
            </div>

            {/* Office */}
            <div>
              <div className="flex justify-between m-3 mt-4 items-center">
                <div className="flex gap-3 items-center ml-1">
                  <ImOffice />
                  <p className="text-gray-500 uppercase">office</p>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setOfficeMenu((prev) => !prev);
                    setOfficeRecords(false);
                    // setOfficeManagement(false);
                  }}
                >
                  {officeMenu ? <HiChevronUp /> : <HiChevronDown />}
                </span>
              </div>
              {/* office sub-menu */}
              {officeMenu && (
                <div className="mx-4">
                  {/* TODO: User log */}

                  {/* office record tracking */}
                  <div>
                    <div className="flex justify-between m-3 mt-4 items-center">
                      <p className="text-gray-500 uppercase">Record Tracking</p>

                      <span
                        className="cursor-pointer"
                        onClick={() => setOfficeRecords((prev) => !prev)}
                      >
                        {officeRecords ? <HiChevronUp /> : <HiChevronDown />}
                      </span>
                    </div>
                    {/* office record tracking menu */}
                    {officeRecords && (
                      <div className="mx-8">
                        <NavLinkFunc
                          link="office/return-records"
                          title="Return Record"
                          customFunc={() => handleCloseSidebar()}
                        />
                        {/* <NavLinkFunc
                          link="office/wastage-records"
                          title="Wastage Record"
                          customFunc={() => handleCloseSidebar()}
                        /> */}
                        {/* <NavLinkFunc
                          link="office/sales-evaluation-records"
                          title="Sales Evaluation Record"
                          customFunc={() => handleCloseSidebar()}
                        /> */}
                        {/* <NavLinkFunc
                          link="office/stock-transfer-records"
                          title="Stock Transfer Record"
                          customFunc={() => handleCloseSidebar()}
                        /> */}
                        <NavLinkFunc
                          link="office/invoice-listing"
                          title="Invoice Listing"
                          customFunc={() => handleCloseSidebar()}
                        />
                        <NavLinkFunc
                          link="office/purchase-listing"
                          title="Purchase Listing"
                          customFunc={() => handleCloseSidebar()}
                        />
                      </div>
                    )}
                  </div>

                  {/* Inventory Log */}
                  <div className="flex justify-between ml-2 mt-4 items-center">
                    <NavLinkFunc
                      link="/office/inventory-log"
                      title="INVENTORY LOG"
                      customFunc={() => handleCloseSidebar()}
                    />
                  </div>

                  {/* office management */}
                  <div>
                    {/* <div className="flex justify-between m-3 mt-4 items-center">
                      <p className="text-gray-500 uppercase">Management</p>

                      <span
                        className="cursor-pointer"
                        onClick={() => setOfficeManagement((prev) => !prev)}
                      >
                        {officeManagement ? <HiChevronUp /> : <HiChevronDown />}
                      </span>
                    </div> */}
                    {/* office management menu */}
                    {/* {officeManagement && (
                      <div className="mx-8">
                        <NavLinkFunc
                          link="office/view-company-info"
                          title="View/Edit Company Info"
                          customFunc={() => handleCloseSidebar()}
                        />
                        <NavLinkFunc
                          link="office/create-branch-info"
                          title="Create Branch Info"
                          customFunc={() => handleCloseSidebar()}
                        />
                        <NavLinkFunc
                          link="office/register-employee"
                          title="Register Employee"
                          customFunc={() => handleCloseSidebar()}
                        />
                      </div>
                    )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
