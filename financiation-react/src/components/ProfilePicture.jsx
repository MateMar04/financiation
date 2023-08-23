import React, { useContext,useState } from "react";
import { Container } from "react-bootstrap";
import '../assets/styles/ProfilePicture.css';
import {SucceedModal} from "../components/SucceedModal"
import AuthContext from "../context/AuthContext";


const ProfilePicture = ({ username, profileImg }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const toggleModalsucceed = () => setShowsuccese(!showsuccess);
    let {authTokens} = useContext(AuthContext)


    let putPicture= {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "JWT " + String(authTokens.access),
            "Accept": "application/json"
        },
        body: JSON.stringify({"name": e.target.profile_picture.value})
    };
    fetch('api/update-profile-picture', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));

    if (response.status === 200) {
        toggleModalsucceed();
    }
    
    return (
        
            <Container className="profile-picture">
                <img src={profileImg} alt={username} className="responsive-image" />
                <input type="file" />
                <button type="submit" onClick={putpicture}>Anadir </button>
            </Container>
        
    );
}
export default ProfilePicture;
