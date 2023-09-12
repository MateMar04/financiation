import {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import GroupCard from "../components/GroupCard";
import {Container} from "react-bootstrap";
import {getGroups} from "../services/GroupServices"

export const GroupsPage = () => {
    let {authTokens} = useContext(AuthContext)
    let [groups, setGroups] = useState([])

    useEffect(() => {
        getGroups(authTokens.access).then(data => setGroups(data))
    }, [])

    return (
        <div>
            <Container>
                {groups?.map((group) => (
                    <Container>
                        <GroupCard group={group}/>
                    </Container>
                ))}
            </Container>
        </div>
    )
}
