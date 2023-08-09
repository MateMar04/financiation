import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Container, Form, Modal, Row} from "react-bootstrap";
import '../assets/styles/CreateGroupPage.css'
import AuthContext from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import Check from "../assets/images/checked.gif";
import {getAdvisorUsers} from "../services/AdvisorServices";
import {getCoordinatorUsers} from "../services/CoordinatorServices";
import {UserRowWithRadio} from "../components/UserRowWithRadio";
import {UserRowWithCheck} from "../components/UserRowWithCheck";
import Button from '@mui/material/Button';
import {SideBarGroups} from "../components/SideBarGroups";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box, {BoxProps} from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {SucceedModal} from "../components/SucceedModal"
import {FailedModal} from "../components/FailedModal"


export const CreateGroupPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);


    let {authTokens} = useContext(AuthContext)
    let [advisors, setAdvisors] = useState([])
    let [coordinators, setCoordinators] = useState([])
    const [show, setShow] = useState([false])
    const [showfail, setShowfailture] = useState(false);
    const [showsuccess, setShowsuccese] = useState(false);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    const toggleModalfailed = () => setShowfailture(!showfail);


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    useEffect(() => {
        getAdvisor()
        getCoordinator()
    }, [])

    let getAdvisor = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/advisor/', {headers: headers})
        let data = await response.json()
        setAdvisors(data)
    };

    let getCoordinator = async () => {
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        }
        let response = await fetch('/api/coordinator/', {headers: headers})
        let data = await response.json()
        setCoordinators(data)
    };
    
    let postGroup = async (e) => {
        e.preventDefault()
        let response = await fetch('/api/group/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "JWT " + String(authTokens.access),
                "Accept": "application/json"
            },
            body: JSON.stringify({"name": e.target.name.value})
        })
        if (response.status === 200) {
            toggleModalsucceed();
            await postGroup()

        } else if(response.status == 500){
            toggleModalfailed(); 
            await postGroup() 
        } else if(response.status == 401){
            toggleModalfailed();
            await postGroup() 
        } else if(response.status == 400){
            toggleModalfailed();
            await postGroup() 

        }
    }


    return (
        <Container fluid>
            <SucceedModal message="el coordinador" show ={showsuccess}/>
            <FailedModal message="el coordinador" show ={showfail}/>
            <Form onSubmit={postGroup}>
                <Container>

                    <TextField type="search" id="search" label="Buscar persona"

                               sx={{m: 1, width: '25ch'}}
                               InputProps={{
                                   startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                               }}/>
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon style={{fill: "grey"}}/>
                    </IconButton>

                    <FormControl sx={{m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>


                    <SideBarGroups/>
                </Container>


            </Form>
        </Container>
    )
}
