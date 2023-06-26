import React, {useContext, useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import {UserData} from "../components/Data";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import AuthContext from "../context/AuthContext";
import '../assets/styles/RowWithCheck.css'
import {ReportFilterCard} from "../components/ReportFilterCard";
import {ReportChartCard} from "../components/ReportChartCard";

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
    let [faqs, setFaqs] = useState([])
    let [visits, setVisits] = useState([])
    let {authTokens} = useContext(AuthContext)


    useEffect(() => {
        getLocalities()
        getMinistryDepartments()
        getFaqs()
        getVisits()
    }, [])
    let getLocalities = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/locality/', {headers: headers})
        let data = await response.json()
        setLocalities(data)
    };

    let getMinistryDepartments = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/ministry-department/', {headers: headers})
        let data = await response.json()
        setMinistryDepartments(data)
    };

    let getFaqs = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/faq/', {headers: headers})
        let data = await response.json()
        setFaqs(data)
    };


    let getVisits = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/visit/', {headers: headers})
        let data = await response.json()
        setVisits(data)
    };


    return (
        <Container fluid>
            <Container fluid>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Localidades" items={localities}/>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Departamentos" items={ministryDepartments}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Motivos" items={faqs}/>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <ReportFilterCard title="Visitas" items={visits}/>
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
