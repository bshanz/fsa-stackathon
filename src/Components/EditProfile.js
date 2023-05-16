import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUser } from "../store/usersSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectUser } from "../store/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userData = useSelector((state) => state.users.user);
  console.log(userData);
  const [isLoading, setIsLoading] = useState(true);
  //console.log(user);

  const [profileInfo, setProfileInfo] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log(userData);
    if (userData) {
      setProfileInfo({
        id: userData.id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: "",
      });
    }
  }, [userData]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <button
              onClick={updateProfile}
              className="register-button"
              disabled={!allFieldsFilled}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
