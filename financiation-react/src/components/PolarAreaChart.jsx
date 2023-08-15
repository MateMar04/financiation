import React from "react";
import {PolarArea} from "react-chartjs-2";

export const PolarAreaChart = ({chartData}) => {
    return (
        <PolarArea data={chartData}></PolarArea>
    )
}

export default PolarAreaChart
