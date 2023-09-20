import React from "react";
import {Col, Row, Container} from 'react-bootstrap';
import Card from '@mui/material/Card';
import { CardContent, Switch, TextField, MenuItem } from "@mui/material";


function InputField ({ label, type }){
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

  function SelectField({ label }) {
    return (
      <TextField
        id="standard-select-currency"
        select
        label={label}
        variant="standard"
        className='InputVisit'
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </TextField>
    );
  }
  
export const CardItem = ({icon, label, inputLabel1, inputLabel2, type, isSelect, isSwitch}) => {
    return (
        <Col className='CenterContent'>
        <Card  className={'CardVisit'}>
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
                  <SelectField/>
                ) : isSwitch ? (
                  <Switch  />
                ) : (
                  <>
                    {inputLabel1 && <InputField label={inputLabel1} type={type} />}
                    {inputLabel2 && <InputField label={inputLabel2} type={type} />}
                  </>
                )}
              </Col>
            </Row>
            </Container>
          </CardContent>
        </Card>
      </Col>
    );
  }

  export default CardItem
