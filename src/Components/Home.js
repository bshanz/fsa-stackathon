import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Navbar from "./Navbar";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <div className="welcome-container">
        Welcome {auth.username}!!
        <button className="logout-button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
