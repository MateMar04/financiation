import React from 'react';
import {Button} from 'react-bootstrap';
import IconButton from "@mui/material/IconButton";
import {NavigateNext} from "@mui/icons-material";
import {NavigateBefore} from "@mui/icons-material";

const CarouselButtons = ({prev, next}) => {
    return (
        <div className="carousel-buttons">
            <IconButton onClick={prev} variant="dark" className="carousel-button">
                <NavigateBefore/>
            </IconButton>
            <IconButton onClick={next} variant="dark" className="carousel-button">
                <NavigateNext/>
            </IconButton>
        </div>
    );
};

export default CarouselButtons;
