import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/styles/AddVisitPage.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {getMayors} from '../services/MayorServices'
import AuthContext from '../context/AuthContext';
import FailedModal from '../components/FailedModal';
import SucceedModal from '../components/SucceedModal';
import MayorCreateModal from '../components/MayorCreateModal';
import MayorModifyModal from '../components/MayorModifyModal';
import {getLocations} from "../services/LocationServices";
import {getVisitStatuses} from "../services/StatusServices";
import {getPoliticParties} from "../services/PoliticPartiesServices";
import {getUsers} from "../services/UserServices";
import {getContactedReferrers} from "../services/ContactedReferrersServices";
import {Button, DatePicker, Input, InputNumber, Select, Switch, Tooltip} from 'antd';
import {PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const {TextArea} = Input;

dayjs.extend(customParseFormat);

const {RangePicker} = DatePicker;
const dateFormat = 'hh:mm';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';


const AddVisitPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [updateFlag, setUpdateFlag] = useState(false);
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [showcreate, setShowcreate] = useState(false);
    const [showmodify, setShowmodify] = useState(false);
    const toggleModalCreate = () => setShowcreate(!showcreate);
    const toggleModalModify = () => setShowmodify(!showmodify);
    const [mayors, setMayors] = useState([])
    const [locations, setLocations] = useState()
    const [visitStatuses, setVisitStatuses] = useState()
    const [politicParties, setPoliticParties] = useState()
    const [users, setUsers] = useState()
    const [contactedReferrers, setContactedReferrers] = useState()

    useEffect(() => {
        getMayors(authTokens.access).then(data => setMayors(data))
        getLocations(authTokens.access).then(data => setLocations(data))
        getVisitStatuses(authTokens.access).then(data => setVisitStatuses(data))
        getPoliticParties(authTokens.access).then(data => setPoliticParties(data))
        getUsers(authTokens.access).then(data => setUsers(data))
        getContactedReferrers(authTokens.access).then(data => setContactedReferrers(data))
    }, [updateFlag])

    let postVisit = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/visits', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "flyer": e.target.flyer.value,
                "distance": e.target.distance.value,
                "travel_time": e.target.travel_time.value,
                "visit_date": e.target.visit_date.value,
                "civil_registration": e.target.civil_registration.value,
                "accommodation": e.target.accommodation.value,
                "modernization_fund": e.target.modernization_fund.value,
                "start_time": e.target.start_time.value,
                "finish_time": e.target.finish_time.value,
                "place_name": e.target.place_name.value,
                "id_locality": e.target.id_locality.value,
                "id_group": e.target.id_group.value,
                "id_visit_status": e.target.id_visit_status.value,
                "id_agreement": e.target.id_agreement.value,
                "id_contacted_referrer": e.target.id_contacted_referrer.value,
                "id_address": e.target.id_address.value,
                "id_logo": e.target.id_logo.value
            })
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postVisit()
        } else if (response.status === 500) {
            toggleModalfailed();
            await postVisit()
        } else if (response.status === 401) {
            toggleModalfailed();
            await postVisit()
        } else if (response.status === 400) {
            toggleModalfailed();
            await postVisit()
        }
    }

    const carouselRef = useRef(null);

    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };

    return (

        <Container fluid>
            <MayorCreateModal onClose={() => toggleModalCreate()} show={showcreate} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <MayorModifyModal onClose={() => toggleModalModify()} show={showmodify} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <SucceedModal onClose={() => toggleModalsucceed()} message={"la visita"} show={showsuccess}/>
            <FailedModal onClose={() => toggleModalfailed()} message={"la visita"} show={showfail}/>

            <h1 className={'h1NuevaVisita'}>Nueva Visita</h1>

            <Form>
                <Container>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Localidad:</p>
                        </Col>
                        <Col className="visit-field">
                            <Select placeholder={"Localidad"} className="visit-field"/>
                        </Col>
                        <Col lg={2}>
                            <Tooltip placement={"right"} title="Agregar Localidad">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Fecha de la Visita:</p>
                        </Col>
                        <Col>
                            <DatePicker className="visit-field"/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Horario de Jornada:</p>
                        </Col>
                        <Col>
                            <RangePicker className="visit-field"
                                         defaultValue={[dayjs('12:00', dateFormat), dayjs('13:00', dateFormat)]}
                                         format={dateFormat}
                            />
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Colaborador de Finanzas:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Colaborador de Finanzas"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Colaborador de Rentas</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Colaborador de Rentas"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Observaciones: </p>
                        </Col>
                        <Col>
                            <TextArea className="visit-field" rows={4} placeholder={"Observaciones"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Distancia:</p>
                        </Col>
                        <Col>
                            <InputNumber className="visit-field" addonAfter="km" placeholder={"Distancia"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Tiempo de Viaje:</p>
                        </Col>
                        <Col>
                            <InputNumber className="visit-field" addonAfter="min" placeholder={"Tiempo de Viaje"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Lugar:</p>
                        </Col>
                        <Col>
                            <Input className="visit-field" placeholder="Lugar"/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Direccion:</p>
                        </Col>
                        <Col>
                            <Input className="visit-field" placeholder="Direccion"/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Referente Contactado:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Referente Contactado"}/>
                        </Col>
                        <Col lg={2}>
                            <Tooltip placement={"right"} title="Agregar Referente Contactado">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Partido Politico:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Partido Politico"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Intendente:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Intendente"}/>
                        </Col>
                        <Col lg={2}>
                            <Tooltip placement={"right"} title="Agregar Intendente">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Flyer:</p>
                        </Col>
                        <Col>
                            <Switch/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Registro Civil:</p>
                        </Col>
                        <Col>
                            <Switch/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Hospedaje:</p>
                        </Col>
                        <Col>
                            <Switch/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Fondo de Modernizacion:</p>
                        </Col>
                        <Col>
                            <Switch/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Acuerdos:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" mode="multiple" allowClear placeholder="Acuerdos" defaultValue={['a10', 'c12']}/>
                        </Col>
                        <Col lg={2}>
                            <Tooltip placement={"right"} title="Agregar Acuerdo">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Estado de Visita:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Estado de Visita"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col lg={2} className="visit-field-title">
                            <p>Grupo Asignado:</p>
                        </Col>
                        <Col>
                            <Select className="visit-field" placeholder={"Grupo"}/>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                </Container>


                <Button type="primary" icon={<PlusCircleOutlined/>}>
                    Crear Visita
                </Button>


            </Form>
        </Container>

    )
        ;
};
export default AddVisitPage;