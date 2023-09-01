import React, {useContext, useState, useRef} from 'react';
import "../assets/styles/AddVisitPage.css"
import Carousel from 'react-bootstrap/Carousel';
import {Col, Container, Form, Row,} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import TextField from '@mui/material/TextField';
import FailedModal from "../components/FailedModal";
import SucceedModal from "../components/SucceedModal";
import MayorCreateModal from "../components/MayorCreateModal";
import Card from '@mui/material/Card';
import Select from "@mui/material/Select";
import {CardContent, Switch} from "@mui/material";
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
import CarouselButtons from "../components/CarouselButton";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


const AddVisitPage = () => {

    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const [showcreate, setShowcreate] = useState(false);
    const toggleModalCreate = () => setShowcreate(!showcreate);


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
            //alert('se registro la visita correctamente')
        } else if (response.status === 500) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Uno de los datos ingresados no coincide con la base de datos)')
        } else if (response.status === 401) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Desautorizado)')
        } else if (response.status === 400) {
            toggleModalfailed();
            await postVisit()
            //alert('no se a registrado la visita (Bad request)')
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
        <Container fluid className={'Background'}>
            <Container>
                <h4 className={'h1NuevaVisita'}>Nueva Visita</h4>
                <Container className={'MiniContainerVisit'}>
                    <MayorCreateModal onClose={() => toggleModalCreate()} show={showcreate}/>
                    <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess}/>
                    <FailedModal onClose={() => toggleModalfailed()} message="la visita" show={showfail}/>
                    <Form onSubmit={postVisit}>
                        <Carousel variant="dark" interval={null} ref={carouselRef} controls={false}
                                  className={'carouselAddVisit'}>

                            <Carousel.Item>
                                <Row className='justify-content-center'>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <CalendarMonthIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Fecha de Visita'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <PlaceOutlinedIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Localidad'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <HouseOutlinedIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Nombre del Lugar'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <DirectionsIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Dirección del Lugar'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <AccessTimeIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Horario de Jornada'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <SocialDistanceOutlinedIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Distancia'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <HistoryToggleOffOutlinedIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Tiempo de Viaje'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <TextField id="standard-basic" label=""
                                                                       variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>

                                                    <Row className="justify-content-center">
                                                        <StickyNote2OutlinedIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'¿Registro Civil?'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Switch id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>

                            </Carousel.Item>

                            <Carousel.Item className={'MiniContainerVisit'}>

                                <Row className='justify-content-center'>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>

                                                    <Row className="justify-content-center">
                                                        <HotelIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'¿Hospedaje?'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Switch id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <PersonIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Colaborador Finanzas'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <PersonIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Colaborador Rentas'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className="justify-content-center">
                                                        <PersonIcon sx={{fontSize: 65}}/>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Referente Local'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>

                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Partido Politico'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>

                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                            
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                        
                                            <CardContent className={'CenterContentCard'}>
                                                
                                                <Container className='icon' >
                                                    <AddIcon className='icon' type="submit" aria-label="search" onClick={() => toggleModalCreate()}></AddIcon>
                                                </Container>
                                                
                                                <Container>

                                                    <Row className='justify-content-center text-center'>
                                                        
                                                        <a>{'Intendente'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>

                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>

                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'Fondo de Modernización'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Switch id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className='justify-content-center text-center'>
                                                        <a>{'¿Flyer?'}</a>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Switch id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                            </Carousel.Item>

                            <Carousel.Item className={'ThirdCarousel'}>
                                <Row className='justify-content-center'>
                                    <Col>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisitConvenios'}>
                                            <CardContent className='CenterContentCardConvenios'>
                                                <Row>
                                                    <Col md={3}>
                                                        <Row className='text-center'>
                                                            <p>{'Convenios Firmados'}</p>
                                                        </Row>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Row className='justify-content-center text-center'>

                                                            <Col>
                                                                <Checkbox/>
                                                            </Col>
                                                            <Col>
                                                                <p>{'Convenio 1'}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='justify-content-center text-center'>
                                                            <Col>
                                                                <Checkbox/>
                                                            </Col>
                                                            <Col>
                                                                <p>{'Convenio 2'}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Row className='justify-content-center text-center'>
                                                            <Col>
                                                                <Checkbox/>
                                                            </Col>
                                                            <Col>
                                                                <p>{'Convenio 3'}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='justify-content-center text-center'>
                                                            <Col>
                                                                <Checkbox/>
                                                            </Col>
                                                            <Col>
                                                                <p>{'Convenio 4'}</p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col md={3}>
                                        <Card sx={{my: 2, mx: 2}} className={'CardVisit'}>
                                            <CardContent className={'CenterContentCard'}>
                                                <Container>
                                                    <Row className='justify-content-center text-center'>
                                                        <p>{'Estado'}</p>
                                                    </Row>
                                                    <Row className='justify-content-center text-center'>
                                                        <Col>
                                                            <Select id="standard-basic" label=""
                                                                    variant="standard"/>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='justify-content-center text-center'>
                                <Col className='ContentCenterCard'>    
                                <Button className={'BtnAddVisit'} variant='outlined'>Guardar Visita</Button>
                                </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                        <CarouselButtons prev={handlePrev} next={handleNext}/>
                    </Form>
                </Container>
            </Container>
        </Container>

    )
        ;
};
export default AddVisitPage;