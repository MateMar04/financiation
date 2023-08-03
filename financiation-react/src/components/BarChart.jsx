import React from "react";
import {Bar} from "react-chartjs-2";

export const BarChart = ({chartData}) => {
    return (
        <Bar data={chartData}></Bar>
    )
}

export default BarChart
