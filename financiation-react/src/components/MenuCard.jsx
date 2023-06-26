import {Button, Card, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../assets/styles/MenuCard.css"

export const MenuCard = ({title, button1, button2, link1, link2}) => {
    return (
        <Card className="menu-card">
            <Card.Header><h3>{title}</h3></Card.Header>
            <Card.Body className="menu-card-body">
                <Row className="menu-card-row">
                    <Link to={link1} className="menu-card-link">
                        <Button className="menu-card-button">{button1}</Button>
                    </Link>
                </Row>
                <hr/>
                <Row className="menu-card-row">
                    <Link to={link2} className="menu-card-link">
                        <Button className="menu-card-button">{button2}</Button>
                    </Link>
                </Row>
            </Card.Body>
        </Card>
    )
}
