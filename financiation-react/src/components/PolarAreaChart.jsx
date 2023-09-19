import React from "react";
import {PolarArea} from "react-chartjs-2";
import Chart from 'chart.js/auto';

export const PolarAreaChart = ({chartData}) => {
    return (
        <PolarArea data={chartData}></PolarArea>
    )
}

export default PolarAreaChart
