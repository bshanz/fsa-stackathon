import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store/auth";
import Home from "./Home";
import Login from "./Login";
import { PostsList } from "./PostsList";
import CreatePost from "./CreatePost";
import EditPostForm from "./EditPostForm";
import Register from "./Register";
import Profile from "./Profile";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={auth.id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={auth.id ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={auth.id ? <Navigate to="/" /> : <Register />}
        />

        <Route path="/posts" element={<PostsList />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost/:id" element={<EditPostForm />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
