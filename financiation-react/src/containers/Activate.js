import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {verify} from "../actions/auth";
import '../assets/styles/login.css'
import {Navigate, useParams} from "react-router-dom";

const Activate = ({verify}) => {
    const {uid} = useParams();
    const {token} = useParams();
    const [verified, setVerified] = useState(false)
    const verify_account = e => {
        verify(uid, token);
        setVerified(true)
    };

    if (verified) {
        return <Navigate to='/'/>
    }

    return (
        <Container fluid>
            <h1>Verify your account</h1>
            <Button onClick={verify_account}>Verify</Button>
        </Container>
    )
};


export default connect(null, {verify})(Activate);