import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getGroups } from "../services/GroupServices"
import '../assets/styles/GroupsPage.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import FlotantButton from "../components/FlotantButton";
import LoadingModal from "../components/LoadingModal";
import SucceedModal from "../components/SucceedModal";

export const GroupsPage = () => {
    let { authTokens } = useContext(AuthContext)
    let [groups, setGroups] = useState([])
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [showloading, setShowloading] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);

    const handleDeleteSuccess = () => {
        toggleModalsucceed();
        setDeleteTrigger((prev) => !prev);
    };

    useEffect(() => {
        console.log(showloading)
        setShowloading(true);
        console.log(showloading)
        getGroups(authTokens.access)
        .then((data) => {
          setGroups(data);
        })
        .finally(() => {
          setShowloading(false);
        });
    }, [authTokens.access, deleteTrigger]);

    return (
        <div>
            <Container>
            <SucceedModal onClose={() => toggleModalsucceed()} message="la visita" show={showsuccess} />
                <Link to='/groups/add'>
                    <FlotantButton name='Nuevo Grupo'/>
                    </Link>
                {groups?.map((group) => (
                    <Container>
                        <GroupCard group={group} onDeleteSuccess={handleDeleteSuccess} />
                    </Container>
                ))}
            </Container>
            <Container> 
                <LoadingModal message="cargando" show={showloading}/>
            </Container>
        </div>
    )
}
