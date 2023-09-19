import {Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import '../assets/styles/RowWithCheck.css'
import "../assets/styles/ReportsPage.css"

export const RowWithCheck = ({item}) => {
    return (
        <Row key={item.id} className="labelfondo" >
            <Col className='row-label'>
                <Form.Label>{item.name}</Form.Label>
            </Col>
            <Col className='row-check'>
                <Form.Check id={item.id} value={item.id} defaultChecked={item.checked}></Form.Check>
            </Col>
        </Row>
    )
}

export default RowWithCheck
