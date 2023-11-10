import React, {useContext, useEffect, useRef, useState} from 'react';
import '../assets/styles/AddVisitPage.css';
import {Col, Container, Row} from 'react-bootstrap';
import {getMayors} from '../services/MayorServices'
import AuthContext from '../context/AuthContext';
import FailedModal from '../components/FailedModal';
import SucceedModal from '../components/SucceedModal';
import MayorCreateModal from '../components/MayorCreateModal';
import MayorModifyModal from '../components/MayorModifyModal';
import LocationCreateModal from '../components/LocationCreateModal'
import AgreementCreateModal from '../components/AgreementCreateModal';
import ContactedReferrerCreateModal from '../components/ContactedReferrerCreateModal';
import {getLocations} from "../services/LocationServices";
import {getVisitStatuses} from "../services/StatusServices";
import {getPoliticParties} from "../services/PoliticPartiesServices";
import {getUsers} from "../services/UserServices";
import {getContactedReferrers} from "../services/ContactedReferrersServices";
import {Button, DatePicker, Form, Input, InputNumber, Select, Switch, TimePicker, Tooltip} from 'antd';
import {PlusCircleOutlined, PlusOutlined, EditOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {getAgreements} from "../services/AgreementServices";
import {getGroups} from "../services/GroupServices";
import {getAddresses} from "../services/AddressServices";

const {TextArea} = Input;

dayjs.extend(customParseFormat);


const EditVisitPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [updateFlag, setUpdateFlag] = useState(false);
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [showcreate, setShowcreate] = useState(false);
    const [showmodify, setShowmodify] = useState(false);
    const [showlocationcreate, setShowLocationCreate] = useState(false);
    const [showagreementcreate, setShowAgreementCreate] = useState(false);
    const [showcontactedreferrercreate, setShowContactedReferrerCreate] = useState(false);
    const toggleModalCreate = () => setShowcreate(!showcreate);
    const toggleModalModify = () => setShowmodify(!showmodify);
    const toggleModalLocationCreate = () => setShowLocationCreate(!showlocationcreate);
    const toggleModalAgreementCreate = () => setShowAgreementCreate(!showagreementcreate);
    const toggleModalContactedReferrerCreate = () => setShowContactedReferrerCreate(!showcontactedreferrercreate);
    const [mayors, setMayors] = useState([])
    const [locations, setLocations] = useState()
    const [visitStatuses, setVisitStatuses] = useState()
    const [politicParties, setPoliticParties] = useState()
    const [users, setUsers] = useState()
    const [contactedReferrers, setContactedReferrers] = useState()
    const [agreements, setAgreements] = useState()
    const [groups, setGroups] = useState();
    const [addresses, setAddresses] = useState()

    const getItemNames = (array) => {
        return array?.map(item => ({
            label: item.name,
            value: item.id
        }));
    }

    const getPersonNames = (array) => {
        return array?.map(item => ({
            label: item.first_name + " " + item.last_name,
            value: item.id
        }));
    }

    const getAddressNames = (array) => {
        return array?.map(item => ({
            label: item.street + " " + item.number,
            value: item.id
        }));
    }

    useEffect(() => {
        getMayors(authTokens.access).then(data => setMayors(data))
        getLocations(authTokens.access).then(data => setLocations(data))
        getVisitStatuses(authTokens.access).then(data => setVisitStatuses(data))
        getPoliticParties(authTokens.access).then(data => setPoliticParties(data))
        getUsers(authTokens.access).then(data => setUsers(data))
        getContactedReferrers(authTokens.access).then(data => setContactedReferrers(data))
        getAgreements(authTokens.access).then(data => setAgreements(data))
        getGroups(authTokens.access).then(data => setGroups(data))
        getAddresses(authTokens.access).then(data => setAddresses(data))
    }, [updateFlag])

    const getTimeFromDate = (date) => {
        let nDate = new Date(date)
        return nDate.getHours() + ":" + nDate.getMinutes() + ":" + nDate.getSeconds()
    }

    let putVisit = async (values) => {
        let response = await fetch('/api/visits', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "accommodation": values.accommodation,
                "address_id": values.address,
                "agreement_id": values.agreements,
                "civil_registration": values.civil_registration,
                "contacted_referrer_id": values.contacted_referrer,
                "distance": values.distance,
                "finance_collaborator_id": values.finance_collaborator,
                "flyer": values.flyer,
                "group_id": values.group,
                "location_id": values.location,
                "mayor_id": values.mayor,
                "modernization_fund": values.modernization_fund,
                "rent_observations": values.observations,
                "place_name": values.place,
                "politic_party_id": values.politic_party,
                "rent_collaborator_id": values.rent_collaborator,
                "travel_time": values.travel_time,
                "visit_date": values.visit_date.toISOString().split('T')[0],
                "start_time": getTimeFromDate(values.visit_time[0]),
                "finish_time": getTimeFromDate(values.visit_time[1]),
                "visit_status_id": values.visit_status
            })
        })
        if (response.status === 200) {
            toggleModalsucceed();
        } else if (response.status === 500) {
            toggleModalfailed();
        } else if (response.status === 401) {
            toggleModalfailed();
        } else if (response.status === 400) {
            toggleModalfailed();
        }
    }


    const onFinish = (values) => {
        console.log(values.accommodation)
        putVisit(values)
    };

    const formRef = useRef(null);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (

        <Container fluid>
            <MayorCreateModal onClose={() => toggleModalCreate()} show={showcreate} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <MayorModifyModal onClose={() => toggleModalModify()} show={showmodify} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <LocationCreateModal onClose={() => toggleModalLocationCreate()} show={showlocationcreate} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <AgreementCreateModal onClose={() => toggleModalAgreementCreate()} show={showagreementcreate} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <ContactedReferrerCreateModal onClose={() => toggleModalContactedReferrerCreate()} show={showcontactedreferrercreate} updateFlag={updateFlag}
                              setUpdateFlag={setUpdateFlag}/>
            <SucceedModal onClose={() => toggleModalsucceed()} message={"la visita"} show={showsuccess}/>
            <FailedModal onClose={() => toggleModalfailed()} message={"La visita no ha sido registrada"} show={showfail}/>

            <h1 className={'h1NuevaVisita'}>Nueva Visita</h1>

            <Form
                {...layout}
                ref={formRef}
                name="control-ref"
                onFinish={onFinish}>


                <Container>

                    <Row className="visit-field-row">
                        <Col className="visit-field">
                            <Form.Item
                                name={"location"}
                                label={"Localidad"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select placeholder={"Localidad"} className="visit-field"
                                        options={getItemNames(locations)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}>
                            <Tooltip placement={"right"} title="Agregar Localidad">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={toggleModalLocationCreate}/>
                            </Tooltip>
                        </Col>
                    </Row>

                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"visit_date"}
                                label={"Fecha de la Visita:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <DatePicker placeholder={"Fecha de la consulta"} className="visit-field"/>
                            </Form.Item>

                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"visit_time"}
                                label={"Jornada de trabajo:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <TimePicker.RangePicker placeholder={["Inicio", "Fin"]} className="visit-field"/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"finance_collaborator"}
                                label={"Colaborador de Finanzas:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Colaborador de Finanzas"}
                                        options={getPersonNames(users)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"rent_collaborator"}
                                label={"Colaborador de Rentas:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Colaborador de Rentas"}
                                        options={getPersonNames(users)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"observations"}
                                label={"Observaciones:"}
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <TextArea className="visit-field" rows={2} placeholder={"Observaciones"}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"distance"}
                                label={"Distancia:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <InputNumber className="visit-field" addonAfter="km" placeholder={"Distancia"}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"travel_time"}
                                label={"Tiempo de Viaje:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <InputNumber className="visit-field" addonAfter="min" placeholder={"Tiempo de Viaje"}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"place"}
                                label={"Lugar:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input className="visit-field" placeholder="Lugar"/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"address"}
                                label={"Direccion:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Referente Contactado"}
                                        options={getAddressNames(addresses)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"contacted_referrer"}
                                label={"Referente Contactado:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Referente Contactado"}
                                        options={getPersonNames(contactedReferrers)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}>
                            <Tooltip placement={"right"} title="Agregar Referente Contactado">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={toggleModalContactedReferrerCreate}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"politic_party"}
                                label={"Partido Politico:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Partido Politico"}
                                        options={getItemNames(politicParties)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"mayor"}
                                label={"Intendente:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Intendente"}
                                        options={getPersonNames(mayors)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}>
                            <Tooltip placement={"right"} title="Agregar Intendente">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={toggleModalCreate}/>
                            </Tooltip>
                            <Tooltip placement={"right"} title="Editar Intendente" >
                                <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={toggleModalModify} className='separarboton'/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"flyer"}
                                label={"Flyer:"}
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"civil_registration"}
                                label={"Registro Civil:"}
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"accommodation"}
                                label={"Hospedaje:"}
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"modernization_fund"}
                                label={"Fondo de Modernizacion:"}
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}>
                                <Switch/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"agreements"}
                                label={"Acuerdos:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" mode="multiple" allowClear placeholder="Acuerdos"
                                        options={getItemNames(agreements)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}>
                            <Tooltip placement={"right"} title="Agregar Acuerdo">
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} onClick={toggleModalAgreementCreate}/>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"visit_status"}
                                label={"Estado de Visita:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>

                                <Select className="visit-field" placeholder={"Estado de Visita"}
                                        options={getItemNames(visitStatuses)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"group"}
                                label={"Grupo encargado:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select className="visit-field" placeholder={"Grupo"}
                                        options={getItemNames(groups)}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={filterOption}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                </Container>


                <Container fluid className={"button-container"}>
                    <Button className={"visit-submit-button primary"} htmlType="submit" type="primary"
                            icon={<PlusCircleOutlined/>}>
                        Crear Visita
                    </Button></Container>


            </Form>
        </Container>

    )
        ;
};
export default EditVisitPage;