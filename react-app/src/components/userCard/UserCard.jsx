import React from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import "./styles.scss";

export const UserCard = ({
  username,
  datecreated,
  likes,
  email,
  accountavatarurl,
}) => {
  return (
    <div className="user-card-container">
      {accountavatarurl ? (
        <img
          alt=""
          src={`${process.env.REACT_APP_API_URL}/image/${accountavatarurl}`}
        />
      ) : (
        <UserIcon />
      )}
      <div className="user-text-info">
        <h2>{username}</h2>
        <h4>Joined on {new Date(datecreated).toDateString()}</h4>
        <h4>{email}</h4>
      </div>
    </div>
  );
};
