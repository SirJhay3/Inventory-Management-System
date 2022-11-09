import React, { useState } from "react";
import DatePicker from "react-datepicker";
import BarChartComponent from './BarChart';
import PieChartComponent from './PieChart';
import { FiBarChart } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineSupervisorAccount } from "react-icons/md";

// css module for react-datepicker
import "react-datepicker/dist/react-datepicker.css";

// stats component
const DashboardStats = ({ color, backgroundColor, stat, icon, name }) => {
  return (
    <div className="flex justify-center items-center gap-6 h-20 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg w-56 p-4 rounded-2xl">
      <button
        type="button"
        style={{
          color,
          backgroundColor,
        }}
        className="text-2xl opacity-0.9  rounded-full p-1.5 hover:drop-shadow-xl"
      >
        {icon}
      </button>
      <div>
        <p className="text-lg text-center font-semibold">{stat}</p>
        <p className="text-sm text-center text-gray-400">{name}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isMonthClicked, setIsMonthClicked] = useState(true);
  const [isYearClicked, setIsYearClicked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      {/* <div className="m-3 mt-16  px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          Dashboard
        </p>
      </div> */}

      <div className="mt-12 md:mx-8">
        <div className="flex flex-wrap justify-center m-3 gap-3  items-center">
          {/* Daily statistics */}
          <DashboardStats
            color="rgb(228, 106, 118)"
            backgroundColor="rgb(255, 244, 229)"
            icon={<FiBarChart />}
            stat="50,000"
            name="Sales"
          />
          <DashboardStats
            color="rgb(0, 194, 146)"
            backgroundColor="rgb(235, 250, 242)"
            icon={<BiCart />}
            stat="4000"
            name="Orders"
          />
          <DashboardStats
            color="rgb(255, 244, 229)"
            backgroundColor="rgb(254, 201, 15)"
            icon={<BsBoxSeam />}
            stat="1250"
            name="Products"
          />
          <DashboardStats
            color="#03C9D7"
            backgroundColor="#E5FAFB"
            icon={<MdOutlineSupervisorAccount />}
            stat="30"
            name="Customers"
          />
        </div>
        {/* Charts */}
        <div className="flex flex-wrap mt-8 justify-center gap-3 items-stretch  md:mx-6">
          {/* Bar chart */}
          <div className="bg-white w-400">
            <div className="capitalize text-xl text-center font-semibold">
              sales overview
            </div>
            <div className="flex justify-between p-2 mb-4">
              <div className="flex gap-2 ml-3">
                <span
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    setIsMonthClicked(true);
                    setIsYearClicked(false);
                  }}
                >
                  Month
                </span>
                |
                <span
                  className="text-gray-400 cursor-pointer"
                  onClick={() => {
                    setIsYearClicked(true);
                    setIsMonthClicked(false);
                  }}
                >
                  Year
                </span>
              </div>

              {/* conditional display for the date picker */}
              {isMonthClicked && (
                <div className="mr-3 border">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
                </div>
              )}
              {isYearClicked && (
                <div className="mr-3 border">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy"
                    showYearPicker
                  />
                </div>
              )}
            </div>
            <BarChartComponent />
          </div>

          {/* Pie Chart */}
          <div className="bg-white w-400">
            <div className="capitalize text-xl text-center font-semibold">
              product statistics
            </div>
            <PieChartComponent />
          </div>
        </div>

        {/* Feeds */}
        {/* <div className="mt-8 w-400 md:w-760 m-6 mx-auto bg-white p-4">
          <p className="capitalize text-xl font-semibold text-center">feeds</p>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
