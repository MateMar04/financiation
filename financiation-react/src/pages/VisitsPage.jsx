import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { VisitCard } from "../components/VisitCard";
import { getVisits } from "../services/VisitServices";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import FlotantButton from "../components/FlotantButton";
import { Link } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";




export const VisitsPage = () => {

    let { authTokens } = useContext(AuthContext)
    let [visits, setVisits] = useState([])
    let [loading, setLoading] = useState(true)
    
    const [showloading, setShowloading] = useState(false);
   


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

    return (


        <Container>
            <Container>
                <Link to='/visit/add/'>
                    <FlotantButton name={'Nueva Visita'} />
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
                            sx: { borderRadius: 5, color: "black" },
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Col>
            </Row>

            <Container>
                <Row className='justify-content-center text-center'>
                    <Col md={8}>
                        {visits?.map((visit) => (

                            <VisitCard visit={visit} />

                        ))}
                    </Col>
                </Row>

            </Container>
            <Container> 
                <LoadingModal message="cargando" show={showloading}/>
            </Container>
        </Container>
    )
}
