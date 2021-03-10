import React from "react";
import "./styles.scss";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { Link } from 'react-router-dom';

export const PostPreview = ({ title, image, text, username, likes, liked, category }) => {
  return (
    <div >
      <div className="headerPost">
      <h3 id="title">{title}</h3>
      <UserIcon id="userIcon" />
      <image/>
      <p>{username} {category}</p>
      {likes}
      </div>
      <p id="text">{text}</p>
      <Link to="/post">Read Full Post</Link>

    </div>

  );
};
