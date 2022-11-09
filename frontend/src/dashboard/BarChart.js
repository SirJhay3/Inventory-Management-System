import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "1st",
    amt: 24000,
  },
  {
    name: "2nd",
    amt: 32100,
  },
  {
    name: "3rd",
    amt: 12900,
  },
  {
    name: "4th",
    amt: 15000,
  },
  {
    name: "5th",
    amt: 11810,
  },
  {
    name: "6th",
    amt: 25000,
  },
  {
    name: "8th",
    amt: 23100,
  },
  {
    name: "8th",
    amt: 29100,
  },
  {
    name: "9th",
    amt: 34100,
  },
  {
    name: "10th",
    amt: 24100,
  },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" aspect={1.5}>
      <BarChart
        width={500}
        height={300}
        data={data}
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