import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postSlice";
import { Link } from "react-router-dom";
import placeholder from "../images/placeholder.jpg";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  console.log(post);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const userIsAuthor = post.userId === userId;

  return (
    <article className="post">
      <h2>{post.title}</h2>
      <h3 style={{ color: "blue" }}>{`Posted by: ${post.user.firstName}`}</h3>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <img
          className="post-image post-image-grid"
          src={post.image ? post.image : placeholder}
          alt="Article image"
        />
      </a>

      <p>
        <strong>Post description:</strong> {post.description}
      </p>
      <p>
        <strong>Why it's a must read:</strong> {post.comment}
      </p>
      {userIsAuthor && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/editpost/${post.id}`}>
            {"     "}
            <button>Edit</button>
          </Link>
        </>
      )}
    </article>
  );
};

export default Post;
