import {Button, Card, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export const MenuCard = ({title, button1, button2, link1, link2}) => {
    return (
        <Card className="menu-card">
            <Card.Header><h3>{title}</h3></Card.Header>
            <Card.Body className="menu-card-body">
                <Row>
                    <Link to={link1}>
                        <Button>{button1}</Button>
                    </Link>
                </Row>
                <Row>
                    <Link to={link2}>
                        <Button>{button2}</Button>
                    </Link>
                </Row>
            </Card.Body>
        </Card>
    )
}
