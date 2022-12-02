import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { format, parseISO } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const createData = (data) => ([{
//   console.log(data)
//   name: format(parseISO(data.createdAt), 'do'),
//   amount: data.totalAmount
// }])
const createData = (data) => {
  var formattedData = []

  for (var i = 0; i < data.length; i++) {
    formattedData.push({
      name: format(parseISO(data[i].createdAt), "do"),
      amt: data[i].totalAmount,
    });
  }
  return formattedData;
 
}

// const data = [
//   {
//     name: "1st",
//     amt: 24000,
//   },
//   {
//     name: "2nd",
//     amt: 32100,
//   },
//   {
//     name: "3rd",
//     amt: 12900,
//   },
//   {
//     name: "4th",
//     amt: 15000,
//   },
//   {
//     name: "5th",
//     amt: 11810,
//   },
//   {
//     name: "6th",
//     amt: 25000,
//   },
//   {
//     name: "8th",
//     amt: 23100,
//   },
//   {
//     name: "8th",
//     amt: 29100,
//   },
//   {
//     name: "9th",
//     amt: 34100,
//   },
//   {
//     name: "10th",
//     amt: 24100,
//   },
// ];

const BarChartComponent = () => {
  const { data } = useQuery('barchart', () => {
    return axios.get('http://localhost:4000/dashboard/bar');
  })
  
  return (
    <ResponsiveContainer width="100%" aspect={1.5}>
      <BarChart
        width={500}
        height={300}
        data={createData(data ? data.data : [])}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amt" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;