import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import "../assets/styles/VerMasButton.css"
import { IconButton } from "@mui/material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Button from '@mui/material/Button';


export const VerMasButton = () => {
    return (
        <Button endIcon={<LibraryAddOutlinedIcon />} size="small">
            Ver mas
        </Button>

    )
}

export default VerMasButton;
