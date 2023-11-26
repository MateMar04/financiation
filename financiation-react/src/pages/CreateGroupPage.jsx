import React, {useContext, useState, useEffect} from "react";
import {Container, Col, Row, Form} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"
import {getUsers} from "../services/UserServices";
import {UserCard} from "../components/UserCard";
import LoadingModal from "../components/LoadingModal";
import GroupNameModal from "../components/GroupNameModal";
import {OrderedListOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import { Button, Input} from 'antd';

export const CreateGroupPage = () => {
    const {Search} = Input;
    let {authTokens} = useContext(AuthContext);
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


    const setSelectedRole = (role) => {
        console.log('Selected Role:', role);
    };

    const handleCheckboxChange = (userId, selectedRole) => {
        setUserCheckboxes((prevUserCheckboxes) => {
            const updatedCheckboxes = {
                ...prevUserCheckboxes,
                [userId]: {checked: !prevUserCheckboxes[userId]?.checked, role: selectedRole},
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
                [userId]: {checked: prevUserCheckboxes[userId]?.checked, role: selectedRole},
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
            const newUserCheckboxes = {...prevUserCheckboxes};
            filteredUsers.forEach((user) => {
                newUserCheckboxes[user.id] = newUserCheckboxes[user.id] || {checked: false, role: null};
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
            <SucceedModal message="el coordinador" onClose={() => toggleModalsucceed()} show={showsuccess}/>
            <FailedModal message="el coordinador" onClose={() => toggleModalfailed()} show={showfail}/>
            <GroupNameModal onClose={() => toggleModalGroupCreate()} show={showgroupcreate}
                            selectedAdvisors={selectedAdvisors} selectedCoordinators={selectedCoordinators}/>

            <Container>
                <Row className={'justify-content-center d-flex align-items-center'}>
                    <Col md={{ order: 1, span: 2}} xs={{ order: 1, span: 6}}>
                        <Button href="/groups/" className="SeeGroupsButton" size={'large'} shape="round" icon={<OrderedListOutlined />}>Ver grupos</Button>
                    </Col>

                    <Col className='text-center justify-content-center' xs={{ order: 3 }} md={{order:2}}>
                        <Input
                            placeholder='Buscar persona'
                            value={searchQuery}
                            className="SearchCreateGroup"
                            onChange={handleSearch}
                        />
                    </Col>

                    <Col  xs={{ order: 2, span: 6 }} md={{order:3, span: 2}}>
                        <Button type={'primary'} className="CreateGroupsButton" onClick={() => toggleModalGroupCreate()} size={'large'} shape="round" icon={<UsergroupAddOutlined/>}>Crear grupo</Button>
                    </Col>

                </Row>
                <Row className={'text-center'}>
                    <Col>
                        <a>Seleccione el rol que tendrá el usuario antes de agregarlo</a>
                    </Col>
                </Row>
            </Container>

             <Container className="justify-content-center">
                {filteredUsers.map((user, i) => (
                    <Container key={i} className="containerUserCard justify-content-center ">
                        <Row>
                            <Col xs={12}>
                        <UserCard
                            user={user}
                            isChecked={userCheckboxes[user.id]?.checked}
                            onCheckboxChange={handleCheckboxChange}
                            onRoleChange={handleRoleChange}  // Passed onRoleChange as a prop
                            defaultRole={userCheckboxes[user.id]?.role}
                        />
                                </Col>
                            </Row>
                    </Container>
                ))}
            </Container>
        </Container>
    )
}
