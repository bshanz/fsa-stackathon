import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, selectPostById } from "../store/postSlice";
import { Link } from "react-router-dom";

const EditPostForm = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));

  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setUrl(post.url);
      setComment(post.comment);
    }
  }, [post]);

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onCommentChanged = (e) => setComment(e.target.value);

  const onSavePostClicked = async () => {
    if (url) {
      dispatch(editPost({ id: id, url, comment }));
      navigate("/posts");
    }
  };

  return (
    <section className="create-post-form">
      <h2>Edit Post</h2>
      <Link to="/" className="link">
        Go back to Home
      </Link>
      <form>
        <div className="form-group">
          <label htmlFor="postUrl">Article URL:</label>
          <input
            type="text"
            id="postUrl"
            name="postUrl"
            placeholder="What's the URL of your post?"
            value={url}
            onChange={onUrlChanged}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postComment">Comment:</label>
          <textarea
            id="postComment"
            name="postComment"
            placeholder="Why is it a must read?"
            value={comment}
            onChange={onCommentChanged}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={onSavePostClicked}
          className="btn btn-primary"
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
