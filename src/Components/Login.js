import React, { useState, useEffect } from "react";
import { attemptLogin } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="login-container">
      <h2 className="login-form-title">Login</h2>
      <form className="login-form" onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
          className="login-input"
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          className="login-input"
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
