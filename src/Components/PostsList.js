import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  selectAllPosts,
  // selectPostById,
  // addNewPost,
} from "../store/postSlice";
import { ReactTinyLink } from "react-tiny-link";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log("post", post);
  return (
    <article className="post">
      <h2>{post.userId}</h2>
      <ReactTinyLink
        cardSize="small"
        showGraphic={false}
        maxLine={2}
        minLine={1}
        url={post.url}
        proxyUrl="https://cors-anywhere.herokuapp.com/"
      >
        {(data, isLoading) => {
          if (isLoading) {
            return <div>Loading...</div>;
          }
          return (
            <>
              <p>{data.title}</p>
              <p>{data.description}</p>
            </>
          );
        }}
      </ReactTinyLink>
      <p>{post.description}</p>
    </article>
  );
};

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
      <Link to="/">Go back to Home</Link>
      {content}
    </section>
  );
};
