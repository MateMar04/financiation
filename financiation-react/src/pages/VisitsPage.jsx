import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {Col, Container, Row} from "react-bootstrap";
import FlotantButton from "../components/FlotantButton";
import {Link} from "react-router-dom";
import {Pagination, Select} from "antd";
import {VisitCard} from "../components/VisitCard";
import "../assets/styles/VisitPage.css"


export const VisitsPage = () => {

    useEffect(() => {
        getVisits(authTokens.access).then(r => setVisits(r))
    }, [])

    let {authTokens} = useContext(AuthContext)
    let [visits, setVisits] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const totalItems = visits.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = visits.slice(startIndex, endIndex)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSizeChange = (number) => {

    };
    const getItemNames = (array) => {
        return array?.map(item => ({
            label: item.name,
            value: item.id
        }));
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (


        <Container>
            <Container>
                <Link to='/visit/add/'>
                    <FlotantButton name={'Nueva Visita'}/>
                </Link>
            </Container>

            <Row className='justify-content-center text-center'>
                <Col md={10}>
                    <Select placeholder={"Buscar Visita"} className="visit-field"
                            options={getItemNames(visits)}
                            showSearch
                            optionFilterProp="children"
                            filterOption={filterOption}
                    />
                </Col>
            </Row>

            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={8}>
                        {currentData?.map(visit => (<VisitCard visit={visit}/>))}
                    </Col>

                </Row>
                <Pagination className='justify-content-center text-center visit-pagination-menu'
                            defaultCurrent={1}
                            onChange={handlePageChange}
                            total={totalItems}
                            defaultPageSize={10}
                            showSizeChanger={false}
                            current={currentPage}/>

            </Container>
        </Container>
    )
}
