import React, { useState, useEffect } from "react";
import { attemptLogin } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (auth.id) {
      navigate("/"); // redirect to Home page if logged in
    }
  }, [auth, navigate]); // listen for changes in auth

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  // Check if all fields are filled
  const allFieldsFilled = Object.values(credentials).every(
    (field) => field !== ""
  );

  return (
    <div className="register-container">
      <h2 className="register-form-title">Login</h2>
      <form className="register-form" onSubmit={login}>
        <input
          placeholder="Username"
          value={credentials.username}
          name="username"
          onChange={onChange}
          className="form-control"
          required
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
          className="form-control"
          required
        />

        <div className="button-container">
          <button className="btn-primary" disabled={!allFieldsFilled}>
            Login
          </button>
          <Link to="/register" className="secondary-btn">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
