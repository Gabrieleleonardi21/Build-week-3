import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ChatIcon from "@/layout/ChatIcon";
import HomeIcon from "@/layout/HomeIcon";
import JobIcon from "@/layout/JobIcon";
import NetworkIcon from "@/layout/NetworkIcon";
import NotificationIcon from "@/layout/NotificationIcon";
import User from "@/layout/User";

// Come in Menu/DropdownUser: toggle custom per impilare icona e scritta.
const IconToggle = forwardRef(function IconToggle({ onClick }, ref) {
  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-1 d-flex flex-column align-items-center iconContainer"
      aria-label="Menu"
    >
      <i className="bi bi-list fs-4"></i>
    </a>
  );
});

function Icon() {
  return (
    <>
      {/* fino a md le icone stanno dentro un menu a tendina */}
      <Dropdown align="end" className="d-md-none">
        <Dropdown.Toggle as={IconToggle} id="menu-icone" />
        <Dropdown.Menu className="iconMenu">
          <HomeIcon />
          <NetworkIcon />
          <JobIcon />
          <ChatIcon />
          <NotificationIcon />
        </Dropdown.Menu>
      </Dropdown>

      {/* da md in su restano in linea come prima */}
      <div className="d-none d-md-flex align-items-center">
        <HomeIcon />
        <NetworkIcon />
        <JobIcon />
        <ChatIcon />
        <NotificationIcon />
      </div>

      <User />
    </>
  );
}

export default Icon;
