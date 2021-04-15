import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as ReplyIcon } from "../../assets/reply-fill.svg";
import { EditCommentButton } from "../editCommentButton/EditCommentButton";
import { DeleteCommentButton } from "../deleteCommentButton/DeleteCommentButton";
import axios from "axios";

export const Comment = ({
  depth = 0,
  username,
  content,
  cid,
  children,
  onReply,
}) => {

  const [owner, setOwner] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [text, setText] = useState(content);
  const [editing, setEditing] = useState(false);

  const goToUser = () => {
    window.location.href = `/user/${username}`;
  };

  function toggleEditing() {
    if(editing) {
      //Triggered when editing STOPS
      axios
        .post(`${process.env.REACT_APP_API_URL}/comment/${cid}/edit`, {newText: text}, { withCredentials: true })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Triggered when editing STARTS
    }
    setEditing(!editing);
  }

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/comment/${cid}/isCommentOwner`, {}, { withCredentials: true })
      .then((res) => {
        setOwner(res.data.isCommentOwner);
      })
      .catch((err) => {
        console.log(err);
      });
  axios
    .post(`${process.env.REACT_APP_API_URL}/isAdmin`, {}, { withCredentials: true })
    .then((res) => {
        setAdmin(res.data.isAdmin);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

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
        {(owner || admin) &&
          <DeleteCommentButton commentId={cid} />
        }
        {owner && 
          <EditCommentButton editGetter={editing} editToggle={toggleEditing}/>
        }
      </div>
      {editing ?
        <textarea className="comment-edit-text-input" value={text} onChange={(e) => setText(e.target.value)} />
        :
        <p className="comment-text">{text}</p>
      }
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
