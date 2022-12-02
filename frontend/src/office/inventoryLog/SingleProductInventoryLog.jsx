import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductTable } from './ProductTable';

const SingleProductInventoryLog = () => {
  const { id } = useParams();
  const { data: productData } = useQuery('getSingleProductInventory', () => {
    return axios.get(`http://localhost:4000/office/inventory-log/${id}`)
  })
  
    return (
      <>
        <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
            {productData?.data[0].product.productName}
          </p>
        </div>

        <div className="mt-12 md:mx-auto md:w-780 drop-shadow-xl ">
          <ProductTable tableData={ productData?.data } />
         </div> 
      </>
    );
}

export default SingleProductInventoryLog