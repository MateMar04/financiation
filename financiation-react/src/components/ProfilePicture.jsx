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
    
        const formData = new FormData();
        formData.append('ProfilePicture', file);
    
        try {
            const response = await fetch('/api/ProfilePicture/', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                setMessage('Profile picture updated successfully!');
            } else {
                setMessage('Error updating profile picture.');
            }
        } catch (error) {
            setMessage('Error updating profile picture.');
        }
    };
    
    
    
    
    // let putPicture= {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "Authorization": "JWT " + String(authTokens.access),
    //         "Accept": "application/json"
    //     },
    //     body: JSON.stringify({"name": e.target.profile_picture.value})
    // };
    // fetch('api/update-profile-picture', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));

    // if (response.status === 200) {
    //     toggleModalsucceed();
    // }
    
    return (
        <div>
            <h2>Update Profile Picture</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
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

