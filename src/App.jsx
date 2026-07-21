import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Container, Row, Col } from "react-bootstrap"
import './App.css'
import './feed.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import NewsCard from './components/NewsCard'
import PremiumToast from './components/PremiumToast'

// Pagina home (feed) di LinkedIn: header in alto e layout a 3 colonne
// (profilo · feed · notizie). Le colonne laterali si nascondono sotto lg.
function App() {
  return (
    <>
      <Header />
      <PremiumToast />
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col lg={3} className="d-none d-lg-block">
            <Sidebar />
          </Col>
          <Col lg={6}>
            <Feed />
          </Col>
          <Col lg={3} className="d-none d-lg-block">
            <NewsCard />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;