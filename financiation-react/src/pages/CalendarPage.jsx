import React, {useContext, useState} from "react";
import {Container, Col, Row} from 'react-bootstrap';
import '../assets/styles/CalendarPage.css';
import type {Dayjs} from 'dayjs';
import type {CalendarProps} from 'antd';
import { Calendar } from "antd";
import esES from "antd/lib/locale/es_ES"; // Importa el idioma español

export const CalendarPage = () => {

    return (
            <Calendar locale={esES}/>
    )

}