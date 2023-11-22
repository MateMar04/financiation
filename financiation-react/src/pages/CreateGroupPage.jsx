import React, { useContext, useState, useEffect } from "react";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { SucceedModal } from "../components/SucceedModal"
import { FailedModal } from "../components/FailedModal"
import { getUsers } from "../services/UserServices";
import GroupsIcon from '@mui/icons-material/Groups';
import { UserCard } from "../components/UserCard";
import { Popover } from 'antd';
import FlotantButton from "../components/FlotantButton";
import LoadingModal from "../components/LoadingModal";
import GroupNameModal from "../components/GroupNameModal";
import { PropertySafetyFilled } from "@ant-design/icons";

export const CreateGroupPage = () => {
    let { authTokens } = useContext(AuthContext);
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userCheckboxes, setUserCheckboxes] = useState({});
    const [showloading, setShowloading] = useState(false);
    const [showgroupcreate, setShowGroupCreate] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);
    const toggleModalGroupCreate = () => setShowGroupCreate(!showgroupcreate);
    const [selectedAdvisors, setSelectedAdvisors] = useState([]);
    const [selectedCoordinators, setSelectedCoordinators] = useState([]);
    
    const content = (
        <a></a>
    );
    
    const setSelectedRole = (role) => {
        console.log('Selected Role:', role);
    };

    const handleCheckboxChange = (userId, selectedRole) => {
        setUserCheckboxes((prevUserCheckboxes) => {
            const updatedCheckboxes = {
                ...prevUserCheckboxes,
                [userId]: { checked: !prevUserCheckboxes[userId]?.checked, role: selectedRole },
            };
    
            console.log('Updated userCheckboxes:', updatedCheckboxes);
    
            // Capture the selected role directly from the event
            setSelectedRole(selectedRole);
    
            setSelectedCoordinators((prevCoordinators) =>
                updatedCheckboxes[userId]?.checked && selectedRole === 'coordinador'
                    ? [...prevCoordinators, userId]
                    : prevCoordinators.filter((id) => id !== userId)
            );
    
            setSelectedAdvisors((prevAdvisors) =>
                updatedCheckboxes[userId]?.checked && selectedRole === 'asesor'
                    ? [...prevAdvisors, userId]
                    : prevAdvisors.filter((id) => id !== userId)
            );
    
            return updatedCheckboxes;
        });
    };
    const handleRoleChange = (userId, selectedRole) => {
        setUserCheckboxes((prevUserCheckboxes) => {
            // Your logic for handling role changes in the CreateGroupPage component
            console.log(`Role change for user ${userId} to ${selectedRole}`);
            const updatedCheckboxes = {
                ...prevUserCheckboxes,
                [userId]: { checked: prevUserCheckboxes[userId]?.checked, role: selectedRole },
            };
    
            // Capture the selected role directly from the event
            setSelectedRole(selectedRole);
    
            setSelectedCoordinators((prevCoordinators) =>
                updatedCheckboxes[userId]?.checked && selectedRole === 'coordinador'
                    ? [...prevCoordinators, userId]
                    : prevCoordinators.filter((id) => id !== userId)
            );
    
            setSelectedAdvisors((prevAdvisors) =>
                updatedCheckboxes[userId]?.checked && selectedRole === 'asesor'
                    ? [...prevAdvisors, userId]
                    : prevAdvisors.filter((id) => id !== userId)
            );
    
            // Call onRoleChange prop to handle role change
            // onRoleChange(userId, selectedRole);
    
            return updatedCheckboxes;
        });
    };
    
    
    

    useEffect(() => {

        setShowloading(true)
        getUsers(authTokens.access)
        .then((data) => {
          setUsers(data);
          setFilteredUsers(data);
        })
        .finally(() => {
          setShowloading(false);
        });
    }, [authTokens.access]);

    useEffect(() => {
        console.log('Initial userCheckboxes state:', userCheckboxes);
        setUserCheckboxes((prevUserCheckboxes) => {
            const newUserCheckboxes = { ...prevUserCheckboxes };
            filteredUsers.forEach((user) => {
                newUserCheckboxes[user.id] = newUserCheckboxes[user.id] || { checked: false, role: null };
            });
            return newUserCheckboxes;
        });
    }, [filteredUsers]);

    useEffect(() => {
        console.log('Updated Selected Advisors:', selectedAdvisors);
        console.log('Updated Selected Coordinators:', selectedCoordinators);
    }, [selectedAdvisors, selectedCoordinators]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    
        const filtered = users.filter((user) => {
            const fullName = `${user.first_name} ${user.last_name}`;
            return (
                fullName.toLowerCase().includes(query) ||
                user.first_name.toLowerCase().includes(query) ||
                user.last_name.toLowerCase().includes(query)
            );
        });
    
        setFilteredUsers(filtered);
    };   

    return (
        <Container fluid>
            <LoadingModal message="cargando" show={showloading}/>
            <SucceedModal message="el coordinador" onClose={() => toggleModalsucceed()} show={showsuccess} />
            <FailedModal message="el coordinador" onClose={() => toggleModalfailed()} show={showfail} />
            <GroupNameModal onClose={() => toggleModalGroupCreate()} show={showgroupcreate} selectedAdvisors={selectedAdvisors} selectedCoordinators={selectedCoordinators}/>

                <Container className="separation font text-center justify-content-center">
                    <Row className='justify-content-center text-center'>
                        <Col md={10}>
                            <TextField
                                fullWidth
                                id="SearchVisit"
                                variant="outlined"
                                label='Buscar'
                                className="SearchVisit"
                                InputProps={{
                                    sx: { borderRadius: 5, color: "black" },
                                    endAdornment: (
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    ),
                                }}
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </Col>

                        <Col md={2} xs={1} lg={1}>
                        <Popover content={content} title="Ver Grupos Creados">
                        <IconButton href="/groups/" id="icongroupgrupo" sx={{ width: 56, height: 56 }}
                                className={'GroupsIcon'}><GroupsIcon/></IconButton>
                        </Popover> 
                        </Col>
                    </Row>
                </Container>

                <Container className="justify-content-center">
                {filteredUsers.map((user, i) => (
                        <Container key={i} className="containerUserCard justify-content-center text-center">
                            <UserCard
                                user={user}
                                isChecked={userCheckboxes[user.id]?.checked}
                                onCheckboxChange={handleCheckboxChange}
                                onRoleChange={handleRoleChange}  // Passed onRoleChange as a prop
                                defaultRole={userCheckboxes[user.id]?.role}
                            />
                        </Container>
                    ))}
                </Container>

                <Row className='text-center'>
                    <Col>
                        <Form.Group onClick={() =>toggleModalGroupCreate()}> 
                            <FlotantButton name='' />
                        </Form.Group>
                    </Col>
                </Row>
        </Container>
    )
}
