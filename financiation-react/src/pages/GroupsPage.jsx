import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import GroupCard from "../components/GroupCard";
import {Container} from "react-bootstrap";
import {getGroups} from "../services/GroupServices"
import {getUser} from "../services/UserServices";


export const GroupsPage = () => {

    let {authTokens} = useContext(AuthContext)
    let [groups, setGroups] = useState([])
    let history = useNavigate()
    let [user, setUser] = useState()

    console.log(groups)

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroups(data))
        getUser(authTokens.access).then(data => setUser(data))
    }, [])


    return (
        <fragment>
        {groups?.map((group) => (
            <Container>
                <GroupCard group={group}/>
            </Container>
        ))}
        </fragment>

)
}
