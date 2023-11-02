import {useContext, useEffect, useRef, useState} from 'react';
import "../assets/styles/FormPage.css";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getDivisions} from "../services/DivisionServices";
import {getUser} from '../services/UserServices';
import {getWhys} from "../services/WhyServices";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimeField} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import {getFaqsByDivisions} from "../services/FaqServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const FormPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [divisions, setDivisions] = useState([])
    let [faqs, setFaqs] = useState([])
    let [advisors, setAdvisors] = useState([])
    let [user, setUser] = useState([])
    let [visits, setVisits] = useState([])
    let [whys, setWhys] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showObservacionesInput, setShowObservacionesInput] = useState(false);


    let dateRef = useRef(null);

    let [selectedVisit, setSelectedVisit] = useState(1)
    let [selectedFaq, setSelectedFaq] = useState()
    let [selectedWhy, setSelectedWhy] = useState(1)
    let [selectedQuantity, setSelectedQuantity] = useState(1)
    const [myUser, setMyUser] = useState()

    const getData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
        getDivisions(authTokens.access).then(data => setDivisions(data))
        getWhys(authTokens.access).then(r => setWhys(r))
        getVisits(authTokens.access).then(data => setVisits(data))
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
        getUser(authTokens.access).then(data => setUser(data))
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

    let postRequest = async (e) => {
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
                "advisor_id": myUser.id,
                "faq_id": selectedFaq,
                "why_id": selectedWhy,
                "status_id": 1
            })
        })
        if (response.status === 200) {
            handleShow()
        } else {
            alert('Something went wrong')
        }
    }

    let handleSumbit = async (e) => {
        e.preventDefault()

        for (let i = 1; i <= selectedQuantity; i++) {
            await postRequest()
        }
    }


    return (
        <Form onSubmit={e => handleSumbit(e)}>
            <Container>
                <Row>
                    <Col lg={3}>
                        <Container>
                            <p>Fecha y Hora</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimeField
                                    inputRef={dateRef}
                                    format='DD/MM/YYYY HH:mm'
                                    label={''}
                                    name="request_datetime"
                                    defaultValue={dayjs(getCurrentDateTimeString())}
                                    className={"consulta-field"}
                                />
                            </LocalizationProvider>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <p>Visita</p>
                            <select
                                name="visit"
                                onChange={(e) => setSelectedVisit(e.target.value)}>

                                {visits?.map((visit) => (
                                    <option value={visit.id}>{visit.name}</option>
                                ))}
                            </select>
                        </Container>
                    </Col>
                    <Col lg={3}>
                        <Container>
                            <p>Asesor</p>
                            <Row className='ContainerPersonForm'>
                                <Col>
                                    <Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}/>
                                </Col>
                                <Col>
                                    <h5>{user.first_name} {user.last_name}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <p>Reparticiones</p>
                            <select
                                placeholder="Reparticiones"
                                name="division"
                                className={"consulta-field"}
                                onChange={(e) => {
                                    const selectedOptionName = e.target.options[e.target.selectedIndex].text;
                                    setShowObservacionesInput(selectedOptionName === 'Otros');
                                    getFaqsByDivisions(authTokens.access, e.target.value).then(r => setFaqs(r));
                                }}>
                                <option value="" disabled selected>Seleccione una reparticion</option>
                                {divisions?.map((ministryDepartment) => (
                                    <option value={ministryDepartment.id}>{ministryDepartment.name}</option>
                                ))}

                            </select>

                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <p>Consultas</p>
                            <select
                                placeholder="Departamento"
                                name="faq"
                                className={"consulta-field"}
                                onChange={(e) => {
                                    const selectedOptionName = e.target.options[e.target.selectedIndex].text;
                                    setShowObservacionesInput(selectedOptionName.includes('Otros'));
                                    setSelectedFaq(e.target.value)
                                }}>
                                <option value="" disabled selected>Seleccione un tipo de consulta</option>
                                {faqs?.map((faq) => (
                                    <option value={faq.id}>{faq.name}</option>
                                ))}


                            </select>
                        </Container>
                    </Col>
                </Row>
                {showObservacionesInput && (
                    <Row>
                        <Col>
                            <Container>
                                <p>Observaciones</p>
                                <textarea
                                    className={"consulta-field"}
                                    type="text"
                                    placeholder="La persona...."
                                    name="observaciones"
                                />
                            </Container>

                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Container>
                            <p>¿Por que vino?</p>
                            <select
                                placeholder="Por que vino?"
                                className={"consulta-field"}
                                name='why'
                                onChange={(e) => setSelectedWhy(e.target.value)}>
                                <option value="" disabled selected>Determine el motivo de la visita</option>
                                {whys?.map((why) => (
                                    <option value={why.id}>{why.name}</option>
                                ))}


                            </select>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Container>
                            <p>Cantidad</p>
                            <input className={"consulta-field"}
                                      name="quantity"
                                      defaultValue={1}
                                        type="number"
                                      onChange={(e) => setSelectedQuantity(e.target.value)}/>

                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <Button type='submit' variant="primary"
                                    className={"consulta-field"}>Enviar Consulta</Button>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{width: '100%'}}>
                    Consulta enviada!
                </Alert>
            </Snackbar>
        </Form>


    )
        ;
};

export default FormPage;

