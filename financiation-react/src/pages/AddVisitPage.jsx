import React, { useContext, useState, useEffect, useRef } from 'react';
import '../assets/styles/AddVisitPage.css';
import Carousel from 'react-bootstrap/Carousel';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { getMayors } from '../services/MayorServices'
import AuthContext from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import FailedModal from '../components/FailedModal';
import SucceedModal from '../components/SucceedModal';
import MayorCreateModal from '../components/MayorCreateModal';
import MayorModifyModal from '../components/MayorModifyModal';
import CarouselButtons from '../components/CarouselButton';
import CardItem from '../components/AddVisitCard';
import ConveniosCard from '../components/ConveniosCard';

import { Card, MenuItem, Select, CardContent, Switch, Button, Checkbox } from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SocialDistanceOutlinedIcon from '@mui/icons-material/SocialDistanceOutlined';
import HotelIcon from '@mui/icons-material/Hotel';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FlagIcon from '@mui/icons-material/Flag';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';


const AddVisitPage = () => {

    let { authTokens } = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [showcreate, setShowcreate] = useState(false);
    const [showmodify, setShowmodify] = useState(false);
    const toggleModalCreate = () => setShowcreate(!showcreate);
    const toggleModalModify = () => setShowmodify(!showmodify);
    let [mayors, setMayors] = useState([])

    useEffect(() => {
        getMayors(authTokens.access).then(data => setMayors(data))
    }, [])

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
            <MayorCreateModal onClose={() => toggleModalCreate()} show={showcreate} />
            <MayorModifyModal onClose={() => toggleModalModify()} show={showmodify} />
            <SucceedModal onClose={() => toggleModalsucceed()} message={"la visita"} show={showsuccess} />
            <FailedModal onClose={() => toggleModalfailed()} message={"la visita"} show={showfail} />

            <h4 className={'h1NuevaVisita'}>Nueva Visita</h4>
            <Container>
                <Form onSubmit={postVisit}>
                    <Carousel variant="dark" interval={null} ref={carouselRef} controls={false}
                        className={'CarouselAddVisit justify-content-center text-center'}>

                        <Carousel.Item className='align-items-center'>

                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <CardItem icon={<CalendarMonthIcon sx={{ fontSize: 65 }} />} label="Fecha de Visita" inputLabel1=" " type="date" />
                                </Col>
                                <Col>
                                    <CardItem icon={<PlaceOutlinedIcon sx={{ fontSize: 65 }} />} label="Localidad" inputLabel1=" " isSelect={true} />
                                </Col>
                                <Col>
                                    <CardItem icon={<HouseOutlinedIcon sx={{ fontSize: 65 }} />} label="Nombre del Lugar" inputLabel1=" " />
                                </Col>
                                <Col>
                                    <CardItem icon={<DirectionsIcon sx={{ fontSize: 65 }} />} label="Dirección del Lugar" inputLabel1=" " />
                                </Col>
                            </Row>
                            <Row className='justify-content-center text-center'>
                            <Col> <CardItem icon={<AccessTimeIcon sx={{ fontSize: 65 }} />} label="Horario de Jornada" inputLabel1=" " inputLabel2=" " type="time" /></Col>
                            <Col><CardItem icon={<SocialDistanceOutlinedIcon sx={{ fontSize: 65 }} />} label="Distancia" inputLabel1=" " /></Col>
                            <Col><CardItem icon={<HistoryToggleOffOutlinedIcon sx={{ fontSize: 65 }} />} label="Tiempo de Viaje" inputLabel1=" " type="time" /></Col>
                            <Col><CardItem icon={<StickyNote2OutlinedIcon sx={{ fontSize: 65 }} />} label="¿Registro Civil?" inputLabel1=" " isSwitch={true} /></Col>

                            </Row>

                        </Carousel.Item>

                        <Carousel.Item className='justify-content-center align-items-center'>
                            <Row className='justify-content-center text-center'>
                            <Col><CardItem icon={<HotelIcon sx={{ fontSize: 65 }} />} label="¿Hospedaje?" isSwitch={true} /></Col>
                            <Col><CardItem icon={<PersonIcon sx={{ fontSize: 65 }} />} label="Colaborador Finanzas" isSelect={true} /></Col>
                            <Col><CardItem icon={<PersonIcon sx={{ fontSize: 65 }} />} label="Colaborador Rentas" isSelect={true} /></Col>
                            <Col><CardItem icon={<PersonIcon sx={{ fontSize: 65 }} />} label="Referente Local" isSelect={true} /></Col>
                            </Row>

                            <Row className='justify-content-center text-center'>
                            <Col><CardItem icon={<FlagIcon sx={{ fontSize: 65 }} />} label="Partido Politico" isSelect={true} /></Col>

                                <Col className='CenterContent'>
                                    <Card className={'CardVisit'}>
                                        <CardContent className={'CenterContent'}>
                                            <Container>
                                                <Row className='justify-content-center'>
                                                    <AddIcon sx={{fontSize:40}} type="submit" onClick={() => toggleModalCreate()}></AddIcon>
                                                    <CreateIcon sx={{fontSize:40}} type="submit" onClick={() => toggleModalModify()}></CreateIcon>
                                                </Row>
                                                <Row className='justify-content-center'>
                                                    <PersonIcon sx={{ fontSize: 65 }} />
                                                </Row>

                                                <Row className='justify-content-center text-center'>
                                                    <a>{'Intendente'}</a>
                                                </Row>
                                                <Row className='justify-content-center text-center'>
                                                    <Col>
                                                        <TextField id="standard-select-currency" select variant="standard" >
                                                            {mayors?.map((mayor) => (
                                                                <MenuItem value={mayor.id}>{mayor.first_name} {mayor.last_name}</MenuItem>
                                                            ))}
                                                        </TextField>

                                                    </Col>
                                                </Row>
                                            </Container>
                                        </CardContent>
                                    </Card>
                                </Col>
                                <CardItem icon={<RequestQuoteIcon sx={{ fontSize: 65 }} />} label="Fondo de Modernización" isSwitch={true} />
                                <CardItem icon={<ArticleIcon sx={{ fontSize: 65 }} />} label="¿Flyer?" isSwitch={true} />
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item className=' align-items-center'>
                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <ConveniosCard />
                                </Col>
                                <Col md={3}>
                                    <CardItem icon={<ShareLocationIcon sx={{ fontSize: 65 }} />} label="Estado" isSelect={true} />
                                </Col>
                            </Row>
                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <Button className={'BtnAddVisit'} variant='outlined'>Guardar Visita</Button>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                    <CarouselButtons prev={handlePrev} next={handleNext} />
                </Form>

            </Container>
        </Container>

    )
        ;
};
export default AddVisitPage;