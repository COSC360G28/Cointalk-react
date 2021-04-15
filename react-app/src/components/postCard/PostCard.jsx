import React, { useEffect, useState } from "react";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import "./styles.scss";
import { Stars } from "../stars/Stars";
import { EditPostButton } from "../editPostButton/EditPostButton";
import { DeletePostButton } from "../deletePostButton/DeletePostButton";
import axios from "axios";

export const PostCard = ({ post }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(post.text);
  const [owner, setOwner] = useState(false);
  const [admin, setAdmin] = useState(false);

  function toggleEditing() {
    if(editing) {
      //Triggered when editing STOPS
      axios
        .post(`${process.env.REACT_APP_API_URL}/post/${post.pid}/edit`, {newText: content}, { withCredentials: true })
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
        .post(`${process.env.REACT_APP_API_URL}/post/${post.pid}/isPostOwner`, {}, { withCredentials: true })
        .then((res) => {
          setOwner(res.data.isPostOwner);
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
    <div id="post">
      <div className="post-title-container">
        <h2>{post.title}</h2>
        {post.accountavatarurl ? (
          <img
            className="profile-image"
            alt="Profile"
            src={post.accountavatarurl}
          />
        ) : (
          <UserIcon className="profile-image" />
        )}
        <h3>{post.username}</h3>
        {(owner || admin) ?
          <DeletePostButton postId={post.pid} />
          :
          <div className="delete-post-button-container" />
        }
        {owner ?
          <EditPostButton editGetter={editing} editToggle={toggleEditing} />
          :
          <div className="edit-post-button-container" />
        }
        <Stars score={post.score} postId={post.pid} />
      </div>
      {post.image ? (
        <div className="post-image-container">
          <img
            alt="Post"
            src={process.env.REACT_APP_API_URL + "/image/" + post.image}
          />
        </div>
      ) : null}
      {editing ?
        <textarea className="post-edit-text-input" value={content} onChange={(e) => setContent(e.target.value)} />
        :
        <p className="post-text-container">{content}</p>
      }
    </div>
  );
};
