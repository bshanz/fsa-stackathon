import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  // Get current logged in user's id
  const userId = useSelector((state) => state.auth.id);

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?" + // port
      "(\\/[-a-z\\d%_.~+]*)*" + // path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i" // fragment locator
  );

  const onSubmit = (e) => {
    dispatch(addNewPost({ userId, url, description })); // include userId
    setUrl("");
    setDescription("");
    navigate("/posts");
  };

  return (
    <>
      <h1>Creat Post</h1>
      {/* <Navbar /> */}
      <Link to="/" className="link">
        Go back to Home
      </Link>
      <form onSubmit={onSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="postUrl">Url</label>
          <input
            type="text"
            id="postUrl"
            name="postUrl"
            value={url}
            onChange={onUrlChanged}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postDescription">Description</label>
          <textarea
            id="postDescription"
            name="postDescription"
            value={description}
            onChange={onDescriptionChanged}
            className="form-control"
            // add pattern and required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!url || !description}
        >
          Save Post
        </button>
      </form>
    </>
  );
};

export default CreatePost;
