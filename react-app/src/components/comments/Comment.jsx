import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as ReplyIcon } from "../../assets/reply-fill.svg";

export const Comment = ({
  depth = 0,
  username,
  content,
  cid,
  children,
  onReply,
}) => {
  const goToUser = () => {
    window.location.href = `/user/${username}`;
  };

  return (
    <div className="comment">
      <div className="comment-user-info">
        <UserIcon onClick={goToUser} />
        <p onClick={goToUser}>{username}</p>
        <ReplyIcon
          onClick={() => {
            onReply(cid, username);
          }}
        />
      </div>
      <p className="comment-text">{content}</p>
      <div className="replies">
        {children?.map((child) => (
          <Comment
            key={child.cid}
            onReply={onReply}
            depth={depth + 1}
            {...child}
          />
        ))}
      </div>
    </div>
  );
};
