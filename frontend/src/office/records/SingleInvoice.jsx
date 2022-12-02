import React from "react";
import axios from 'axios';
import {useQuery} from 'react-query'
import  InvoiceListingTable from "../records/tables/InvoiceListingTable";
import { useStateContext } from "../../contexts/ContextProvider";

const getInvoice = async ({queryKey}) => {
    
    const result = await axios.get(
      `http://localhost:4000/office/invoice-listing/${queryKey[1]}`
    );

    return result;
}

const SingleInvoice = () => {
   const { invoiceNo } = useStateContext();
    const { data } = useQuery(['singleInvoice', invoiceNo], getInvoice);
 
  return (
    <div className="mt-12 md:mt-auto m-3 md:mx-auto md:w-780 drop-shadow-xl ">
          <InvoiceListingTable listingData={ data } />
    </div>
  );
};

export default SingleInvoice;
