import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { Stars } from "../stars/Stars";

export const PostPreview = ({ title, image, text, username, score, liked }) => {
  return (
    <div className="post-preview">
      {image ? (
        <img className="post-preview-image" src={image} alt="Post" />
      ) : null}
      <div className="post-preview-text-container">
        <div className="post-preview-header">
          <div className="post-preview-info-container">
            <h3 className="post-preview-title">{title}</h3>
            <div className="user-container">
              <UserIcon className="user-icon" />
              <p>{username}</p>
            </div>
          </div>
          <Stars num={score} />
        </div>
        <p className="post-preview-text">{text}</p>
      </div>
    </div>
  );
};
