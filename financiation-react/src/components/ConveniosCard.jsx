import React from "react";
import { Col, Row, Container } from 'react-bootstrap';
import { Card, MenuItem, Select, CardContent, Switch, Button,Checkbox } from '@mui/material';


export const ConveniosCard = () => {
    return (

        <Col className='CenterContent'>
            <Card className={'CardVisitConvenios'}>
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
                                    <Checkbox />
                                </Col>
                                <Col>
                                    <p>{'Convenio 1'}</p>
                                </Col>
                            </Row>
                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <Checkbox />
                                </Col>
                                <Col>
                                    <p>{'Convenio 2'}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <Checkbox />
                                </Col>
                                <Col>
                                    <p>{'Convenio 3'}</p>
                                </Col>
                            </Row>
                            <Row className='justify-content-center text-center'>
                                <Col>
                                    <Checkbox />
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

    );
}

export default ConveniosCard