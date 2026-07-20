import ChatIcon from "./ChatIcon"
import HomeIcon from "./HomeIcon"
import JobIcon from "./JobIcon"
import NetworkIcon from "./NetworkIcon"
import NotificationIcon from "./NotificationIcon"

function FooterNav () {
    return (
        <nav className="footerNav d-flex justify-content-around align-items-center d-lg-none">
            <HomeIcon/>
            <NetworkIcon/>
            <ChatIcon/>
            <NotificationIcon/>
            <JobIcon/>
        </nav>
    )
}

export default FooterNav
