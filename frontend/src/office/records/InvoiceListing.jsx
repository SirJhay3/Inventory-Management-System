import React, { useState } from "react";
import { format, parseISO } from 'date-fns'
// import { Routes, Route } from 'react-router-dom';
import DatePicker from "react-datepicker";
import {useQuery} from 'react-query';
import axios from "axios";
// import { IndividualReturn } from '../../components/components';
import { useNavigate } from "react-router-dom";


const getInvoices = async () => {
  const invoices = await axios.get('/office/invoice-listing');
  return invoices;
}

const InvoiceListing = () => {
  const navigate = useNavigate();
  const { data } = useQuery('allInvoices', getInvoices);
  // console.log(data)
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="m-4 mt-20 md:mt-12 md:flex  justify-center gap-3">
      {/* log section */}
      <div>
        <div className="w-56 mb-4 mx-auto">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            className="p-1 shadow"
            placeholderText="I have been cleared!"
          />
        </div>

        <div className="m-3 mt-8 md:w-760 md:mx-auto">
          <div className="px-4 md:px-10 py-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Invoice Listing
            </p>
          </div>

          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-bold text-left pl-4">Date</th>
                  <th className="font-bold text-left pl-4">Invoice No</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {data?.data.map((data) => {
                  return (
                    <tr
                      key={data._id}
                      onClick={() =>
                        navigate(`/office/invoice-listing/${data.invoiceNo}`)
                      }
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <p className="font-medium">
                          {format(parseISO(data.createdAt), "MM/dd/yyyy")}
                        </p>
                      </td>

                      <td className="pl-4 cursor-pointer">
                        <p className="font-medium">{data.invoiceNo}</p>
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Routes>
        <Route path=":id" element={<IndividualReturn />} />
      </Routes> */}
    </div>
  );
};

export default InvoiceListing;
