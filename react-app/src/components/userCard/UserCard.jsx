import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { UserContext } from "../../Contexts";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Check } from "../../assets/check2.svg";
import "./styles.scss";
import axios from "axios";

export const UserCard = ({
  username,
  datecreated,
  likes,
  email,
  accountavatarurl,
}) => {
  const [user, setUser] = useContext(UserContext);
  const [editUsername, setEditUsername] = useState(false);
  const [editableUsername, setEditableUsername] = useState(username);
  const [usernameError, setUsernameError] = useState("");

  function toggleEditUsername() {
    if(!editUsername) {
      //Triggers when editting STARTS
      setEditUsername(!editUsername);
    } else {
      //Triggers when editting STOPS 
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/change-username`,
          { newUsername: editableUsername },
          { withCredentials: true }
        )
        .then((res) => {
          setEditUsername(false);
          setUsernameError("");
        })
        .catch((err) => {
          if(err.response.status == 409) {
            setUsernameError(err.response.data.message);
          } else {
            console.error(err);
          }
        });
    }
  }

  useEffect(() => {
    setEditableUsername(username);
  }, [username]);

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
          {editUsername ?
            <>
              <div className="user-username-container">
                <input
                  className="user-username-input"
                  type="text" value={editableUsername}
                  onChange={(e) => {setEditableUsername(e.target.value)}}
                />
                <Check onClick={toggleEditUsername} className="user-username-check" />
              </div>
              {usernameError && <p className="user-username-error" >{usernameError}</p>}
            </>
            :
            <div className="user-username-container">
              <h2>{editableUsername}</h2>
              {(user?.username === username) && <Pencil onClick={toggleEditUsername} className="user-username-pencil" />}
            </div>
          }
        <h4>Joined on {new Date(datecreated).toDateString()}</h4>
        {(user?.admin || user?.username === username) && <h4>{email}</h4>}
      </div>
      <div className="edit-profile">

      </div>
    </div>
  );
};
