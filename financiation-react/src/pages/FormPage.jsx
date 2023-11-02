import {useContext, useEffect, useRef, useState} from 'react';
import "../assets/styles/FormPage.css";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getDivisions} from "../services/DivisionServices";
import {getUser} from '../services/UserServices';
import {getWhys} from "../services/WhyServices";
import {Col, Container, Row} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimeField} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {Button, Form, Input, InputNumber, Select} from "antd";


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

    const getItemNames = (array) => {
        return array?.map(item => ({
            label: item.name,
            value: item.id
        }));
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
                            <Form.Item
                                name={"visita"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    options={getItemNames(visits)}/>
                            </Form.Item>
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
                            <Form.Item
                                name={"reparticion"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    placeholder="Reparticiones"
                                    name="division"
                                    className={"consulta-field"}
                                    options={getItemNames(divisions)}>
                                </Select>
                            </Form.Item>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <p>Consultas</p>
                            <Form.Item
                                name={"consulta"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    placeholder="Departamento"
                                    name="faq"
                                    className={"consulta-field"}
                                    options={getItemNames(faqs)}>
                                </Select>
                            </Form.Item>
                        </Container>
                    </Col>
                </Row>
                {showObservacionesInput && (
                    <Row>
                        <Col>
                            <Container>
                                <p>Observaciones</p>
                                <Form.Item
                                    name={"obsevaciones"}
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}>
                                    <Input placeholder="Basic usage"/>
                                </Form.Item>
                            </Container>

                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <Container>
                            <p>¿Por que vino?</p>
                            <Form.Item
                                name={"porque"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Select
                                    placeholder="Por que vino?"
                                    className={"consulta-field"}
                                    name='why'
                                    options={getItemNames(whys)}>
                                </Select>
                            </Form.Item>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Container>
                            <p>Cantidad</p>
                            <Form.Item
                                name={"cantidad"}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <InputNumber/>
                            </Form.Item>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Container>
                            <Button htmlType="submit" type="primary"
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

