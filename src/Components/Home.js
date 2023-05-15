import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Navbar from "./Navbar";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <h1>Home</h1>
      <Navbar />
      <div className="welcome-container login-container">
        <h2>Welcome {auth.username}!!</h2>
        <button
          className="logout-button btn"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
