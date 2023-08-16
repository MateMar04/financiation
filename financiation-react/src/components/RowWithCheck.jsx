import {Col, Form, Row} from "react-bootstrap";
import React, {useContext} from "react";
import '../assets/styles/RowWithCheck.css'
import ReportsContext from "../context/ReportsContext";

export const RowWithCheck = ({item, tokens}) => {

    let {dataHandler} = useContext(ReportsContext)

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
