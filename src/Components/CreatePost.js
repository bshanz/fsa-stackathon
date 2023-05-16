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
  const [comment, setComment] = useState("");

  // Get current logged in user's id
  const userId = useSelector((state) => state.auth.id);

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onCommentChanged = (e) => setComment(e.target.value);

  const onSubmit = (e) => {
    dispatch(addNewPost({ userId, url, comment })); // include userId
    setUrl("");
    setComment("");
    navigate("/posts");
  };

  return (
    <>
      <Navbar />
      <div className="holder">
        <form onSubmit={onSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="postUrl">Article URL</label>
            <input
              type="text"
              id="postUrl"
              name="postUrl"
              value={url}
              onChange={onUrlChanged}
              className="form-control"
              placeholder="https://www.washingtonpost.com/wellness/2023/04/12/outdoor-exercise-benefits/"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postComment">Comment (Optional)</label>
            <textarea
              id="postComment"
              name="postComment"
              value={comment}
              onChange={onCommentChanged}
              className="form-control"
              placeholder="Why is it a must-read?"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!url}>
            Share Article
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
