import React from "react";
import "./styles.scss";

export const PostCard = ({ post }) => {
  return (
    <div id="post">
      <div className="post-title-container">
        <h2>{post.title}</h2>
        <img
          className="profile-image"
          alt="Profile"
          src={post.user.profileImage}
        />
        <h3>{post.user.username}</h3>
        <p className="stars">{post.stars}</p>
      </div>
      {post.image ? (
        <div className="post-image-container">
          <img alt="Post" src={post.image} />
        </div>
      ) : null}
      <p>{post.text}</p>
    </div>
  );
};
