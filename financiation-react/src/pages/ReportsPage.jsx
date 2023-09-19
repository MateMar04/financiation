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
        getMinistryDepartmentsForFilter,
        getLocationsForFilter,

        advisorsData,
        ministryDepsData,
        faqsData,
        visitsData,

        generateReports
    } = useContext(ReportsContext)


    useEffect(() => {
        getLocationsForFilter(authTokens.access).then(r => setLocalities(r))
        getMinistryDepartmentsForFilter(authTokens.access).then(r => setMinistryDepartments(r))
    }, [])

    const buttonClick = async () => {
        await generateReports()
    };

    return (
        <Container fluid>
            <h1 className='titulo1'>Reportes</h1>
            <Container  className='container-white'>
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
                <Row className='justify-content-center text-center'>
                    <Col lg={2}>
                        <Button  onClick={() => buttonClick()} className='BtnGenera'>Generar gráfico</Button>
                    </Col>
                </Row>
            </Container>

            

            <Container className='container1 container-white'>
                <Row className='justify-content-center text-center'>
                    <Col lg={6} >
                        <ReportChartCard title="Visitas" chart={<BarChart chartData={visitsData}/>}/>
                    </Col>
                    <Col lg={6} >
                        <ReportChartCard title="Organismos" chart={<BarChart chartData={ministryDepsData}/>}/>
                    </Col>
                </Row>
                <Row className='justify-content-center text-center'>
                    <Col lg={6} >
                        <ReportChartCard title="Motivos" chart={<PieChart chartData={faqsData}/>}/>
                    </Col>
                    <Col lg={6} >
                        <ReportChartCard title="Asesores" chart={<PolarAreaChart chartData={advisorsData}/>}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default ReportsPage
