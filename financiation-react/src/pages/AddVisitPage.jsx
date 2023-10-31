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
                    <Row>
                        <Col lg={5}>
                            <p>Localidad:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Localidad"}/>
                        </Col>
                        <Col lg={1}>
                            <Tooltip placement={"right"} title="Agregar Localidad">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Fecha de la Visita:</p>
                        </Col>
                        <Col lg={6}>
                            <DatePicker/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Horario de Jornada:</p>
                        </Col>
                        <Col lg={6}>
                            <RangePicker
                                defaultValue={[dayjs('12:00', dateFormat), dayjs('13:00', dateFormat)]}
                                format={dateFormat}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Colaborador de Finanzas:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Colaborador de Finanzas"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Colaborador de Rentas</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Colaborador de Rentas"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Observaciones: </p>
                        </Col>
                        <Col lg={6}>
                            <TextArea rows={4} placeholder={"Observaciones"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Distancia:</p>
                        </Col>
                        <Col lg={6}>
                            <InputNumber addonAfter="km" placeholder={"Distancia"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Tiempo de Viaje:</p>
                        </Col>
                        <Col lg={6}>
                            <InputNumber addonAfter="min" placeholder={"Tiempo de Viaje"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Lugar:</p>
                        </Col>
                        <Col lg={6}>
                            <Input placeholder="Lugar"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Direccion:</p>
                        </Col>
                        <Col lg={6}>
                            <Input placeholder="Direccion"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Referente Contactado:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Referente Contactado"}/>
                        </Col>
                        <Col lg={1}>
                            <Tooltip placement={"right"} title="Agregar Referente Contactado">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Partido Politico:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Partido Politico"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Intendente:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Intendente"}/>
                        </Col>
                        <Col lg={1}>
                            <Tooltip placement={"right"} title="Agregar Intendente">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Flyer:</p>
                        </Col>
                        <Col lg={6}>
                            <Switch/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Registro Civil:</p>
                        </Col>
                        <Col lg={6}>
                            <Switch/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Hospedaje:</p>
                        </Col>
                        <Col lg={6}>
                            <Switch/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Fondo de Modernizacion:</p>
                        </Col>
                        <Col lg={6}>
                            <Switch/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Acuerdos:</p>
                        </Col>
                        <Col lg={6}>
                            <Select mode="multiple" allowClear placeholder="Acuerdos" defaultValue={['a10', 'c12']}/>
                        </Col>
                        <Col lg={1}>
                            <Tooltip placement={"right"} title="Agregar Acuerdo">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Estado de Visita:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Estado de Visita"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={5}>
                            <p>Grupo Asignado:</p>
                        </Col>
                        <Col lg={6}>
                            <Select placeholder={"Grupo"}/>
                        </Col>
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