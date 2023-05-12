import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, selectPostById } from "../store/postSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

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
      dispatch(editPost({ id: postId, url, description }));
      navigate("/");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postUrl">URL:</label>
        <input
          type="text"
          id="postUrl"
          name="postUrl"
          placeholder="What's the URL of your post?"
          value={url}
          onChange={onUrlChanged}
        />
        <label htmlFor="postDescription">Description:</label>
        <textarea
          id="postDescription"
          name="postDescription"
          placeholder="What's your post about?"
          value={description}
          onChange={onDescriptionChanged}
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
