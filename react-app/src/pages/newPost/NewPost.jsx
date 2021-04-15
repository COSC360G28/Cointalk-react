import React, { useState } from "react";
import { Content } from "../../components/containers/Containers";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";

export const NewPost = () => {
  const [title, setTitle] = useState();

  return (
    <div>
      <NavBar />
      <Content>
        <form action="" className="new-post-form">
          <h2>Create New Post</h2>
          <label htmlFor="category">Category</label>
          <select id="" name="category">
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
            value={title}
            placeholder="Title"
          />
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
          ></textarea>
          <input className="submit" type="submit" value="submit" />
        </form>
      </Content>
    </div>
  );
};
