import {Col, Form, Row} from "react-bootstrap";
import React from "react";

export const RowWithCheck = ({item}) => {
    return (
        <Row key={item.id}>
            <Col>
                <Form.Label>{item.name}</Form.Label>
            </Col>
            <Col>
                <Form.Check value={item.id}></Form.Check>
            </Col>
        </Row>
    )
}

export default RowWithCheck
