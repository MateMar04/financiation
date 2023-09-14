import {Card} from "react-bootstrap";
import React from "react";
import "../assets/styles/ReportsPage.css"

export const ReportChartCard = ({title, chart}) => {
    return (
        <Card className='chart-card'>
            <h1>{title}</h1>
            {chart}
        </Card>
    )
}
