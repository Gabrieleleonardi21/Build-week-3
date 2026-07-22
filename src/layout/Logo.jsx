import { Link } from "react-router-dom";

// Il logo riporta sempre al feed
function Logo() {
  return (
    <Link to="/home">
      <img src="Logo.png" alt="logo linkedin" className="logo" />
    </Link>
  );
}

export default Logo;
