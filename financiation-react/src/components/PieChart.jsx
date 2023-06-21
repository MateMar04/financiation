import React from "react";
import {Pie} from "react-chartjs-2";

export const PieChart = ({chartData}) => {
    return (
        <Pie data={chartData}></Pie>
    )
}

export default PieChart
