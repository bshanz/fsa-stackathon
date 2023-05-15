import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth"; // import the register action
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Check if all fields are filled
  const allFieldsFilled = Object.values(credentials).every(
    (field) => field !== ""
  );

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const registerUser = async (ev) => {
    ev.preventDefault();
    const action = await dispatch(register(credentials));
    if (register.fulfilled.match(action)) {
      navigate("/"); // Navigate to homepage after registration
    } else {
      if (action.payload) {
        // handle the error message here
        console.log(action.payload);
      } else {
        // handle a generic error message here
        console.log(action.error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-form-title">Register</h2>
      <form className="register-form" onSubmit={registerUser}>
        <input placeholder="Username" name="username" onChange={onChange} />
        <input placeholder="First Name" name="firstName" onChange={onChange} />
        <input placeholder="Last Name" name="lastName" onChange={onChange} />
        <input placeholder="Email" name="email" onChange={onChange} />
        <input placeholder="Password" name="password" onChange={onChange} />
        <div className="button-container">
          <button className="register-button" disabled={!allFieldsFilled}>
            Register
          </button>
          <Link to="/login" className="secondary-btn">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
