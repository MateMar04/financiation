import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Col, Container, Row} from "react-bootstrap";
import FlotantButton from "../components/FlotantButton";
import {Link} from "react-router-dom";
import {Pagination} from "antd";
import {VisitCard} from "../components/VisitCard";
import "../assets/styles/VisitPage.css"


export const VisitsPage = () => {

    useEffect(() => {
        getVisits(authTokens.access).then(r => {
            setVisits(r);
            setFilteredVisits(r);
        });
    }, [])

    let {authTokens} = useContext(AuthContext)
    let [visits, setVisits] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const totalItems = visits.length;
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVisits, setFilteredVisits] = useState([]);
    const [filterActive, setFilterActive] = useState(false);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = filterActive
    ? filteredVisits.slice(startIndex, endIndex)
    : visits.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSizeChange = (number) => {

    };
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        const filtered = visits.filter((visit) => {
            return (
                visit.location && visit.location.toLowerCase().includes(query) 
            );
        });
    
        setFilteredVisits(filtered);
    };  


    return (


        <Container>
            <Container>
                <Link to='/visit/add/'>
                    <FlotantButton name={'Nueva Visita'}/>
                </Link>
            </Container>
            <Row className='justify-content-center text-center'>
                <Col md={10}>
                    <TextField
                        fullWidth
                        id="SearchVisit"
                        variant="outlined"
                        label='Buscar'
                        className="SearchVisit"
                        InputProps={{
                            sx: {borderRadius: 5, color: "black"},
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            ),
                        }}
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </Col>
            </Row>

            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={8}>
                        {currentData?.map(visit => (<VisitCard visit={visit}/>))}
                    </Col>

                </Row>
                {filterActive ? null : (
                <Pagination
                    className="justify-content-center text-center visit-pagination-menu"
                    defaultCurrent={1}
                    onChange={handlePageChange}
                    total={totalItems}
                    defaultPageSize={10}
                    showSizeChanger={false}
                    current={currentPage}
                />
                )}
            </Container>
        </Container>
    )
}
