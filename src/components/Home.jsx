import { Row, Col } from "react-bootstrap";
import RightAside from "./RightAside";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";

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