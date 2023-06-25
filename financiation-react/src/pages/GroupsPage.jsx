import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import GroupCard from "../components/GroupCard";
import {Container} from "react-bootstrap";

export const GroupsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    let [groups, setGroups] = useState([])
    let history = useNavigate()

    useEffect(() => {
        getAdvisors()
        getCoordinators()
        getGroups()
    }, [])

    let getAdvisors = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/advisor/', {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };

    let getCoordinators = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/coordinator/', {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };

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
                <GroupCard group={group} coordinators={coordinators} advisors={advisors}/>
            ))}
        </Container>


    )
}
