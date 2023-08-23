import React, {useContext, useState} from 'react';
import "../assets/styles/AddVisitPage.css";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import TextField from '@mui/material/TextField';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import ImageIcon from '@mui/icons-material/Image';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import TourIcon from '@mui/icons-material/Tour';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DirectionsIcon from '@mui/icons-material/Directions';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";



       <Container>


                        <ImageIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Inserte el ID del Flyer" variant="standard"
                                   name="flyer"
                                   type="number" required/>


                        <BrandingWatermarkIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="ID del logo" variant="standard"
                                   name="id_logo"
                                   type="text" required/>




                        <LocalAtmIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="input-with-sx" label="Fondo de modernizacion int"
                                   variant="standard"
                                   name="modernization_fund" type="text" required/>

                    </Container>
                    <hr/>



        <GroupIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        <TextField id="input-with-sx" label="ID del grupo" variant="standard"
                   name="id_group"
                   type="text" required/>

        <TourIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        <TextField id="input-with-sx" label="ID del Estado de visita" variant="standard"
                   name="id_visit_status" type="text" required/>



        <HandshakeIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        <TextField id="input-with-sx" label="ID del acuerdo" variant="standard"
                   name="id_agreement"
                   type="text" required/>




        <ContactMailIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
        <TextField id="input-with-sx" label="ID del contacto del referido"
                   variant="standard"
                   name="id_contacted_referrer" type="text" required/>

