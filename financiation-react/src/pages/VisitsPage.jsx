import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { VisitCard } from "../components/VisitCard";
import { getVisits } from "../services/VisitServices";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Card, Col, Container, Row } from "react-bootstrap";



export const VisitsPage = () => {

    let { authTokens } = useContext(AuthContext)
    let [visits, setVisits] = useState([])


    useEffect(() => {
        getVisits(authTokens.access).then(r => setVisits(r))
    }, [])

    return (
        <Container>
            <Container>
            <Row className='justify-content-center text-center'>
                    <Col md={12}>
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
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
                </Col>
                </Row>
            </Container>
            <Container>
            <Row className='justify-content-center text-center'>
                    <Col md={8}>
                {visits?.map((visit) => (
                    
                    <VisitCard visit={visit} />
                 
                ))}
                </Col>
                </Row>
              
            </Container>
        </Container>
    )
}
