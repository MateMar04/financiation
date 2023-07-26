import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import GroupCard from "../components/GroupCard";
import {Container} from "react-bootstrap";

export const GroupsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [groups, setGroups] = useState([])
    let history = useNavigate()

    useEffect(() => {
        getGroups()
    }, [])

    let getGroups = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/group/', {headers: headers})
        let data = await response.json()
        setGroups(data)
    };

    return (
        <Container>
            {groups?.map((group) => (
                <GroupCard group={group}/>
            ))}
            <hr/>
        </Container>


    )
}
