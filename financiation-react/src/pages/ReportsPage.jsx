import React, {useState} from 'react'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import "../assets/styles/ReportsPage.css"
import BarChart from "../components/BarChart";
import {UserData} from "../components/Data";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";


const rows = []
for (let i = 0; i <= 30; i++) {
    rows.push(
        <Row key={i}>
            <Col lg={6}>
                <Form.Label>Ciudad {i}</Form.Label>
            </Col>
            <Col lg={6}>
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
                <Col lg='4'>
                    <Container className='localities-scroll'>
                        <h1 className='title'>Selecciona Localidad</h1>
                        <Form>
                            {rows}
                        </Form>
                    </Container>
                </Col>
                <Col lg='8' className='charts'>
                    <Container className='green'>
                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <BarChart chartData={data}>
                                    </BarChart>
                                </Card>
                                <Card>
                                    <PieChart chartData={data}>
                                    </PieChart>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <PolarAreaChart chartData={data}>
                                    </PolarAreaChart>
                                </Card>
                                <Card>
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
