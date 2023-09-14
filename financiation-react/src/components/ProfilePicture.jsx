import React, {useContext, useState} from "react";
import '../assets/styles/ProfilePicture.css';
import AuthContext from "../context/AuthContext";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const ProfilePicture = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const {authTokens, myUser} = useContext(AuthContext)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let headers = {
        "Authorization": "JWT " + String(authTokens.access),
        "Accept": "application/json"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("profile_picture", file)

        try {
            console.log(file)
            const response = await fetch(`/api/update-profile-picture/${myUser.id}`, {
                method: 'PUT',
                headers: headers,
                body: formData

            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response from server:', data);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>

                <Row className={'justify-content-center text center'}>
                    <Col>
                        <input name="imageFile" type="file" accept="image/*" className={'SelectFile'}
                               onChange={handleFileChange}/>
                    </Col>
                </Row>

                <Row className={'justify-content-center text center'}>
                    <Col>
                        <Button type="submit">Actualizar</Button>
                    </Col>
                </Row>
            </form>
            <p>{message}</p>
        </div>
    );
};
