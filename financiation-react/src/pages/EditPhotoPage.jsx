// Import necessary libraries and components
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../assets/styles/ProfilePage.css";
import AuthContext from "../context/AuthContext";
import { Avatar } from "@mui/material";
import { ProfilePicture } from "../components/ProfilePicture";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { getUser } from "../services/UserServices";

const EditPhotoPage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [showButton, setShowButton] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [myUser, setMyUser] = useState();

  const updateUserData = async () => {
    try {
      const usuario = await getUser(authTokens.access);
      setMyUser(usuario);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const getData = async () => {
    const usuario = await getUser(authTokens.access);
    setMyUser(usuario);
  };

  useEffect(() => {
    getData();
  }, []); 

  const handleAddButton = () => {
    setShowButton(!showButton);
    setShowLogoutButton(!showLogoutButton);
    setEditMode(!editMode);
  };

  return (
    <Container className="ContainerProfilePage">
      <Row>
        <Col className="d-flex justify-content-center">
          <IconButton className="EditIconProfile" onClick={handleAddButton}>
            <EditIcon color="action" sx={{ width: 25, height: 25 }} />
          </IconButton>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Avatar
            alt="Remy Sharp"
            src={"data:image/png;base64, " + myUser?.profile_picture}
            sx={{ width: 200, height: 200 }}
            className="ProfilePicture"
          />
        </Col>
      </Row>
      {showButton && (
        <Row className={"justify-content-center text-center"}>
          <ProfilePicture myUser={myUser} updateUserData={updateUserData} />
        </Row>
      )}

      <Row className={"justify-content-center text-center"}>
        <h1 className="ProfileText">
          {myUser?.first_name} {myUser?.last_name}
        </h1>
        <h3 className="ProfileText">Coordinador</h3>
      </Row>

      <Container className="InputsProfile">
        <Row>
          {showLogoutButton && (
            <Col className="d-flex justify-content-center py-3">
              <Button
                className="BtnProfileCerrarSesion"
                onClick={logoutUser}
                sx={{ my: 3 }}
              >
                Cerrar Sesion
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default EditPhotoPage;
