import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = useSelector((state) => state.auth.id); // Access the user ID from the auth state

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/posts" className="navbar-link">
            Must-read Articles
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/createpost" className="navbar-link">
            Share Article
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/" className="navbar-link">
            Update Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
