import React, {useContext, useEffect, useState} from "react";
import {Container} from 'react-bootstrap';
import '../assets/styles/CalendarPage.css'
import locale from 'antd/locale/es_ES';
import 'dayjs/locale/es';
import {Badge, Calendar, ConfigProvider, Modal} from 'antd';
import {getVisits} from "../services/VisitServices";
import AuthContext from "../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import LoadingModal from "../components/LoadingModal";

export const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [visits, setVisits] = useState([]);
    const {authTokens} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showloading, setShowloading] = useState(false);

    let [loading, setLoading] = useState(true)

    const showModal = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        navigate('/visits/add/');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setShowloading(true);

        getVisits(authTokens.access)
          .then((data) => {
            setVisits(data);
          })
          .finally(() => {
            setShowloading(false);
          });
      }, []);


    let getDayVisits = (date) => {
        return visits.filter(v => {
            let d = new Date(v.visit_date + "T" + v.start_time + "-03:00");
            return d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getYear() === date.getYear();
        }).map(v => {
                switch (v.visit_status_id) {
                    case 1:
                        v.status = "error"
                        break;
                    case 4:
                        v.status = "success"
                        break;
                    default:
                        v.status = "warning"
                        break;
                }
                return v;
            }
        );
    }


    function isWeekend(date) {
        const dayOfWeek = new Date(date).getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    }

    return (
        <Container fluid>
            <ConfigProvider locale={locale}>
                <Calendar className={'CalendarCalendarPage'} onSelect={showModal}

                          dateCellRender={(date) => {
                              let day = new Date(date)
                              let visits = getDayVisits(day)
                              return visits?.map((v, i) => <Badge key={i} status={v.status} text={v.name}/>)
                          }}

                          monthCellRender={(date) => {
                              if (new Date(date).getMonth() === new Date().getMonth()) {
                                  return <h5>visitas: 2</h5>;
                              }
                          }}

                />
            </ConfigProvider>

            <Modal title="Agregar Visita" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {selectedDate && <p>¿Quiere agregar una visita para el día {selectedDate.format('DD/MM/YYYY')}?</p>}
            </Modal>
            <Container>
                <LoadingModal message="cargando" show={showloading}/>
            </Container>
        </Container>

    );
};
