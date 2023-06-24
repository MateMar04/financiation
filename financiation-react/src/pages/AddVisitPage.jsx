import React, {useContext, useEffect, useState} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
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

    let [setLocalities] = useState([])
    let [visit, setVisit] = useState(null)
    let {authTokens} = useContext(AuthContext)

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
                    <Form.Control
                        type="text"
                        placeholder="Enter Distance"
                        name="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter Travel Time"
                        name="travel_time"
                        value={travel_time}
                        onChange={(e) => setTravelTime(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter visit date"
                        name="visit_date"
                        value={visit_date}
                        onChange={(e) => setVisitDate(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter registro civil"
                        name="civil_registration"
                        value={civil_registration}
                        onChange={(e) => setCivilRegistration(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter accommodation"
                        name="accommodation"
                        value={accommodation}
                        onChange={(e) => setAccommodation(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter modernization fund"
                        name="modernization_fund"
                        value={modernization_fund}
                        onChange={(e) => setModernizationFund(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter start time"
                        name="start_time"
                        value={start_time}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter finish time"
                        name="finish_time"
                        value={finish_time}
                        onChange={(e) => setFinishTime(e.target.value)}
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter place_name"
                        name="place_name"
                        value={place_name}
                        onChange={(e) => setPlaceName(e.target.value)}
                    />
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