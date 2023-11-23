import {Card, Container, Form} from "react-bootstrap";
import RowWithCheck from "./RowWithCheck";
import React, {useContext} from "react";
import ReportsContext from "../context/ReportsContext";
import "../assets/styles/ReportsPage.css"


export const ReportFilterCard = ({title, items}) => {

    let {dataHandler} = useContext(ReportsContext)

    return (
        <Card className='filter-card'>
            <h1 className="titulolocalidad" >{title}</h1>
            <Container className='filter-card-scroll'>
                <Form onChange={(e) => dataHandler(title, e)}>
                    {items?.map((item, i) => (
                        <RowWithCheck key={i} item={item}></RowWithCheck>
                    ))}
                </Form>
            </Container>
        </Card>
    )
}
