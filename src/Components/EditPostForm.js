import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, selectPostById } from "../store/postSlice";
import { Link } from "react-router-dom";

const EditPostForm = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, id));

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setUrl(post.url);
      setDescription(post.description);
    }
  }, [post]);

  const onUrlChanged = (e) => setUrl(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onSavePostClicked = async () => {
    if (url && description) {
      dispatch(editPost({ id: id, url, description }));
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
          <label htmlFor="postUrl">URL:</label>
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
          <label htmlFor="postDescription">Description:</label>
          <textarea
            id="postDescription"
            name="postDescription"
            placeholder="What's your post about?"
            value={description}
            onChange={onDescriptionChanged}
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
