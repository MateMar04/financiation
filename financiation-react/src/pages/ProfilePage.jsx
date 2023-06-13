import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import ProfilePicture from "../components/ProfilePicture";
import tut from "../assets/images/Tute.jpg";
import ProfileData from "../components/ProfileData";
import "../assets/styles/ProfilePage.css"
import ProfileModifyForm from "../components/ProfileModifyForm";

const ProfilePage = () => {
    return (
        <Container fluid>
            <Card>
                <Row>
                    <Col lg={4}>
                        <ProfilePicture profileImg={tut} username={"Mateo"}/>
                    </Col>
                    <Col lg={8}>
                        <ProfileData username={"MateMar"} firstName={"Mateo"} lastName={"Marchisone"}
                                     email={"mateo.marchisone@gmail.com"} ssn={"20459344730"}
                                     phone_number={3513497968}/>
                    </Col>
                </Row>
            </Card>

            <Container>
                <ProfileModifyForm/>
            </Container>
        </Container>
    );
}


export default ProfilePage