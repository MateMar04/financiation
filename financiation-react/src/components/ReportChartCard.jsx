import {Card} from "react-bootstrap";
import React from "react";

export const ReportChartCard = ({title, chart}) => {
    return (
        <Card className='chart-card'>
            <h1>{title}</h1>
            {chart}
        </Card>
    )
}
