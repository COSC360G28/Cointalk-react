import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";

import { User } from "../../pages";

export const PostPreview = ({ title, image, text, username, likes, liked }) => {
  return (
    <div >
      <div className="headerPost">
      <h3 id="title">{title}</h3>
      <UserIcon id="userIcon" />
      <image/>
      <p>{username}</p>
      {likes}
      </div>
      <p id="text">{text}</p>

    </div>

  );
};
