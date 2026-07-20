import ChatIcon from "./ChatIcon";
import HomeIcon from "./HomeIcon";
import JobIcon from "./JobIcon";
import NetworkIcon from "./NetworkIcon";
import NotificationIcon from "./NotificationIcon";
import User from "./User";

function Icon() {
  return (
    <>
      <div className="d-flex align-items-center d-none d-sm-flex">
        <HomeIcon/>
        <NetworkIcon/>
        <JobIcon/>
        <ChatIcon/>
        <NotificationIcon/> 
      </div>
      <User />
    </>
  );
}

export default Icon;
