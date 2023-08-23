import React, { useState } from "react";
import { Container } from "react-bootstrap";
import '../assets/styles/ProfilePicture.css';

export const ProfilePicture = ({ username, profileImg, ProfilePicture }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile);
    };

    const handleImageUpload = () => {
        if (selectedImage) {
            updateProfilePicture(selectedImage);
        }
    };

    return (
        <Container className="profile-picture">
            <img src={profileImg} alt={username} className="responsive-image" />
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </Container>
    );
};
export default ProfilePicture;
