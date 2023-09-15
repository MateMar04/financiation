import React, {useContext, useEffect, useState} from "react";
import '../assets/styles/ProfilePicture.css';
import AuthContext from "../context/AuthContext";
import {Button, Col, Row} from "react-bootstrap";
import {getMyUser, getUser} from "../services/UserServices";

export const ProfilePicture = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const {authTokens} = useContext(AuthContext)
    const [myUser, setMyUser] = useState()

    const getData = async () => {
        const usuario = await getUser(authTokens.access)
        setMyUser(usuario)
    }

    useEffect(() => {
        getData()
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let headers = {
        "Authorization": "JWT " + String(authTokens.access),
        "Accept": "application/json"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        window.location.reload();

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
                <Row className={'justify-content-center text-center'}>
                    <Col>
                        <label htmlFor="imageFile" className="SelectFileButton">Cambiar Imagen</label>
                        <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            className="SelectFileInput"
                            onChange={handleFileChange}
                        />
                    </Col>
                </Row>

                <Row className={'justify-content-center text-center'}>
                    <Col>
                        <Button type="submit" className={'GuardarCambiosButton'}>Guardar Cambios</Button>
                    </Col>
                </Row>
            </form>
            <p>{message}</p>
        </div>
    );
};
