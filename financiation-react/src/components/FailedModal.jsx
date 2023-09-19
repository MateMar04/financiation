import React from "react";
import '../assets/styles/RowWithCheck.css'
import { Link } from "react-router-dom";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';


export const FailedModal = (props, { message }) => {
    return (

        <Snackbar open={ props.show } autoHideDuration={5000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Ha ocurrido un error {message}
            </Alert>
        </Snackbar>


    )
}

export default FailedModal