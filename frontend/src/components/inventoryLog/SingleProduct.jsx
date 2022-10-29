import React from 'react';
import { ProductTable } from './ProductTable';

const SingleProduct = () => {
    return (
      <>
        <div className="m-3 mt-16 md:mt-4 px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg md:w-400 md:mx-auto">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-center text-gray-800">
            Coaster x 90
          </p>
        </div>

        <div className="mt-12 md:mx-auto md:w-780 drop-shadow-xl ">
          <ProductTable />
         </div> 
      </>
    );
}

export default SingleProduct