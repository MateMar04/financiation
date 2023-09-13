import React from "react";
import {Calendar} from "antd";
import {Container, Row, Col} from 'react-bootstrap';
import '../assets/styles/CalendarPage.css'
import locale from 'antd/locale/es_ES';
import dayjs from 'dayjs';

import 'dayjs/locale/es';
import { ConfigProvider } from 'antd';

export const CalendarPage = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format("DD-MM-YYYY"), mode);
    };

    return (
        <Container fluid>
            <ConfigProvider locale={locale}>
            <Calendar className={'CalendarCalendarPage'}/>
                </ConfigProvider>;
        </Container>

    );
};
