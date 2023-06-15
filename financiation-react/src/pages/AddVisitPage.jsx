import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form, FloatingLabel} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

const AddVisitPage = () => {
    const [flyer, setImage] = useState(null);
    const [distance, setDistance] = useState("");
    const [travel_time, setTravelTime] = useState("");
    const [visit_date, setVisitDate] = useState("");
    const [civil_registration, setCivilRegistration] = useState("");
    const [accommodation, setAccommodation] = useState("");
    const [modernization_fund, setModernizationFund] = useState("");
    const [start_time, setStartTime] = useState("");
    const [finish_time, setFinishTime] = useState("");
    const [place_name, setPlaceName] = useState("");
    const [id_locality, setLocality] = useState("");
    const [id_group, setGroup] = useState("");
    const [id_visit_status, setVisitStatus] = useState("");
    const [id_agreement, setAgreement] = useState("");
    const [id_contacted_referrer, setContactedReferrer] = useState("");
    const [id_address, setAddress] = useState("");
    const [id_logo, setLogo] = useState("");

    let [localities, setLocalities] = useState([])
    let [visit, setVisit] = useState(null)
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        setVisit()
    })


    let getLocalities = async () => {
        let response = await fetch('/api/locality/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            }
        })
        let data = await response.json()
        setLocalities(data)
    }

    let postVisit = async () => {
        fetch(' /api/visit/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify(visit)
        })
    }

    return (

        <Container className="scrolling">
            <Form>
                <Form.Group>

                    <FloatingLabel controlId="floatingTextarea2" label="Distancia [km]">
                    <Form.Control
                        type="number"
                        placeholder="Distancia"
                        name="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}

                    />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Tiempo de viaje">
                    <Form.Control
                        type="time"
                        placeholder="Tiempo de viaje"
                        name="travel_time"
                        value={travel_time}
                        onChange={(e) => setTravelTime(e.target.value)}
                    />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Fecha de visita">
                    <Form.Control
                        type="date"
                        placeholder="Fecha de visita"
                        name="visit_date"
                        value={visit_date}
                        onChange={(e) => setVisitDate(e.target.value)}
                    />
                    </FloatingLabel>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="civil_registration"
                        value={civil_registration}
                        onChange={(e) => setCivilRegistration(e.target.value)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Necesito Registro civil</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="civil_registration"
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Hay hospedaje en la localidad</label>
                    </div>


                    <select className='form-select'
                        type="text"
                        placeholder="Enter modernization fund"
                        name="modernization_fund"
                        value={modernization_fund}
                        onChange={(e) => setModernizationFund(e.target.value)}>
                        <option>Fondo de modernizacion</option>
                        <option>Depositado</option>
                        <option>No aprobado a la espera de nuevo proyecto</option>
                    </select>
                    <FloatingLabel controlId="floatingTextarea2" label="Hora de inicio de la jornada">
                    <Form.Control
                        type="time"
                        placeholder="Hora de inicio de la jornada"
                        name="start_time"
                        value={start_time}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Hora de fin de la jornada">
                    <Form.Control
                        type="time"
                        placeholder="Hora de fin de la jornada"
                        name="finish_time"
                        value={finish_time}
                        onChange={(e) => setFinishTime(e.target.value)}
                    />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingTextarea2" label="Nombre del Lugar">
                    <Form.Control
                        type="text"
                        placeholder="Enter place_name"
                        name="place_name"
                        value={place_name}
                        onChange={(e) => setPlaceName(e.target.value)}
                    />
                        </FloatingLabel>
                    <Form.Control
                        type="text"
                        placeholder="Enter id_locality"
                        name="id_locality"
                        value={id_locality}
                        onChange={(e) => setLocality(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_group"
                        name="id_group"
                        value={id_group}
                        onChange={(e) => setGroup(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_visit_status"
                        name="id_visit_status"
                        value={id_visit_status}
                        onChange={(e) => setVisitStatus(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_agreement"
                        name="id_agreement"
                        value={id_agreement}
                        onChange={(e) => setAgreement(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_contacted_referrer"
                        name="id_contacted_referrer"
                        value={id_contacted_referrer}
                        onChange={(e) => setContactedReferrer(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_address"
                        name="id_address"
                        value={id_address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_logo"
                        name="id_logo"
                        value={id_logo}
                        onChange={(e) => setLogo(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Form.Group>
                <Button onClick={postVisit}>Submit</Button>
            </Form.Group>
        </Container>
    );

};
export default AddVisitPage;