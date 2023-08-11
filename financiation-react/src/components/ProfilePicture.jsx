import React from "react";
import {Container} from "react-bootstrap";
import '../assets/styles/ProfilePicture.css'

export const ProfilePicture = ({username, profileImg}) => {
    return (
        <Container className="profile-picture">
            <img src={profileImg} alt={username} className="responsive-image"/>
            
        </Container>
        
    )
}

export default ProfilePicture
