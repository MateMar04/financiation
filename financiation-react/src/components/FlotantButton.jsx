import React from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../assets/styles/GroupsPage.css'



export const FlotantButton = ({name}) => {
    return (
        <Fab
            variant="extended"
            size='medium'
            className="BtnFlotante"
            color="primary"
        >
            <AddIcon />
            {name}
        </Fab>
    )
}

export default FlotantButton