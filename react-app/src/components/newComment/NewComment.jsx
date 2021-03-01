import React, { useState } from "react";
import "./styles.scss";
import { ReactComponent as NewCommentIcon } from "../../assets/pencil-square.svg";
import { ReactComponent as SendIcon } from "../../assets/arrow-right-circle.svg";

export const NewComment = () => {
  const [text, setText] = useState();

  const submit = () => {
    // TODO: submit comment
    console.log(text);
  };

  return (
    <div id="new-comment-container">
      <NewCommentIcon />
      <input
        placeholder="New comment..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button onClick={submit} className={text ? null : "disabled"}>
        <SendIcon className="send" />
      </button>
    </div>
  );
};
