import React from "react";
import {Pie} from "react-chartjs-2";
import Chart from 'chart.js/auto';

export const PieChart = ({chartData}) => {
    return (
        <Pie data={chartData}></Pie>
    )
}

export default PieChart
