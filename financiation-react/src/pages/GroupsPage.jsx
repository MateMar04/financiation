import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getGroups } from "../services/GroupServices"
import '../assets/styles/GroupsPage.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";


export const GroupsPage = () => {
    let { authTokens } = useContext(AuthContext)
    let [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroups(data))
    }, [])

    return (
        <div>
            <Container>
                <Link to='/groups/add'>
                    <Fab
                        variant="extended"
                        size='medium'
                        className="BtnFlotante"
                        color="primary"
                        >
                        <AddIcon />
                        Nuevo Grupo
                    </Fab>
                    </Link>
                {groups?.map((group) => (
                    <Container>
                        <GroupCard group={group} />
                    </Container>
                ))}
            </Container>
        </div>
    )
}
