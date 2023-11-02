import {useContext, useEffect, useRef, useState} from 'react';
import "../assets/styles/FormPage.css";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getDivisions} from "../services/DivisionServices";
import {getUser} from '../services/UserServices';
import {getWhys} from "../services/WhyServices";
import {Col, Container, Form, Row} from "react-bootstrap";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimeField} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";


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
        <Form>
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
                                    className={"fecha-field"}
                                />
                            </LocalizationProvider>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <p>Visita</p>
                            <select
                                placeholder="Visita"
                                className='form-select'
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
                                    <h5>{user.first_name}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Form>


    )
        ;
};

/*<Form onSubmit={handleSumbit}>
<Container className={'FirstContainerForm'}>
<Row className='justify-content-center'>
<Col>
<p className={'pInFormPage'}>Fecha y hora</p>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DateTimeField
inputRef={dateRef}
format='DD/MM/YYYY HH:mm'
label={''}
className='InputsFormPage'
name="request_datetime"
defaultValue={dayjs(getCurrentDateTimeString())}
/>
</LocalizationProvider>
</Col>
<Col className={'VisitaDropDown'}>
<p className={'pInFormPage'}>Visita</p>
<select
placeholder="Visita"
className='form-select'
name="visit"
onChange={(e) => setSelectedVisit(e.target.value)}>

{visits?.map((visit) => (
<option value={visit.id}>{visit.name}</option>
))}
</select>


</Col>
<Col>
<p className={'pInFormPage'}>Asesor</p>
<Row className='ContainerPersonForm'>
<Col md={4} xs={2}
className='justify-content-center d-flex align-items-center col-avatar'>
<Avatar alt="Remy Sharp" src={'data:image/png;base64, ' + myUser?.profile_picture}/>
</Col>
<Col className='d-flex align-items-center text-center'>
<h5 className={'userFirstName'}>{user.first_name}</h5>
</Col>
</Row>

</Col>
</Row>
</Container>
<Container className='justify-content-center'>


<Row className='justify-content-md-center py-2'>
<Col xs={12} md={10}>
<p className={'pInFormPage'}>Reparticiones</p>
<select
placeholder="Reparticiones"
className='form-select department-select'
name="division"

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
</Col>
</Row>


<Row className='justify-content-md-center py-2'>
<Col xs={12} md={10}>
<p className={'pInFormPage'}>Consulta</p>
<select
placeholder="Departamento"
className='form-select department-select'
name="faq"
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
</Col>
</Row>

{showObservacionesInput && (
<Row className='justify-content-md-center py-2'>
<Col xs={12} md={10}>
<p className={'pInFormPage'}>Observaciones</p>
<textarea
type="text"
placeholder="La persona...."
className="ObservationsInput"
name="observaciones"
/>
</Col>
</Row>
)}


<Row className='justify-content-md-center py-2'>
<Col xs={12} md={10}>
<p className={'pInFormPage'}>¿Por que vino?</p>
<select
placeholder="Por que vino?"
className='form-select department-select'
name='why'
onChange={(e) => setSelectedWhy(e.target.value)}>
<option value="" disabled selected>Determine el motivo de la visita</option>
{whys?.map((why) => (
<option value={why.id}>{why.name}</option>
))}


</select>
</Col>
</Row>
</Container>

<Container className={'SecondContainerForm'}>
<Row>
<p className={'pInFormPage'}>Cantidad</p>
</Row>

<Row className={'justify-content-start py-2'} xs={12}>
<Col md={8} xs={5}>
<TextField className={'InputInForm'}
name="quantity"
defaultValue={1}
onChange={(e) => setSelectedQuantity(e.target.value)}/>
</Col>

<Col md={3} xs={6}>

<Button type='submit' variant="primary"
className='buttonconsulta'>Enviar Consulta</Button>
</Col>
</Row>
</Container>


<Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} severity="success" variant="filled" sx={{width: '100%'}}>
Consulta enviada!
</Alert>
</Snackbar>


</Form>*/


export default FormPage;

