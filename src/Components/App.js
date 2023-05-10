import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store/auth";
import Home from "./Home";
import Login from "./Login";
import { PostsList } from "./PostsList";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div>
      <h1>Must Reads</h1>
      <Routes>
        <Route
          path="/login"
          element={auth.id ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={auth.id ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/posts" element={<PostsList />} />
      </Routes>
    </div>
  );
};

export default App;
