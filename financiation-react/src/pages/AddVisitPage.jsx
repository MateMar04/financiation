import React, {useContext} from 'react';
import "../assets/styles/AddVisitPage.css"
import {Button, Container, Form} from "react-bootstrap";
import AuthContext from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const AddVisitPage = () => {


    let {authTokens} = useContext(AuthContext)
    let history = useNavigate()

    let postVisit = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/visit/add/', {
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
            history('/')
        } else {
            alert('Something went wrong')
        }
    }

    return (

        <Container className="scrolling">
            <Form onSubmit={postVisit}>
                <Form.Group>
                    <Form.Control
                        type="number"
                        placeholder="Enter Flyer"
                        name="flyer"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter Distance"
                        name="distance"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter Travel Time"
                        name="travel_time"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter visit date"
                        name="visit_date"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter registro civil"
                        name="civil_registration"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter accommodation"
                        name="accommodation"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter modernization fund"
                        name="modernization_fund"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter start time"
                        name="start_time"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter finish time"
                        name="finish_time"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter place_name"
                        name="place_name"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_locality"
                        name="id_locality"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_group"
                        name="id_group"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_visit_status"
                        name="id_visit_status"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_agreement"
                        name="id_agreement"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_contacted_referrer"
                        name="id_contacted_referrer"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_address"
                        name="id_address"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Enter id_logo"
                        name="id_logo"
                    />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </Container>
    );

};
export default AddVisitPage;