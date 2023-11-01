import React from "react";
import {Col, Container, Row} from 'react-bootstrap';
import Card from '@mui/material/Card';
import {CardContent, MenuItem, Switch, TextField} from "@mui/material";


function InputField({label, type}) {
    return (
        <TextField
            id="standard-basic"
            label={label}
            variant="standard"
            type={type}
            className='InputVisit'
        />
    );
}

function SelectField({label, data}) {
    return (
        <TextField
            id="standard-select-currency"
            select
            label={label}
            variant="standard"
            className='InputVisit'
        >
            {data?.map(d => <MenuItem value={d.id}>{d.name}</MenuItem>)}
        </TextField>
    );
}

function SelectUserField({label, data}) {
    return (
        <TextField
            id="standard-select-currency"
            select
            label={label}
            variant="standard"
            className='InputVisit'
        >
            {data?.map(d => <MenuItem value={d.id}>{d.first_name} {d.last_name}</MenuItem>)}
        </TextField>
    );
}

export const CardItem = ({icon, label, inputLabel1, inputLabel2, type, isSelect, isSwitch, data, isUser}) => {
    return (
        <Col className='CenterContent'>
            <Card className={'CardVisit'}>
                <CardContent className={'CenterContent'}>
                    <Container>
                        <Row className="justify-content-center">
                            {icon}
                        </Row>
                        <Row className='justify-content-center text-center'>
                            <a>{label}</a>
                        </Row>
                        <Row className='justify-content-center text-center'>
                            <Col>
                                {isSelect ? (
                                    isUser ? (<SelectUserField label={label} data={data}/>) :
                                        (<SelectField label={label} data={data}/>)

                                    ) : isSwitch ? (
                                    <Switch/>
                                    ) : (
                                    <>
                                {inputLabel1 && <InputField label={inputLabel1} type={type}/>}
                            {inputLabel2 && <InputField label={inputLabel2} type={type}/>}
                        </>
                        )}
        </Col>
</Row>
</Container>
</CardContent>
</Card>
</Col>
)
    ;
}

export default CardItem
