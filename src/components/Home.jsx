import { Row, Col } from "react-bootstrap";
import RightAside from "./RightAside";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";

// Contenuto della rotta /home: le tre colonne del feed.
// Header, Container e FooterNav stanno nel Layout condiviso.
function Home () {
    return (
        <Row>
            <Col xs={12} md={4} lg={3}><ProfileCard/></Col>
            <Col xs={12} md={8} lg={6}><Feed/></Col>
            <Col xs={12} md={4} className="InvisibleCol"></Col>
            <Col xs={12} md={8} lg={3}><RightAside/></Col>
        </Row>
    )
}

export default Home
