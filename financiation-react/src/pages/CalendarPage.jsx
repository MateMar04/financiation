import React, {useContext, useEffect, useState} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import '../assets/styles/CalendarPage.css'
import locale from 'antd/locale/es_ES';
import Dayjs from 'dayjs';
import 'dayjs/locale/es';
import {ConfigProvider} from 'antd';
import {Badge, Calendar} from 'antd';
import {getVisits} from "../services/VisitServices";
import AuthContext from "../context/AuthContext";
import {Modal} from 'antd';
import {useNavigate} from 'react-router-dom';


const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 11:
            listData = [
                {type: 'success', content: 'Visita a EL DURAZNO'},
            ];
            break;
        case 15:
            listData = [
                {type: 'error', content: 'Visita cancelada'},
            ];
            break;
        default:
    }
    return listData || [];
};

export const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [visits, setVisits] = useState([]);
    const {authTokens} = useContext(AuthContext);
    const navigate = useNavigate();

    const showModal = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/visit/add');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getVisits(authTokens.access).then(data => setVisits(data));
    }, []);


    function isWeekend(date) {
        const dayOfWeek = new Date(date).getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    }

    return (
        <Container fluid>
            <ConfigProvider locale={locale}>
                <Calendar className={'CalendarCalendarPage'} onSelect={showModal}
                          disabledDate={(date) => isWeekend(date)}
                          dateCellRender={(date) => {
                              if (new Date(date).getDate() === new Date().getDate()){
                                  return <h5>Visita</h5>;}
                          }}

                          monthCellRender={(date) =>{
                               if (new Date(date).getMonth() === new Date().getMonth()){
                                  return <h5>visitas: 2</h5>;}
                          }}

                />
            </ConfigProvider>

            <Modal title="Agregar Visita" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {selectedDate && <p>¿Quiere agregar una visita para el día {selectedDate.format('DD/MM/YYYY')}?</p>}
            </Modal>
        </Container>

    );
};
