import React, {useContext, useEffect, useState} from 'react'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import {UserData} from "../components/Data";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import AuthContext from "../context/AuthContext";


const ministryDepartments = []
for (let i = 0; i <= 6; i++) {
    ministryDepartments.push(
        <Row key={i}>
            <Col>
                <Form.Label>Departamento {i}</Form.Label>
            </Col>
            <Col>
                <Form.Check></Form.Check>
            </Col>
        </Row>)
}


const motivos = []
for (let i = 0; i <= 10; i++) {
    motivos.push(
        <Row key={i}>
            <Col>
                <Form.Label>Motivo {i}</Form.Label>
            </Col>
            <Col>
                <Form.Check></Form.Check>
            </Col>
        </Row>)
}

const visitas = []
for (let i = 0; i <= 10; i++) {
    visitas.push(
        <Row key={i}>
            <Col>
                <Form.Label>Visita {i}</Form.Label>
            </Col>
            <Col>
                <Form.Check></Form.Check>
            </Col>
        </Row>)
}


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
    let {authTokens} = useContext(AuthContext)


    useEffect(() => {
        getLocalities()
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
                                        <Row key={locality.id}>
                                            <Col>
                                                <Form.Label>{locality.name}</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Check value={locality.id}></Form.Check>
                                            </Col>
                                        </Row>
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
                                    {ministryDepartments}
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
                                    {motivos}
                                </Form>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={6} className='filters-column'>
                        <Card className='filter-card'>
                            <h1>Visitas</h1>
                            <Container className='card-scroll'>
                                <Form>
                                    {visitas}
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
