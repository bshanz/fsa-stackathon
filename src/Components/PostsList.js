import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  selectAllPosts,
  // selectPostById,
  // addNewPost,
} from "../store/postSlice";

const Post = ({ post }) => (
  <article className="post">
    <h3>{post.comment}</h3>
    <p>
      <a href={post.url}>{post.url}</a>
    </p>
  </article>
);

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    content = posts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
