import React, {useContext, useState} from "react";
import '../assets/styles/ProfilePicture.css';
import AuthContext from "../context/AuthContext";

export const ProfilePicture = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const {authTokens} = useContext(AuthContext)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + String(authTokens.access),
        "Accept": "application/json"
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(file)
            const response = await fetch('/api/update-profile-picture', {
                method: 'PUT',
                headers: headers,
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
                <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange}/>
                <button type="submit">Update</button>
            </form>
            <p>{message}</p>
        </div>
    );
};
