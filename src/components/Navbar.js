// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
    const handleSignUp = () => navigate("/signup");
    const handleLogin = () => navigate("/login");
  return (
   <nav className="navbar">
        <Link to="/" className="logo"><img src="/image1.png" width={200}></img></Link>
        <div className="nav-buttons">
          <button onClick={handleSignUp} className="nav-btn">Sign Up</button>
          <button onClick={handleLogin} className="nav-btn">Login</button>
        </div>
      </nav>
  );
};

export default Navbar;
