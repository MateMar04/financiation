import {Col, Form, Row} from "react-bootstrap";
import React, {useContext} from "react";
import '../assets/styles/RowWithCheck.css'
import {dataHandler} from "../services/RequestServices";

export const RowWithCheck = ({item, tokens}) => {
    return (
        <Row key={item.id}>
            <Col className='row-label'>
                <Form.Label>{item.name}</Form.Label>
            </Col>
            <Col className='row-check'>
                <Form.Check value={item.id} onChange={() => dataHandler(item, tokens)}></Form.Check>
            </Col>
        </Row>
    )
}

export default RowWithCheck
