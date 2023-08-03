import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import GroupCard from "../components/GroupCard";
import {Container} from "react-bootstrap";
import {getGroups} from "../services/GroupServices"

export const GroupsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [groups, setGroups] = useState([])
    let history = useNavigate()

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroups(data))
    }, [])


    return (
        <>
        {groups?.map((group) => (
            <Container>
                <GroupCard group={group}/>
            </Container>
        ))}
        </>

)
}
