import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import Navbar from "./Navbar";

const Home = () => {
  // Get the user from the users slice of the state
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <Navbar />
      <div className="welcome-container login-container">
        {/* Access the username from the user object */}
        <h2>Welcome {user ? user.firstName : ""}!</h2>
        <p>
          Share your favorite articles with your friends. Read their favorites
          too. Enjoy the app!
        </p>
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
