import React from "react";
import {Col, Form, Row} from "react-bootstrap";

export const UserRowWithRadio = ({user}) => {

    return (
        <Row key={user.id}>
            <Col className='row-label'>
                <Form.Label>{user.first_name} {user.last_name}</Form.Label>
            </Col>
            <Col className='row-check'>
                <Form.Check name="radio" type="radio" value={user.id}></Form.Check>
            </Col>
        </Row>
    )
}
