import React, { useState } from "react";
import {useQuery} from 'react-query';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { BasicTable } from "./BasicTable";
import  EditStockModal  from "./EditStockModal";


const ViewHandler = async() => {
  const data = await axios.get('/stocks/view')
  return data;
}

const ViewStocks = () => {
  const { data } = useQuery('ViewStock', ViewHandler)
  const [showModal, setShowModal] = useState(false);
  const [stockDetails, setStockDetails] = useState({
    prodName: '',
    prodCategory: '',
    prodUnitPrice: '',
    prodId: ''
  })
  return (
    <>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          View Stocks
        </p>
      </div>

      {/* Stock  table*/}
      <div className="mt-12 md:mt-auto m-3 md:mx-auto md:w-780 drop-shadow-xl ">
        <BasicTable setShowModal={setShowModal} setStockDetails={setStockDetails} stockDetails={stockDetails} stockData={data}/>
      </div>

      <Routes>
        <Route path='/:id' element={<EditStockModal stockDetails={stockDetails} />} />
      </Routes>

      {showModal && <EditStockModal setShowModal={setShowModal} stockDetails={stockDetails} />}
    </>
  );
};

export default ViewStocks;
