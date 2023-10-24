import React from "react";
import '../assets/styles/RowWithCheck.css'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export const SucceedModal = (props, {message}) => {
    return (
        <Snackbar open={ props.show } autoHideDuration={5000} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Se registro {message} correctamente
            </Alert>
        </Snackbar>
    )
}

export default SucceedModal