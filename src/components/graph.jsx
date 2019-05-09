import React, { Fragment } from "react";
import "../App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Graph = ({ filteredChartData }) => {
  return (
    <Fragment>
      <LineChart width={600} height={400} data={filteredChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Fragment>
  );
};

export default Graph;
