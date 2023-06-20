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
            <Row>
                <Col lg='4' className='localities-scroll'>
                    <Container className='scroll'>
                        <h5 className='title'>Selecciona Localidades</h5>
                        <Form>
                            {localities}
                        </Form>
                    </Container>
                    <hr/>
                    <Container className='scroll'>
                        <Form>
                            <h5>Departamentos</h5>
                            {ministryDepartments}
                        </Form>
                    </Container>
                    <hr/>
                    <Container className='scroll'>
                        <Form>
                            <h5>Motivos</h5>
                            {motivos}
                        </Form>
                    </Container>
                    <hr/>
                    <Container className='scroll'>
                        <Form>
                            <h5>Visitas</h5>
                            {visitas}
                        </Form>
                    </Container>
                </Col>
                <Col lg='8' className='charts-column'>
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
                </Col>
            </Row>
        </Container>
    )
}

export default ReportsPage
