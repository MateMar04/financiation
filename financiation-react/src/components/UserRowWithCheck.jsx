import React, {useContext, useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export const UserRowWithCheck = ({userId}) => {

    let {authTokens} = useContext(AuthContext)
    let [user, setUser] = useState([])

    useEffect(() => {
        getUser()
    }, [])

    let getUser = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch(`/auth/users/${userId}/`, {headers: headers})
        let data = await response.json()
        setUser(data)
    };

    return (
        <Row key={user.id}>
            <Col className='row-label'>
                <Form.Label>{user.first_name} {user.last_name}</Form.Label>
            </Col>
            <Col className='row-check'>
                <Form.Check name="radio" type="checkbox" value={user.id}></Form.Check>
            </Col>
        </Row>
    )
}
