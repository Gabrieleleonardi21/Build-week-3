import ChatIcon from "@/layout/ChatIcon";
import HomeIcon from "@/layout/HomeIcon";
import JobIcon from "@/layout/JobIcon";
import NetworkIcon from "@/layout/NetworkIcon";
import NotificationIcon from "@/layout/NotificationIcon";

function FooterNav() {
  return (
    <nav className="footerNav d-flex justify-content-around align-items-center d-md-none d-lg-none">
      <HomeIcon />
      <NetworkIcon />
      <ChatIcon />
      <NotificationIcon />
      <JobIcon />
    </nav>
  );
}

export default FooterNav;
