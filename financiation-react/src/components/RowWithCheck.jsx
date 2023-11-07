import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import '../assets/styles/RowWithCheck.css';
import "../assets/styles/ReportsPage.css";

export const RowWithCheck = ({ item }) => {
  const [isChecked, setIsChecked] = useState(item.checked);

  useEffect(() => {
    setIsChecked(item.checked);
  }, [item.checked]);

  const handleRowClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Row key={item.id} className="labelfondo" >
      <Col className='row-label'>
        <Form.Label>{item.name}</Form.Label>
      </Col>
      <Col className='row-check'>
        <Form.Check id={item.id} value={item.id} checked={isChecked} onClick={handleRowClick} className="custom-checkbox" ></Form.Check>
      </Col>
    </Row>
  );
}

export default RowWithCheck;