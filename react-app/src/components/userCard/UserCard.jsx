import React, { useContext } from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { UserContext } from "../../Contexts";
import "./styles.scss";

export const UserCard = ({
  username,
  datecreated,
  likes,
  email,
  accountavatarurl,
}) => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="user-card-container">
      {accountavatarurl ? (
        <img
          className="user-image"
          alt=""
          src={`${process.env.REACT_APP_API_URL}/image/${accountavatarurl}`}
        />
      ) : (
        <UserIcon className="user-image" />
      )}
      <div className="user-text-info">
        <h2>{username}</h2>
        <h4>Joined on {new Date(datecreated).toDateString()}</h4>
        {(user?.admin || user?.username === username) && <h4>{email}</h4>}
      </div>
    </div>
  );
};
