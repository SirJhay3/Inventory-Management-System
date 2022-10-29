import React, {useState} from 'react';
import { BasicTable } from '../../components/stocks/BasicTable'
import { EditStockModal } from "../../components/components";
import { useQuery } from 'react-query';
import axios from 'axios';

// const ViewHandler = async () => {
//   const data = await axios.get('/stocks/view')
//   return data;
// }

const ViewStocks = () => {
  // const { data } = useQuery('ViewStock', ViewHandler)
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
          View Stocks
        </p>
      </div>

      {/* {console.log(data.data)} */}

      <div className="mt-12 md:mt-auto m-3 md:mx-auto md:w-780 drop-shadow-xl ">
        <BasicTable setShowModal={ setShowModal} />
      </div>

      {showModal && <EditStockModal setShowModal={setShowModal} />}
    </>
  );
}

export default ViewStocks