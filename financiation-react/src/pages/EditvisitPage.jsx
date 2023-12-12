import React, { useContext, useEffect, useRef, useState } from 'react';
import '../assets/styles/AddVisitPage.css';
import { Col, Container, Row } from 'react-bootstrap';
import { getMayors } from '../services/MayorServices'
import AuthContext from '../context/AuthContext';
import FailedModal from '../components/FailedModal';
import SucceedModal from '../components/SucceedModal';
import MayorCreateModal from '../components/MayorCreateModal';
import MayorModifyModal from '../components/MayorModifyModal';
import LocationCreateModal from '../components/LocationCreateModal'
import AgreementCreateModal from '../components/AgreementCreateModal';
import ContactedReferrerCreateModal from '../components/ContactedReferrerCreateModal';
import { getLocations } from "../services/LocationServices";
import { getVisitStatuses } from "../services/StatusServices";
import { getPoliticParties } from "../services/PoliticPartiesServices";
import { getUsers } from "../services/UserServices";
import { getContactedReferrers } from "../services/ContactedReferrersServices";
import {Button, DatePicker, Form, Input, InputNumber, message, Select, Switch, TimePicker, Tooltip} from 'antd';
import { PlusCircleOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getAgreements } from "../services/AgreementServices";
import { getGroups } from "../services/GroupServices";
import { getAddresses } from "../services/AddressServices";
import { useLocation } from "react-router-dom";
import { getVisitById } from '../services/VisitServices';

const { TextArea } = Input;

dayjs.extend(customParseFormat);


const EditVisitPage = () => {

    let { authTokens } = useContext(AuthContext)
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
    const location = useLocation();
    const { visitData } = location.state;
    const [visit, setVisit] = useState([])
    const [flyerSwitch, setFlyerSwitch] = useState(false);
    const [civilRegistrationSwitch, setCivilRegistrationSwitch] = useState(false);
    const [accommodationSwitch, setAccommodationSwitch] = useState(false);
    const [modernizationFundSwitch, setModernizationFundSwitch] = useState(false);



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
        formRef.current.setFieldsValue({
            location: visit.location,
            visit_date: dayjs(visit.visit_date),
            visit_time: [dayjs(visit.start_time, 'HH:mm:ss'), dayjs(visit.finish_time, 'HH:mm:ss'),],
            finance_collaborator: visit.finance_collaborator,
            rent_collaborator: visit.rent_collaborator,
            observations: visit.rent_observations,
            distance: visit.distance,
            travel_time: visit.travel_time,
            place: visit.place_name,
            address: visit.address,
            contacted_referrer: visit.contacted_referrer,
            politic_party: visit.politic_party,
            mayor: visit.mayor,
            flyer: visit.flyer,
            civil_registration: visit.civil_registration,
            accommodation: visit.accommodation,
            modernization_fund: visit.modernization_fund,
            agreements: visit.agreement,
            visit_status: visit.visit_status,
            group: visit.group,
        });
    }, [visit])

    useEffect(() => {
        getVisitById(authTokens.access, visitData).then(data => {
            setVisit(data);
            setFlyerSwitch(data.flyer);
            setCivilRegistrationSwitch(data.civil_registration);
            setAccommodationSwitch(data.accommodation);
            setModernizationFundSwitch(data.modernization_fund);
        });

        getVisitById(authTokens.access, visitData.id).then(data => setVisit(data))
        getMayors(authTokens.access).then(data => setMayors(data))
        getLocations(authTokens.access).then(data => setLocations(data))
        getVisitStatuses(authTokens.access).then(data => setVisitStatuses(data))
        getPoliticParties(authTokens.access).then(data => setPoliticParties(data))
        getUsers(authTokens.access).then(data => setUsers(data))
        getContactedReferrers(authTokens.access).then(data => setContactedReferrers(data))
        getAgreements(authTokens.access).then(data => setAgreements(data))
        getGroups(authTokens.access).then(data => setGroups(data))
        getAddresses(authTokens.access).then(data => setAddresses(data))
    }, [updateFlag], [visitData])

    const getTimeFromDate = (date) => {
        let nDate = new Date(date)
        return nDate.getHours() + ":" + nDate.getMinutes() + ":" + nDate.getSeconds()
    }

    let putVisit = async (values, id) => {
        let response = await fetch(`/api/visits/put/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "address_id": String(values.address),
                "agreement_id": values.agreements,
                "contacted_referrer_id": String(values.contacted_referrer),
                "distance": values.distance,
                "finance_collaborator_id": values.finance_collaborator && values.finance_collaborator.length > 0 ? values.finance_collaborator.map(String) : null,
                "rent_collaborator_id": values.rent_collaborator && values.rent_collaborator.length > 0 ? values.rent_collaborator.map(String) : null,
                "group_id": String(values.group),
                "location_id": String(values.location),
                "mayor_id": String(values.mayor),
                "rent_observations": values.observations,
                "place_name": values.place,
                "politic_party_id": String(values.politic_party),
                "travel_time": values.travel_time,
                "flyer": Boolean(flyerSwitch),
                "civil_registration": Boolean(civilRegistrationSwitch),
                "accommodation": Boolean(accommodationSwitch),
                "modernization_fund": Boolean(modernizationFundSwitch),
                "visit_date": values.visit_date.toISOString().split('T')[0],
                "start_time": getTimeFromDate(values.visit_time[0]),
                "finish_time": getTimeFromDate(values.visit_time[1]),
                "visit_status_id": String(values.visit_status)
            })
        })
        if (response.status === 200) {

            message.success('La visita ha sido actualizada');

        } else if (response.status === 500) {

            console.error("No se ha podido actualizar la visita");
        } else if (response.status === 401) {

            console.error("No se ha podido actualizar la visita");
        } else if (response.status === 400) {

            console.error("No se ha podido actualizar la visita");
        }
    }


    const onFinish = (values) => {
        putVisit(values, visitData)
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
                setUpdateFlag={setUpdateFlag} />
            <MayorModifyModal onClose={() => toggleModalModify()} show={showmodify} updateFlag={updateFlag}
                setUpdateFlag={setUpdateFlag} />
            <LocationCreateModal onClose={() => toggleModalLocationCreate()} show={showlocationcreate} updateFlag={updateFlag}
                setUpdateFlag={setUpdateFlag} />
            <AgreementCreateModal onClose={() => toggleModalAgreementCreate()} show={showagreementcreate} updateFlag={updateFlag}
                setUpdateFlag={setUpdateFlag} />
            <ContactedReferrerCreateModal onClose={() => toggleModalContactedReferrerCreate()} show={showcontactedreferrercreate} updateFlag={updateFlag}
                setUpdateFlag={setUpdateFlag} />

            <h2 className={'titulo1'}>Editar visita</h2>

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
                                        size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2} className='botonesredondos'>
                            <Tooltip placement={"right"} title="Agregar Localidad">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={toggleModalLocationCreate} />
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
                                <DatePicker placeholder={"Fecha de la consulta"} className="visit-field" size={'large'}/>
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
                                <TimePicker.RangePicker placeholder={["Inicio", "Fin"]} className="visit-field" size={'large'}/>
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"finance_collaborator"}
                                label={"Colaboradores de Finanzas:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    className="visit-field"
                                    mode="multiple"
                                    allowClear
                                    placeholder="Colaboradores De Finanzas"
                                    options={getPersonNames(users)}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row className="visit-field-row">
                        <Col>
                            <Form.Item
                                name={"rent_collaborator"}
                                label={"Colaboradores de Rentas:"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    className="visit-field"
                                    mode="multiple"
                                    allowClear
                                    placeholder="Colaboradores De Rentas"
                                    options={getPersonNames(users)}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    size={'large'}
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
                                <TextArea className="visit-field" rows={2} placeholder={"Observaciones"} size={'large'}/>
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
                                <InputNumber className="visit-field" addonAfter="km" placeholder={"Distancia"} size={'large'}/>
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
                                <InputNumber className="visit-field" addonAfter="min" placeholder={"Tiempo de Viaje"} size={'large'}/>
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
                                <Input className="visit-field" placeholder="Lugar" size={'large'}/>
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
                                    filterOption={filterOption}
                                    size={'large'}
                                />
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
                                        size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2} className='botonesredondos'>
                            <Tooltip placement={"right"} title="Agregar Referente Contactado">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={toggleModalContactedReferrerCreate} />
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
                                        size={'large'}
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
                                        size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2} className='d-flex botonesredondos'>
                            <Tooltip placement={"right"} title="Agregar Intendente">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={toggleModalCreate} />
                            </Tooltip>
                            <Tooltip placement={"right"} title="Editar Intendente" >
                                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={toggleModalModify} className='separarboton' />
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch checked={flyerSwitch} onChange={(checked) => setFlyerSwitch(checked)} />
                                </div> 
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch checked={civilRegistrationSwitch} onChange={(checked) => setCivilRegistrationSwitch(checked)} />
                                </div>
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch checked={accommodationSwitch} onChange={(checked) => setAccommodationSwitch(checked)} />
                                </div>
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Switch checked={modernizationFundSwitch} onChange={(checked) => setModernizationFundSwitch(checked)} />
                                </div>
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
                                        size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2} className='botonesredondos'>
                            <Tooltip placement={"right"} title="Agregar Acuerdo">
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={toggleModalAgreementCreate} />
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
                                    filterOption={filterOption}
                                    size={'large'}
                                />
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
                                        size={'large'}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                </Container>


                <Container fluid className={"button-container"}>
                    <Button className={"visit-submit-button primary"} htmlType="submit" type="primary"
                        icon={<PlusCircleOutlined />}>
                        Actualizar Visita
                    </Button></Container>


            </Form>
        </Container>

    )
        ;
};
export default EditVisitPage;