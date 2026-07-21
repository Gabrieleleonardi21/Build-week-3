import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import RightAside from "./RightAside";
import Feed from "./Feed";
import ProfileCard from "./ProfileCard";
import FooterNav from "./FooterNav";

function Home () {
    return (
        <>
            {/* Navbar dell'app in cima alla pagina del feed */}
            <Header/>
            {/* Container: allinea le colonne ed evita l'overflow orizzontale */}
            <Container className="mt-3">
                <Row>
                    <Col xs={12} md={4} lg={3}><ProfileCard/></Col>
                    <Col xs={12} md={8} lg={6}><Feed/></Col>
                    <Col xs={12} md={4} className="InvisibleCol"></Col>
                    <Col xs={12} md={8} lg={3}><RightAside/></Col>
                </Row>
            </Container>
            {/* Barra inferiore: visibile solo su mobile (d-lg-none) */}
            <FooterNav/>
        </>
    )
}

export default Home