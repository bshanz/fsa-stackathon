import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectAllPosts } from "../store/postSlice";
import { Link } from "react-router-dom";

import Post from "./Post";

export const PostsList = () => {
  const dispatch = useDispatch();
  let posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const postAdded = useSelector((state) => state.posts.postAdded); // add new state selector

  useEffect(() => {
    if (postStatus === "idle" || postAdded) {
      // add postAdded as a dependency
      dispatch(fetchPosts());
    }
  }, [dispatch, postAdded]); // add postAdded as a dependency

  let content;

  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    // Create a new sorted array
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    content = sortedPosts.map((post) => <Post key={post.id} post={post} />);
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
