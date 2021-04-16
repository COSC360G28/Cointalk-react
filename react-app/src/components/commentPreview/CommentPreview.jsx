import React from "react";
import "./styles.scss";

export const CommentPreview = ({ mainpostid, content }) => {
  return (
    <div className="comment-container">
      <p>{content}</p>
      <a href={`/post/${mainpostid}`}>See Post</a>
    </div>
  );
};
