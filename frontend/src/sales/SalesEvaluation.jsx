import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';

const getEvaluations = async () => {
  const result = await axios.get("http://localhost:4000/sales/evaluation");
  return result;
}

const SalesEvaluation = () => {
  const { data } = useQuery('salesEvaluation', getEvaluations);
  return (
    <div className="m-3 mt-24 w-400 mx-auto border-2 shadow ">
      <h1 className="text-center font-bold text-2xl">Daily Sales Evaluation</h1>

      <div className="border w-4/5 mx-auto my-4"></div>

      <div className="p-3 flex flex-col gap-3">
        <p className="font-medium">Total Sales: {data?.data[0].totalAmount}</p>
        <p className="font-medium">Debts: {data?.data[0].balance}</p>
        <p className="font-medium">Transfers: {data?.data[0].transfer}</p>
        <p className="font-medium">Old debt paid:</p>
        <p className="font-medium">Cash On Hand: {data?.data[0].cashPaid}</p>
      </div>
    </div>
  );
};

export default SalesEvaluation;
