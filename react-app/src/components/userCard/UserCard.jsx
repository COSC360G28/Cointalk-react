import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { UserContext } from "../../Contexts";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";
import { ReactComponent as Check } from "../../assets/check2.svg";
import { ReactComponent as Ban } from "../../assets/x-square.svg";
import { ReactComponent as Unban } from "../../assets/check-square.svg";
import "./styles.scss";
import axios from "axios";

export const UserCard = ({
  username,
  datecreated,
  likes,
  email,
  accountavatarurl,
  uid,
  banned
}) => {
  const [user, setUser] = useContext(UserContext);
  const [editUsername, setEditUsername] = useState(false);
  const [editableUsername, setEditableUsername] = useState(username);
  const [editableBanned, setEditableBanned] = useState(banned);
  const [usernameError, setUsernameError] = useState("");
  const [admin, setAdmin] = useState(false);

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

  function banUser() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/${uid}/ban`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setEditableBanned(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function unbanUser() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/${uid}/unban`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setEditableBanned(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    setEditableUsername(username);
  }, [username]);

  useEffect(() => {
    setEditableBanned(banned);
  }, [banned]);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/isAdmin`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <h2>{editableUsername} {editableBanned && <span className="user-username-banned-text">(This user has been banned)</span>}</h2>
              {(user?.username === username) && <Pencil onClick={toggleEditUsername} className="user-username-pencil" />}
              {((user?.username !== username) && admin) &&
              <>
                {editableBanned ?
                  <Unban onClick={unbanUser} className="user-username-unban" />
                  :
                  <Ban onClick={banUser} className="user-username-ban" />
                }
              </>
              }
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

