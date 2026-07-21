import { Row, Col } from "react-bootstrap";
import NewsCard from "./NewsCard";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";

function Home () {
    return (
        <Row>
            <Col xs={12} md={4} lg={3}><ProfileCard/></Col>
            <Col xs={12} md={8} lg={6}><Feed/></Col>
            <Col xs={12} md={4} className="InvisibleCol"></Col>
            <Col xs={12} md={8} lg={3}><NewsCard/></Col>
        </Row>
    )
}

export default Home