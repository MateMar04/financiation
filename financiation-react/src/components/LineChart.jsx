import React from "react";
import {Line} from "react-chartjs-2";

export const LineChart = ({chartData}) => {
    return (
        <Line data={chartData}></Line>
    )
}

export default LineChart
