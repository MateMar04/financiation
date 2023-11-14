// Import necessary libraries and components
import React, { useContext, useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

export const ProfilePicture = ({ myUser }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { authTokens } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  let headers = {
    Authorization: "JWT " + String(authTokens.access),
    Accept: "application/json",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const response = await fetch(
        `/api/update-profile-picture/${myUser.id}`,
        {
          method: "PUT",
          headers: headers,
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Row className={"justify-content-center text-center"}>
          <Col>
            <label htmlFor="imageFile" className="SelectFileButton">
              Cambiar Imagen
            </label>
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
        <Row className={"justify-content-center text-center"}>
          <Col>
            <Button type="submit" className={"GuardarCambiosButton"}>
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </form>
      <p>{message}</p>
    </div>
  );
};
