import React from "react";
import "./styles.scss";
import { ReactComponent as ImageIcon } from "../../assets/image.svg";

export const CreatePost = () => {
  return (
    <a href="/newPost" className="create-post-prompt">
      <ImageIcon />
      <p>New Post...</p>
    </a>
  );
};
