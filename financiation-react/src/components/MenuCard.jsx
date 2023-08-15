import { Card, Row, DropdownButton, Dropdown } from "react-bootstrap";
import "../assets/styles/MenuCard.css"

export const MenuCard = ({ title, title1, title2, link1, link2, image, customText }) => {
    return (
        <Card className="menu-card">
            <Card.Img variant="top" src={image} alt="" className="card-image" />
            <Card.Header><h3>{title}</h3></Card.Header>
            <Card.Body className="menu-card-body">
                <Row className="menu-card-row">
                    <p>{customText}</p>
                </Row>
                <hr />
                <Row className="menu-card-row">
                    <DropdownButton id={`dropdown-${title}`} title="Opciones">
                        <Dropdown.Item href={link1}>{title1}</Dropdown.Item>
                        <Dropdown.Item href={link2}>{title2}</Dropdown.Item>
                    </DropdownButton>
                </Row>
            </Card.Body>
        </Card>
    );
};

