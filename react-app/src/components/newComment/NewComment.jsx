import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as NewCommentIcon } from "../../assets/pencil-square.svg";
import { ReactComponent as SendIcon } from "../../assets/arrow-right-circle.svg";
import axios from "axios";

export const NewComment = ({ postID, onSend, parentID = null }) => {
  const [text, setText] = useState("");

  const submit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comment`,
        {
          postID: postID,
          parentID: parentID,
          content: text,
        },
        { withCredentials: true }
      )
      .then(() => {
        setText("");
        onSend();
      })
      .catch((err) => {
        window.alert(err.response.data.error);
      });
  };

  return (
    <div id="new-comment-container">
      <NewCommentIcon />
      <input
        placeholder="New comment..."
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <button onClick={submit} className={text ? null : "disabled"}>
        <SendIcon className="send" />
      </button>
    </div>
  );
};
