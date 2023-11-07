import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {getVisits} from "../services/VisitServices";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Col, Container, Row} from "react-bootstrap";
import FlotantButton from "../components/FlotantButton";
import { Link } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";


import {Link} from "react-router-dom";
import {Pagination} from "antd";
import {VisitCard} from "../components/VisitCard";
import "../assets/styles/VisitPage.css"


export const VisitsPage = () => {

    useEffect(() => {
        // Muestra el modal de carga antes de iniciar la carga de visitas
        setShowloading(true);
    
        getVisits(authTokens.access)
          .then((data) => {
            setVisits(data);
          })
          .finally(() => {
            // Oculta el modal de carga una vez que la carga se completa (independientemente de si tuvo éxito o no)
            setShowloading(false);
          });
      }, []);

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
            <Container> 
                <LoadingModal message="cargando" show={showloading}/>
            </Container>
        </Container>
    )
}
