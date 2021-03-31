import React from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import "./styles.scss";
import { Stars } from "../stars/Stars";

export const PostCard = ({ post }) => {
  return (
    <div id="post">
      <div className="post-title-container">
        <h2>{post.title}</h2>
        {post.accountavatarurl ? (
          <img
            className="profile-image"
            alt="Profile"
            src={post.accountavatarurl}
          />
        ) : (
          <UserIcon className="profile-image" />
        )}
        <h3>{post.username}</h3>
        <Stars num={post.score} />
      </div>
      {post.image ? (
        <div className="post-image-container">
          <img alt="Post" src={post.imageurl} />
        </div>
      ) : null}
      <p className="post-text-container">{post.text}</p>
    </div>
  );
};
