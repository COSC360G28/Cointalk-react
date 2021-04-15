import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Content } from "../../components/containers/Containers";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";

const MAX_TITLE_LENGTH = 300;
const MAX_TEXT_LENGTH = 1000;

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  const form = useRef();

  const handlePost = (event) => {
    event.preventDefault();
    let errors = false;
    if (title === "") {
      setTitleError("Title Required.");
      errors = true;
    }
    if (title.length > MAX_TITLE_LENGTH) {
      setTitleError("Title Must be less than 300 characters long.");
      errors = true;
    }
    if (text === "") {
      setTextError("Text Required.");
      errors = true;
    }
    if (text.length > MAX_TEXT_LENGTH) {
      setTextError("Text Required.");
      errors = true;
    }
    if (!errors) {
      const formData = new FormData(document.getElementById("newpost"));
      const requestOptions = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/post`, formData, requestOptions)
        .then((res) => {
          window.location.replace(
            `${process.env.REACT_APP_BASE_URL}/post/${res.data.postID}`
          );
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.response.data.error);
        });
    }
  };

  useEffect(() => {
    if (titleError && title.length > 0 && title.length < MAX_TITLE_LENGTH) {
      setTitleError(null);
    }
  }, [title, titleError]);

  useEffect(() => {
    if (textError && text.length > 0 && text.length < MAX_TEXT_LENGTH) {
      setTextError(null);
    }
  }, [text, textError]);

  return (
    <div>
      <NavBar />
      <Content>
        <form
          onSubmit={handlePost}
          ref={form}
          id="newpost"
          className="new-post-form"
        >
          <h2>Create New Post</h2>
          <label htmlFor="coin">Category</label>
          <select id="" name="coin">
            <option value="ETH">Ethereum</option>
            <option value="BTC">Bitcoin</option>
            <option value="XRP">Ripple</option>
            <option value="NEO">Neo</option>
          </select>
          <label htmlFor="title">Title</label>
          <input
            className="title"
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.nativeEvent.target.value);
            }}
          />
          <p className="error">{titleError}</p>
          <label htmlFor="image">Image</label>
          <input
            className="file-input"
            name="image"
            type="file"
            accept="image/png,image/jpg"
          />
          <label htmlFor="text">Text</label>
          <textarea
            id=""
            name="text"
            maxLength="1000"
            placeholder="Content"
            value={text}
            onChange={(event) => {
              setText(event.nativeEvent.target.value);
            }}
          ></textarea>
          <p className="error">{textError}</p>
          <input className="submit" type="submit" value="submit" />
        </form>
      </Content>
    </div>
  );
};
