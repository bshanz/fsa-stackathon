import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../store/postSlice";
import { Link } from "react-router-dom"; // import Link from react-router-dom

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const userIsAuthor = post.userId === userId;

  return (
    <article className="post">
      <h2>{post.user.firstName}</h2>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        {post.url}
      </a>
      <p>{post.description}</p>
      {userIsAuthor && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/editpost/${post.id}`}>
            {" "}
            <button>Edit</button>
          </Link>
        </>
      )}
    </article>
  );
};

export default Post;
