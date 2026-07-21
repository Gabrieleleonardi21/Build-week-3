import { Container } from "react-bootstrap"
import Logo from "./Logo"
import Search from "./Search"
import Icon from "./Icon"
import User from "./User"

function Header () {
    return (
        <Container className="pt-3 d-flex">
            <Logo/>
            <Search/>
            <Icon />
            <User/>
        </Container>
    )
}

export default Header
