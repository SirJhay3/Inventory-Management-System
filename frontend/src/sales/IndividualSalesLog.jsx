import React from "react";
import SalesTable from "./SalesTable";

const IndividualSalesLog = () => {
  return (
    <div className="m-3 mt-12 sm:w-[calc(400px_+_100px)] sm:mx-auto">
      <div className="mb-5 text-2xl font-bold text-center">Customer Name</div>
      <div className="h-72 overflow-scroll">
        <SalesTable />
      </div>
      <div className="grid grid-cols-2 gap-4 bg-white shadow mt-2 p-2">
        <div>Total Sales Amount: </div>
        <div>Transfer: </div>
        <div>Debt: </div>
        <div>Cash Paid: </div>
      </div>
    </div>
  );
};

export default IndividualSalesLog;
