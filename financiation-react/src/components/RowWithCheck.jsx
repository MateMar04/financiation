import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import '../assets/styles/RowWithCheck.css'

export const RowWithCheck = ({item}) => {
    return (
        <Row key={item.id}>
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
