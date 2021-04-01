import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as ReplyIcon } from "../../assets/reply-fill.svg";

export const Comment = ({ depth = 0, username, content, cid, children }) => {
  return (
    <div className="comment">
      <div className="comment-user-info">
        <UserIcon
          onClick={() => {
            // TODO: Navigate to user profile
          }}
        />
        <p
          onClick={() => {
            // TODO: Navigate to user profile
          }}
        >
          {username}
        </p>
        <ReplyIcon
          onClick={() => {
            // TODO: Open reply input
          }}
        />
      </div>
      <p className="comment-text">{content}</p>
      <div className="replies">
        {children?.map((child) => (
          <Comment key={child.cid} depth={depth + 1} {...child} />
        ))}
      </div>
    </div>
  );
};
