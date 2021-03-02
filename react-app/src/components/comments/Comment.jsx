import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as ReplyIcon } from "../../assets/reply-fill.svg";

export const Comment = ({ depth = 0, user, text, id, replies }) => {
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
          {user.username}
        </p>
        <ReplyIcon
          onClick={() => {
            // TODO: Open reply input
          }}
        />
      </div>
      <p className="comment-text">{text}</p>
      <div className="replies">
        {replies?.map((reply) => (
          <Comment key={reply.id} depth={depth + 1} {...reply} />
        ))}
      </div>
    </div>
  );
};
