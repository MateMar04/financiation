import {Card, Container, Form} from "react-bootstrap";
import RowWithCheck from "./RowWithCheck";
import React, {useContext} from "react";
import ReportsContext from "../context/ReportsContext";

export const ReportFilterCard = ({title, items}) => {

    let {dataHandler} = useContext(ReportsContext)

    return (
        <Card className='filter-card'>
            <h1>{title}</h1>
            <Container className='filter-card-scroll'>
                <Form onChange={(e) => dataHandler(title, e)}>
                    {items?.map((item) => (
                        <RowWithCheck item={item}></RowWithCheck>
                    ))}
                </Form>
            </Container>
        </Card>
    )
}
