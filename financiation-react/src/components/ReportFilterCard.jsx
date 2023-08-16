import {Card, Container, Form} from "react-bootstrap";
import RowWithCheck from "./RowWithCheck";
import React from "react";

export const ReportFilterCard = ({title, items, tokens}) => {
    return (
        <Card className='filter-card'>
            <h1>{title}</h1>
            <Container className='filter-card-scroll'>
                <Form>
                    {items?.map((item) => (
                        <RowWithCheck item={item} tokens={tokens}></RowWithCheck>
                    ))}
                </Form>
            </Container>
        </Card>
    )
}
