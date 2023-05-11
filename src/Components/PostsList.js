import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log("post", post);
  return (
    <article className="post">
      <h2>{post.user.firstName}</h2>
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        {post.url}
      </a>
      <p>{post.description}</p>
    </article>
  );
};

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const postAdded = useSelector((state) => state.posts.postAdded); // add new state selector

  useEffect(() => {
    if (postStatus === "idle" || postAdded) {
      // add postAdded as a dependency
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch, postAdded]); // add postAdded as a dependency

  let content;

  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="container">
      <h1>Posts</h1>
      <Link to="/" className="link">
        Go back to Home
      </Link>
      {content}
    </section>
  );
};
