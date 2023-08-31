import React, { useContext,useState } from "react";
import { Container } from "react-bootstrap";
import '../assets/styles/ProfilePicture.css';
import {SucceedModal} from "../components/SucceedModal"
import AuthContext from "../context/AuthContext";


// const ProfilePicture = ({ username, profileImg }) => {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const toggleModalsucceed = () => setShowsuccese(!showsuccess);
//     let {authTokens} = useContext(AuthContext)

export const ProfilePicture= () =>  {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/update-profile-picture', {
                method: 'PUT',
                body: file
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
            <h2>Update Profile Picture</h2>
            <form onSubmit={handleSubmit}>
                <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
        </div>
    );
};
//     return (
        
//             <Container className="profile-picture">
//                 <img src={profileImg} alt={username} className="responsive-image" />
//                 <input type="file" />
//                 <button type="submit" onClick={putpicture}>Anadir </button>
//             </Container>
        
//     );
// }

