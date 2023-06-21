import React, {useContext, useEffect, useState} from 'react'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import {UserData} from "../components/Data";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import AuthContext from "../context/AuthContext";
import RowWithCheck from "../components/RowWithCheck";
import '../assets/styles/RowWithCheck.css'

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
        console.log(data)
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
        console.log(data)
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
        console.log(data)
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
        console.log(data)
        setVisits(data)
    };


    return (
        <Container fluid>
            <Container fluid className='filters'>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <Card className='filter-card'>
                            <h1>Localidades</h1>
                            <Container className='card-scroll'>
                                <Form>
                                    {localities.map((locality) => (
                                        <RowWithCheck item={locality}></RowWithCheck>
                                    ))}
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <Card className='filter-card'>
                            <h1>Departamentos</h1>
                            <Container className='card-scroll'>
                                <Form>
                                    {ministryDepartments.map((ministryDepartment) => (
                                        <RowWithCheck item={ministryDepartment}></RowWithCheck>
                                    ))}
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='filters-column'>
                        <Card className='filter-card'>
                            <h1>Motivos</h1>
                            <Container className='card-scroll'>
                                <Form>
                                    {faqs.map((faq) => (
                                        <RowWithCheck item={faq}></RowWithCheck>
                                    ))}
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <Card className='filter-card'>
                            <h1>Visitas</h1>
                            <Container className='card-scroll'>
                                <Form>
                                    {visits.map((visit) => (
                                        <Row key={visit.id}>
                                            <Col className='row-label'>
                                                <Form.Label>{visit.id_locality} {visit.visit_date}</Form.Label>
                                            </Col>
                                            <Col className='row-check'>
                                                <Form.Check value={visit.id}></Form.Check>
                                            </Col>
                                        </Row>
                                    ))}
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <hr/>

            <Container fluid>
                <Row>
                    <Col lg={6} className='chart-column'>
                        <Card className='chart-card'>
                            <h1>Ciudades</h1>
                            <BarChart chartData={data}/>
                        </Card>
                    </Col>
                    <Col lg={6} className='chart-column'>
                        <Card className='chart-card'>
                            <h1>Organismos</h1>
                            <BarChart chartData={data}/>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className='chart-column'>
                        <Card className='chart-card'>
                            <h1>Motivos</h1>
                            <PieChart chartData={data}/>
                        </Card>
                    </Col>
                    <Col lg={6} className='chart-column'>
                        <Card>
                            <h1>Asesores</h1>
                            <PolarAreaChart chartData={data}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}

export default ReportsPage
