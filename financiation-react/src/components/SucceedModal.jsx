import React from "react";
import '../assets/styles/RowWithCheck.css'
import Check from "../assets/images/checked.gif";
import {Link} from "react-router-dom";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const SucceedModal = (props, {message}) => {
    return (
        <Snackbar open={props.show} autoHideDuration={2500} onClose={props.onClose}>
                <Alert onClose={props.onClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                   {props.message}.
                </Alert>
            </Snackbar>
    )
}

export default SucceedModal