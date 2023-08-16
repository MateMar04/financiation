import React, {useContext, useEffect, useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import {UserData} from "../components/Data";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import AuthContext from "../context/AuthContext";
import '../assets/styles/RowWithCheck.css'
import {ReportFilterCard} from "../components/ReportFilterCard";
import {ReportChartCard} from "../components/ReportChartCard";
import {getLocations} from "../services/LocationServices";
import {getMinistryDepartments} from "../services/MinistryDepartmentServices";
import ReportsContext from "../context/ReportsContext";

export const ReportsPage = () => {


    const [data, setData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            label: "Pepe",
            data: UserData.map((data) => data.userGain),
            backgroundColor: ["#22AED1", "#688E26", "#DE541E", "#820933", "#F7A072"]
        }]
    })

    let [localities, setLocalities] = useState([])
    let [ministryDepartments, setMinistryDepartments] = useState([])
    let {authTokens} = useContext(AuthContext)

    let {visits, faqs} = useContext(ReportsContext)


    useEffect(() => {
        getLocations(authTokens.access).then(r => setLocalities(r))
        getMinistryDepartments(authTokens.access).then(r => setMinistryDepartments(r))
    }, [])

    return (
        <Container fluid>
            <Container fluid>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Localidades" items={localities} tokens={authTokens.access}/>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Departamentos" items={ministryDepartments} tokens={authTokens.access}/>
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
                        <ReportChartCard title="Motivos" chart={<PieChart chartData={data}/>}/>
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
