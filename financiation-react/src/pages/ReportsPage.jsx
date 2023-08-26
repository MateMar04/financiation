import React, {useContext, useEffect, useState} from 'react'
import {Button, Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import AuthContext from "../context/AuthContext";
import '../assets/styles/RowWithCheck.css'
import {ReportFilterCard} from "../components/ReportFilterCard";
import {ReportChartCard} from "../components/ReportChartCard";
import ReportsContext from "../context/ReportsContext";


export const ReportsPage = () => {


    let [localities, setLocalities] = useState([])
    let [ministryDepartments, setMinistryDepartments] = useState([])
    let {authTokens} = useContext(AuthContext)

    let {
        visits,
        faqs,
        data,
        getMinistryDepartmentsForFilter,
        getLocationsForFilter,
        totalData,
        totalRequestsByMinistryDepartments,
        generateReports
    } = useContext(ReportsContext)


    useEffect(() => {
        getLocationsForFilter(authTokens.access).then(r => setLocalities(r))
        getMinistryDepartmentsForFilter(authTokens.access).then(r => setMinistryDepartments(r))
    }, [])

    const buttonClick = async () => {
        console.log("Hasta aca");
        await generateReports()
    };

    return (
        <Container fluid>
            <Container fluid>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Localidades" items={localities} tokens={authTokens.access}/>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Departamentos" items={ministryDepartments}
                                          tokens={authTokens.access}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Visitas" items={Object.values(visits)} tokens={authTokens.access}/>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Motivos" items={Object.values(faqs)} tokens={authTokens.access}/>
                    </Col>
                </Row>
            </Container>
            <Button onClick={buttonClick}>Generar</Button>
            <Button onClick={() => console.log(totalData)}>SHOW</Button>

            <hr/>

            <Container fluid>
                <Row>
                    <Col lg={6} className='chart-column'>
                        <ReportChartCard title="Ciudades" chart={<BarChart chartData={data}/>}/>
                    </Col>
                    <Col lg={6} className='chart-column'>
                        <ReportChartCard title="Organismos" chart={<BarChart chartData={data}/>}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='chart-column'>
                        <ReportChartCard title="Motivos" chart={<PieChart chartData={totalData}/>}/>
                    </Col>
                    <Col lg={6} className='chart-column'>
                        <ReportChartCard title="Asesores" chart={<PolarAreaChart chartData={data}/>}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default ReportsPage
