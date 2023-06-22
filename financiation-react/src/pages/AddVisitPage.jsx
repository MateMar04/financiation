import React, {useContext, useEffect, useState} from 'react';
import '../assets/styles/AddVisitPage.css';
import {Button, Container, Form, Row, Col} from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import {
    Autocomplete,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Box,
    TextField,
    InputLabel,
    MenuItem,
    FormControl
} from '@mui/material';


const AddVisitPage = () => {
    const [flyer, setImage] = useState(null);
    const [distance, setDistance] = useState('');
    const [travel_time, setTravelTime] = useState('');
    const [visit_date, setVisitDate] = useState(null);
    const [civil_registration, setCivilRegistration] = useState('');
    const [accommodation, setAccommodation] = useState('');
    const [modernization_fund, setModernizationFund] = useState('');
    const [start_time, setStartTime] = useState('');
    const [finish_time, setFinishTime] = useState('');
    const [place_name, setPlaceName] = useState('');
    const [id_locality, setLocality] = useState('');
    const [id_group, setGroup] = useState('');
    const [id_visit_status, setVisitStatus] = useState('');
    const [id_agreement, setAgreement] = useState('');
    const [id_contacted_referrer, setContactedReferrer] = useState('');
    const [id_address, setAddress] = useState('');
    const [isClearable, setIsClearable] = useState(true);


    let [localities, setLocalities] = useState([]);
    let [visit, setVisit] = useState(null);
    let {authTokens, logoutUser} = useContext(AuthContext);

    useEffect(() => {
        setVisit()
        getLocalities();
    }, []);

    let getLocalities = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/locality/', {headers: headers})
        let data = await response.json()
        setLocalities(data)
    };

    let postVisit = async () => {
        fetch('/api/visit/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'JWT ' + String(authTokens.access),
                Accept: 'application/json',
            },
            body: JSON.stringify(visit),
        });
    };


    const modernizationFounds = [
        {label: 'Depositado'},
        {label: 'No aprobado a la espera de nuevo proyecto'}
    ]

// Filtrar las localidades para eliminar duplicados
    const uniqueLocalities = localities
        ? localities.reduce((accumulator, locality) => {
            if (!accumulator.find((item) => item.id === locality.id)) {
                accumulator.push(locality);
            }
            return accumulator;
        }, [])
        : [];

// Crear el array de opciones sin duplicados
    const optionsWithoutDuplicates = uniqueLocalities.map((locality) => ({
        value: locality.id,
        label: locality.name,
    }));

    optionsWithoutDuplicates.sort((a, b) => a.label.localeCompare(b.label));

// Declara el estado para almacenar la opción seleccionada
    const [selectedOption, setSelectedOption] = useState(null);

// Función para manejar el cambio de selección
    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const defaultOptionsReferents = [
        createOption('Marcela Gonzalez'),
        createOption('Romina Bardazo'),
        createOption('Nora Nacul'),
        createOption('Valeria'),
        createOption('Gisele Cesar'),
        createOption('Nadia Gallardo'),
        createOption('Tati'),
        createOption('Soledad'),

    ];

        const [isLoading, setIsLoading] = useState(false);
        const [referents, setReferents] = useState(defaultOptionsReferents);
        const [value, setValue] = useState(null);

        const handleCreate = (inputValue) => {
            setIsLoading(true);
            setTimeout(() => {
                const newOption = createOption(inputValue);
                setIsLoading(false);
                setReferents((prev) => [...prev, newOption]);
                setValue(newOption);
            }, 1000);
        };


            return (
                <Container>
                    <Container>
                        <a>Tiempo de viaje</a>
                        <Form.Control
                            type="time"
                            placeholder="Tiempo de viaje"
                            name="travel_time"
                            value={travel_time}
                            onChange={(e) => setTravelTime(e.target.value)}
                            className="scrolling"
                        />
                    </Container>

                    <Container className='justify-content-center'>
                        <Row>
                            <Col className='d-flex align-items-center justify-content-center'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label='Fecha de visita'
                                        name="visit_date"
                                        value={visit_date}
                                        onChange={(date) => setVisitDate(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                        format='DD/MM/YYYY'

                                    />
                                </LocalizationProvider>
                            </Col>

                            <Col className='d-flex align-items-center justify-content-center'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked value={civil_registration}
                                                                         onChange={(e) => setCivilRegistration(e.target.value)}/>}
                                                      label="Necesita registro civil"/>
                                </FormGroup>
                            </Col>

                            <Col className='d-flex align-items-center justify-content-center'>
                                <FormGroup>
                                    <FormControlLabel required control={<Checkbox value={accommodation}
                                                                                  onChange={(e) => setAccommodation(e.target.value)}/>}
                                                      label="Hay hospedaje en la localidad"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>


                    <Container>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={modernizationFounds}
                            renderInput={(params) => <TextField{...params}
                                                               label="Fondo de modernizacion"
                                                               value={modernization_fund}
                                                               onChange={(e) => setModernizationFund(e.target.value)}
                            />}
                        />

                    </Container>

                    <Container>
                        <Row>
                            <Col className='d-flex justify-content-center'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            label='Hora de inicio de la jornada'
                                            name="start_time"
                                            value={start_time}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Col>

                            <Col className='d-flex justify-content-center'>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            label='Hora de fin de la jornada'
                                            name="finish_time"
                                            value={finish_time}
                                            onChange={(e) => setFinishTime(e.target.value)}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Col>
                        </Row>
                    </Container>

                    <Container>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '80ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField name="place_name" label="Nombre del Lugar" variant="standard" value={place_name}
                                       onChange={(e) => setPlaceName(e.target.value)}/>
                            <FormControl fullWidth>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Localidad"
                                    placeholder="Localidad"
                                    name="id_locality"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                    options={optionsWithoutDuplicates}
                                    isClearable={isClearable}
                                />

                            </FormControl>
                            <TextField id="standard-basic" label="Grupo N°" variant="standard" name="id_group"
                                       value={id_group}
                                       onChange={(e) => setGroup(e.target.value)}/>
                            <TextField id="standard-basic" label="estado de visita" variant="standard"
                                       name="id_visit_status"
                                       value={id_visit_status}
                                       onChange={(e) => setVisitStatus(e.target.value)}/>
                            <TextField id="standard-basic" label="Convenios" variant="standard" name="id_agreement"
                                       value={id_agreement}
                                       onChange={(e) => setAgreement(e.target.value)}/>


                            <CreatableSelect
                                isClearable
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                onChange={(newValue) => setValue(newValue)}
                                onCreateOption={handleCreate}
                                options={referents}
                                value={value}

                                placeholder="Referente local"
                            />
                            <TextField id="standard-basic" label="Direccion" variant="standard" name="id_address"
                                       value={id_address}
                                       onChange={(e) => setAddress(e.target.value)}/>
                        </Box>
                    </Container>

                    <Container>
                        <Button onClick={postVisit}>Guardar Visita</Button>
                    </Container>
                </Container>
            );
        };
        export default AddVisitPage;