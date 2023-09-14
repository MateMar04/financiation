import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getGroups } from "../services/GroupServices"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export const GroupsPage = () => {
    let { authTokens } = useContext(AuthContext)
    let [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroups(data))
    }, [])

    return (
        <div>
            <Container>
                <Fab
                    size='medium'
                    className="BtnFlotante"
                    color="primary">
                    <AddIcon />
                </Fab>

                {groups?.map((group) => (
                    <Container>
                        <GroupCard group={group} />
                    </Container>
                ))}
            </Container>
        </div>
    )
}
