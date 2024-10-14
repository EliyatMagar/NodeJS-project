import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Nav.css"; // Import CSS file for styling

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("users");

  const logout = () => {
    alert("Logged out successfully");
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>MyApp</h1>
      </div>
      <ul className="nav-links">
        {auth ? (
          <>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/update">Update Product</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">
                Logout({JSON.parse(auth).name})
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Nav;
