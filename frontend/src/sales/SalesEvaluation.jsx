import React from "react";

const SalesEvaluation = () => {
  return (
    <div className="m-3 mt-24 w-400 mx-auto border-2 shadow ">
      <h1 className="text-center font-bold text-2xl">Daily Sales Evaluation</h1>

      <div className="border w-4/5 mx-auto my-4"></div>

      <div className="p-3 flex flex-col gap-3">
        <p className="font-medium">Total Sales: </p>
        <p className="font-medium">Credit Sales: </p>
        <p className="font-medium">Transfers: </p>
        <p className="font-medium">Old debt paid:</p>
        <p className="font-medium">Cash On Hand: </p>
      </div>
    </div>
  );
};

export default SalesEvaluation;
