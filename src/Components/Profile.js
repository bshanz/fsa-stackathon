import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, selectUser, fetchUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [profileInfo, setProfileInfo] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileInfo({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const allFieldsFilled = Object.values(profileInfo).every(
    (field) => field !== ""
  );

  const onChange = (ev) => {
    setProfileInfo({ ...profileInfo, [ev.target.name]: ev.target.value });
  };

  const updateProfile = async (ev) => {
    ev.preventDefault();
    const action = await dispatch(updateUser(profileInfo));
    if (updateUser.fulfilled.match(action)) {
      navigate("/"); // Navigate to homepage after profile update
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
    <>
      <div className="register-container">
        <Link to="/" className="link">
          Go back to Home
        </Link>
        <h2 className="register-form-title">Update Profile</h2>
        <form className="register-form" onSubmit={updateProfile}>
          <input
            placeholder="Username"
            name="username"
            value={profileInfo.username}
            onChange={onChange}
          />
          <input
            placeholder="First Name"
            name="firstName"
            value={profileInfo.firstName}
            onChange={onChange}
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={profileInfo.lastName}
            onChange={onChange}
          />
          <input
            placeholder="Email"
            name="email"
            value={profileInfo.email}
            onChange={onChange}
          />
          <input placeholder="Password" name="password" onChange={onChange} />
          <div className="button-container">
            <button className="register-button" disabled={!allFieldsFilled}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
