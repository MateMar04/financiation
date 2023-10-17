import React from "react";
import '../assets/styles/RowWithCheck.css'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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