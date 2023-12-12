import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import { Container } from "react-bootstrap";
import { getGroups } from "../services/GroupServices"
import '../assets/styles/GroupsPage.css'

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
        setDeleteTrigger((prev) => !prev);
    };

    useEffect(() => {
        setShowloading(true);
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
                {groups?.map((group, i) => (
                    <Container key={i}>
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
