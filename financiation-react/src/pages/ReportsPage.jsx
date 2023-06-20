import React, {useState} from 'react'
import {Col, Container, Form, Row} from "react-bootstrap";
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
                    <Container className='red'>
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
                                <BarChart chartData={data}>
                                </BarChart>
                            </Col>
                            <Col lg={6}>
                                <PolarAreaChart chartData={data}>
                                </PolarAreaChart>
                            </Col>
                        </Row>
                    </Container>
                    <Container className='yellow'>
                        <Row>
                            <Col lg={6}>
                                <PieChart chartData={data}>
                                </PieChart>
                            </Col>
                            <Col lg={6}>
                                <LineChart chartData={data}>
                                </LineChart>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default ReportsPage
