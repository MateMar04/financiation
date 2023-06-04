import React from "react";
import "../assets/styles/VisitRegisterPage.css";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';

const VisitRegisterPage = () => {
    const localidades = ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D', 'Ciudad E'];
    const lugar = ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D', 'Ciudad E'];
    const grupo = ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4', 'Grupo 5'];
    const visitstatus = ['Confirmado', 'Pendiente'];
    const agreement = ['Si', 'No'];
    const contactedreferrer = ['Ventas', 'Marketing', 'Desarrollo', 'Recursos Humanos', 'Operaciones'];
    const address = ['Si', 'No'];
    const logo = ['Si', 'No'];

    return (
        <Container fluid className="general" id="RegistroVisita">

            <Container id="Rowcontent">
                <Container>
                    <Row>
                        <h2 id="tittle">Registro de Visitas</h2>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Flyer"/>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Distancia"/>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Tiempo de Viaje"/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control id="inputt" type="date" className="col-12" name="dob"
                                          placeholder="Fecha Visita"/>
                        </Col>
                        <Col>
                            <Form id="inputt" className="col-12">
                                <Form.Check>
                                    <Form.Check.Input/>
                                    <Form.Check.Label>Registro Civil</Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Hospedaje"/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form id="inputt">
                                <Form.Check id="checkbox1">
                                    <Form.Check.Input/>
                                    <Form.Check.Label>Modernization Fund</Form.Check.Label>
                                </Form.Check>
                            </Form>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Start Time"/>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" type="text" className="col-12" placeholder="Finish Time"/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Lugar</option>
                                {lugar.map((lugar, index) =>
                                    (<option key={index} value={lugar}>{lugar}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Localidad</option>
                                {localidades.map((localidad, index) =>
                                    (<option key={index} value={localidad}>{localidad}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Grupo</option>
                                {grupo.map((grupo, index) =>
                                    (<option key={index} value={grupo}>{grupo}</option>))}</Form.Control>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Visit Status</option>
                                {visitstatus.map((visitstatus, index) =>
                                    (<option key={index} value={visitstatus}>{visitstatus}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Agreement</option>
                                {agreement.map((agreement, index) =>
                                    (<option key={index} value={agreement}>{agreement}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Contacto Referente</option>
                                {contactedreferrer.map((contactedreferrer, index) =>
                                    (<option key={index} value={contactedreferrer}>{contactedreferrer}</option>))}
                            </Form.Control>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Address</option>
                                {address.map((address, index) =>
                                    (<option key={index} value={address}>{address}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Form.Control id="inputt" className="col-12" as="select">
                                <option value="">Logo</option>
                                {logo.map((logo, index) =>
                                    (<option key={index} value={logo}>{logo}</option>))}</Form.Control>
                        </Col>
                        <Col>
                            <Button id="bt1" variant="primary" className="col-12">Registrar</Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Container>
    )
}

export default VisitRegisterPage;





