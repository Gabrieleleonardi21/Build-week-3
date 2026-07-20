import { Container, Row, Col } from "react-bootstrap";

function Home () {
    return (
        <Container>
            <Row>
                <Col xs={12} md={4} lg={2}><h2>Sidebar</h2></Col>
                <Col xs={12} md={8} lg={6}><h2>Centro</h2></Col>
                <Col xs={12} md={4} className="InvisibleCol"><h2>Vuota</h2></Col>
                <Col xs={12} md={8} lg={4}><h2>RightAside</h2></Col>
            </Row>
        </Container>
    )
}

export default Home