import React from "react";
import "../assets/styles/VerMasButton.css"
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Button from '@mui/material/Button';


export const VerMasButton = () => {
    return (
        <Button endIcon={<LibraryAddOutlinedIcon />} className={'ver-mas-button'}>
            Ver más
        </Button>

    )
}

export default VerMasButton;
