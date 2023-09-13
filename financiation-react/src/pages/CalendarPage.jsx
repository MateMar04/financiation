import React, {useContext, useEffect, useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import '../assets/styles/CalendarPage.css'
import locale from 'antd/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import {ConfigProvider} from 'antd';
import {Badge, Calendar} from 'antd';
import {getVisits} from "../services/VisitServices";
import AuthContext from "../context/AuthContext";

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {type: 'warning', content: 'This is warning event.'},
                {type: 'success', content: 'This is usual event.'},
            ];
            break;
        case 10:
            listData = [
                {type: 'warning', content: 'This is warning event.'},
                {type: 'success', content: 'This is usual event.'},
                {type: 'error', content: 'This is error event.'},
            ];
            break;
        case 15:
            listData = [
                {type: 'warning', content: 'This is warning event'},
                {type: 'success', content: 'This is very long usual event......'},
                {type: 'error', content: 'This is error event 1.'},
                {type: 'error', content: 'This is error event 2.'},
                {type: 'error', content: 'This is error event 3.'},
                {type: 'error', content: 'This is error event 4.'},
            ];
            break;
        default:
    }
    return listData || [];
};
export const CalendarPage = () => {
     let [visits, setVisits] = useState([])
    let {authTokens, myUser} = useContext(AuthContext)

     useEffect(() => {

        getVisits(authTokens.access).then(data => setVisits(data))


    }, [])
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    return (
        <Container fluid>
            <ConfigProvider locale={locale}>
                <Calendar className={'CalendarCalendarPage'} cellRender={cellRender}/>

            </ConfigProvider>;
        </Container>

    );
};
