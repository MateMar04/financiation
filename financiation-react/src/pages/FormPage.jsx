import React, {useContext, useEffect, useRef, useState} from 'react';
import "../assets/styles/FormPage.css";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {getAdvisorByUser, getAdvisorUsers} from "../services/AdvisorServices";
import {getDivisions} from "../services/DivisionServices";
import {getUser} from '../services/UserServices';
import {getWhys} from "../services/WhyServices";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimeField} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {getUserGroup} from "../services/GroupServices";
import {Modal} from 'antd';
import LoadingModal from "../components/LoadingModal";
import Avatar from "@mui/material/Avatar";
import {getFaqsByDivisions} from "../services/FaqServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Zoom } from "@mui/material";
import FailedModal from '../components/FailedModal';

const FormPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [divisions, setDivisions] = useState([])
    let [faqs, setFaqs] = useState([])
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState([])
    let [visits, setVisits] = useState([])
    let [whys, setWhys] = useState([])
    const [showloading, setShowloading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showObservacionesInput, setShowObservacionesInput] = useState(false);


    let dateRef = useRef(null);

    let [selectedVisit, setSelectedVisit] = useState()
    let [selectedFaq, setSelectedFaq] = useState()
    let [selectedWhy, setSelectedWhy] = useState()
    let [selectedQuantity, setSelectedQuantity] = useState(1)
    const [observation, setObservation] = useState("-")
    const [myUser, setMyUser] = useState()
    const [advisorId, setAdvisorId] = useState();

    const [showfail, setShowfailture] = useState(false);
    const toggleModalfailed = () => setShowfailture(!showfail);

    const getData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
        getDivisions(authTokens.access).then(data => setDivisions(data))
        getWhys(authTokens.access).then(r => setWhys(r))
        getVisits(authTokens.access).then(data => setVisits(data))
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getUser(authTokens.access).then(data => setUser(data))
        getAdvisorByUser(authTokens.access, usuario.id).then(data => setAdvisorId(data))
    }

    function getCurrentDateTimeString() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }


    const formatDate = (inputDate) => {
        // Split the input string into date and time parts
        const [datePart, timePart] = inputDate.split(' ');

        // Split the date part into day, month, and year
        const [day, month, year] = datePart.split('/');

        // Split the time part into hours and minutes
        const [hours, minutes] = timePart.split(':');

        // Create a Date object with the components
        const formattedDate = (`${year}-${month}-${day} ${hours}:${minutes}:00-03`);


        return formattedDate;
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setSelectedVisit(visits[0]?.id);
    }, [visits]);

    let postRequest = async (e) => {
        setShowloading(true)
        let response = await fetch('/api/requests', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "request_datetime": formatDate(dateRef.current.value),
                "visit_id": selectedVisit,
                "advisor_id": advisorId.length === 0 ? "None" : advisorId[0].advisor,
                "faq_id": selectedFaq,
                "why_id": selectedWhy,
                "status_id": 1,
                "observation": observation
            })
        })

        if (response.status === 200) {
            await setShowloading(false);
            handleShow();
        } else {
            await setShowloading(false);
            toggleModalfailed();
        }
    }

    let handleSumbit = async (e) => {
        e.preventDefault()

        for (let i = 1; i <= selectedQuantity; i++) {
            await postRequest()
        }
    }


    return (
        <Container fluid>
        <FailedModal onClose={() => toggleModalfailed()} message={"El formulario no ha sido enviado."} show={showfail}/>

        <Form onSubmit={e => handleSumbit(e)}>
            <Zoom in>
            <Container className={"request-container"}>
                <Row className={"fields-row"}>
                    <Col lg={3}>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Fecha y Hora</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimeField
                                    inputRef={dateRef}
                                    format='DD/MM/YYYY HH:mm'
                                    label={''}
                                    name="request_datetime"
                                    defaultValue={dayjs(getCurrentDateTimeString())}
                                    className={"input-in-form"}
                                    InputProps={{
                                    sx: {borderRadius: '2vh', height: '7vh', borderColor:'white'}
                                }}

                                />
                            </LocalizationProvider>
                        </Container>
                    </Col>
                    <Col>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Visita</p>
                            <select
                                className={"consulta-field form-select"}
                                name="visit"
                                onChange={(e) => setSelectedVisit(e.target.value)}>

                                {visits?.map((visit, i) => (
                                    <option key={i} value={visit.id}>{visit.name}</option>
                                ))}
                            </select>
                        </Container>
                    </Col>
                    <Col lg={3} className={"bigger-avatar-col d-none d-lg-block"}>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Asesor</p>
                            <Row className={"asesor-container input-in-form"}>
                                <Col className={"avatar-col"} lg={3}>
                                    <Avatar className={"asesor-avatar"} alt="user"
                                            src={'data:image/png;base64, ' + myUser?.profile_picture} sx={{height: 38}}/>
                                </Col>
                                <Col className={"avatar-col"}>
                                    <h5 className={"asesor-name"}>{user.first_name} {user.last_name}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row className={"fields-row"}>
                    <Col>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Reparticiones</p>
                            <select
                                placeholder="Reparticiones"
                                name="division"
                                className={"consulta-field form-select"}
                                onChange={(e) => {
                                    const selectedOptionName = e.target.options[e.target.selectedIndex].text;
                                    setShowObservacionesInput(selectedOptionName === 'Otros');
                                    getFaqsByDivisions(authTokens.access, e.target.value).then(r => setFaqs(r));
                                }}>
                                <option value="" disabled selected>Seleccione una reparticion</option>
                                {divisions?.map((ministryDepartment, i) => (
                                    <option key={i} value={ministryDepartment.id}>{ministryDepartment.name}</option>
                                ))}

                            </select>

                        </Container>
                    </Col>
                </Row>
                <Row className={"fields-row"}>
                    <Col>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Consultas</p>
                            <select
                                placeholder="Departamento"
                                name="faq"
                                className={"consulta-field form-select"}
                                onChange={(e) => {
                                    const selectedOptionName = e.target.options[e.target.selectedIndex].text;
                                    setShowObservacionesInput(selectedOptionName.includes('Otros'));
                                    setSelectedFaq(e.target.value)
                                }}>
                                <option value="" disabled selected>Seleccione un tipo de consulta</option>
                                {faqs?.map((faq, i) => (
                                    <option key={i} value={faq.id}>{faq.name}</option>
                                ))}


                            </select>
                        </Container>
                    </Col>
                </Row>
                {showObservacionesInput && (
                    <Row className={"fields-row"}>
                        <Col>
                            <Container className={"fields-container"}>
                                <p className={"request-field-title"}>Observaciones</p>
                                <textarea
                                    onChange={(e) => setObservation(e.target.value)}
                                    className={"consulta-field input-in-form"}
                                    type="text"
                                    placeholder="La persona...."
                                    name="observaciones"
                                />
                            </Container>

                        </Col>
                    </Row>
                )}
                <Row className={"fields-row"}>
                    <Col>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>¿Por que vino?</p>
                            <select
                                placeholder="Por que vino?"
                                className={"consulta-field form-select"}
                                name='why'
                                onChange={(e) => setSelectedWhy(e.target.value)}>
                                <option value="" disabled selected>Determine el motivo de la visita</option>
                                {whys?.map((why, i) => (
                                    <option key={i} value={why.id}>{why.name}</option>
                                ))}


                            </select>
                        </Container>
                    </Col>
                </Row>
                <Row className={"fields-row"}>
                    <Col lg={3}>
                        <Container className={"fields-container"}>
                            <p className={"request-field-title"}>Cantidad</p>
                            <input className={"consulta-field input-in-form"}
                                   name="quantity"
                                   defaultValue={1}
                                   type="number"
                                   onChange={(e) => setSelectedQuantity(e.target.value)}/>

                        </Container>
                    </Col>
                </Row>
                <Row className={"fields-row"}>
                    <Col>
                        <Container className={"fields-container"}>
                            <Button type='submit' variant="primary"
                                    className={"consulta-field consulta-button"}>Enviar Consulta</Button>
                        </Container>
                    </Col>
                </Row>

            </Container>
                </Zoom>

            <Snackbar open={show} autoHideDuration={3500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{width: '100%'}}>
                    Consulta enviada!
                </Alert>
            </Snackbar>


            <Container>
                <LoadingModal message="la visita" show={showloading}/>
            </Container>

        </Form>
            </Container>


    )
        ;
};

export default FormPage;

