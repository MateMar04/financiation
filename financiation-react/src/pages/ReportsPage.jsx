import React, {useState} from 'react'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import BarChart from "../components/BarChart";
import {UserData} from "../components/Data";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";


const localities = []
for (let i = 0; i <= 30; i++) {
    localities.push(
        <Row key={i}>
            <Col>
                <Form.Label>Ciudad {i}</Form.Label>
            </Col>
            <Col>
                <Form.Check></Form.Check>
            </Col>
        </Row>)
}

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


    return (
        <Container fluid>
            <Row className='filters'>
                <Col lg={6} className='filters'>
                    <Card className='filter-card'>
                        <h5>Selecciona Localidades</h5>
                        <Form className='scroll'>
                            {localities}
                        </Form>
                    </Card>
                    <Card className='filter-card'>
                        <h5>Departamentos</h5>
                        <Form className='scroll'>
                            {ministryDepartments}
                        </Form>
                    </Card>
                </Col>
                <Col lg={6} className='filters'>
                    <Card className='filter-card'>
                        <h5>Motivos</h5>
                        <Form className='scroll'>
                            {motivos}
                        </Form>
                    </Card>
                    <Card className='filter-card'>
                        <h5>Visitas</h5>
                        <Form className='scroll'>
                            {visitas}
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Container className='charts-container'>
                    <Row className='charts-row'>
                        <Col lg={6} className='inner-charts-column'>
                            <Card className='chart-card'>
                                <BarChart chartData={data}>
                                </BarChart>
                            </Card>
                            <Card className='chart-card'>
                                <PieChart chartData={data}>
                                </PieChart>
                            </Card>
                        </Col>
                        <Col lg={6} className='inner-charts-column'>
                            <Card className='chart-card'>
                                <PolarAreaChart chartData={data}>
                                </PolarAreaChart>
                            </Card>
                            <Card className='chart-card'>
                                <LineChart chartData={data}>
                                </LineChart>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}

export default ReportsPage
