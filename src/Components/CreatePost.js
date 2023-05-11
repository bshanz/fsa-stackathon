import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  // Get current logged in user's id
  const userId = useSelector((state) => state.auth.id);

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPost({ userId, url, description })); // include userId
    setUrl("");
    setDescription("");
    navigate("/posts");
  };

  return (
    <>
      <h1>Creat Post</h1>
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
