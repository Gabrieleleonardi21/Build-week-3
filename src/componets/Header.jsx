import { Container } from "react-bootstrap"
import Logo from "./Logo"
import Search from "./Search"
import Icon from "./Icon"
import User from "./User"
import Menu from "./Menu"

function Header () {
    return (
        <Container className="pt-3 d-flex">
            <Logo/>
            <Search/>
            <Icon />
            <User/>
            <Menu/>
        </Container>
    )
}

export default Header