import React, {useContext, useState, useEffect} from "react";
import {Button, Container, Col, Row, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {getAdvisorUsers} from "../services/AdvisorServices";
import GroupsIcon from '@mui/icons-material/Groups';
import CoordinatorCard from "../components/CoordinatorCard";
import AdvisorCard from "../components/AdvisorCard";

export const CreateGroupPage = () => {
    let {authTokens} = useContext(AuthContext)
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    let [coordinators, setCoordinators] = useState([])
    let [advisors, setAdvisors] = useState([])

    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);

    useEffect(() => {
        getCoordinatorUsers(authTokens.access).then(data => setCoordinators(data))
        getAdvisorUsers(authTokens.access).then(data => setAdvisors(data))
    }, [])

    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/groups', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postGroup()
        } else if (response.status === 500) {
            toggleModalfailed();
            await postGroup()
        } else if (response.status === 401) {
            toggleModalfailed();
            await postGroup()
        } else if (response.status === 400) {
            toggleModalfailed();
            await postGroup()
        }
    }

    return (
        <Container fluid>
            <SucceedModal message="el coordinador" show={showsuccess}/>
            <FailedModal message="el coordinador" show={showfail}/>

            <Form onSubmit={postGroup}>
                <Container>
                    <Row className={'justify-content-center'}>
                        <Col md={8} xs={9}>
                            <TextField
                                fullWidth
                                id="standard-bare"
                                variant="outlined"
                                label={'Buscar Persona'}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton>
                                            <SearchIcon/>
                                        </IconButton>
                                    ),
                                }}
                            />
                        </Col>
                        <Col md={1} xs={1} lg={1}>
                            <IconButton  href="http://localhost:3000/groups/" sx={{width: 56, height: 56} }
                                        className={'GroupsIcon'}><GroupsIcon/></IconButton>
                        </Col>
                    </Row>
                </Container>

                <div>
                    {coordinators?.map((coordinator) => (
                        <Container>
                            <CoordinatorCard coordinator={coordinator} addToGroup={handdlerOpenDrawer} />
                        </Container>
                    ))}
                </div>
                    
                <div>
                    {advisors?.map((advisor) => (
                        <Container>
                            <AdvisorCard advisor={advisor} addToGroup={handdlerOpenDrawer} />
                        </Container>
                    ))}
                </div>  

                <Container>
                        <Row className='justify-content-center'>
                            <Col md={2} xs={4}>
                                <Form.Group>
                                    <Button type="submit" size="medium" variant="outline-primary">Crear Grupo</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                </Container>

            </Form>
        </Container>
    )
}
