import React, { useState, useEffect } from "react";
import axios from "axios";
import { CategorySelector } from "../../components/categorySelector/CategorySelector";
import { ScrollHeader } from "../../components/scrollHeader/ScrollHeader";
import { NavBar } from "../../components/navBar/NavBar";
import { PostPreview } from "../../components/postPreview/PostPreview";
import { MainContent, Content } from "../../components/containers/Containers";

export const Main = () => {
  const [category, setCategory] = useState("ETH");
  const [sort, setSort] = useState("NEW");
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts?sortBy=${sort}&page=${page}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sort, page]);

  return (
    <>
      <NavBar />
      <CategorySelector selected={category} setSelected={setCategory} />
      <ScrollHeader setSort={setSort} />
      <MainContent>
        {posts.map((post) => (
          <Content key={post.pid}>
            <PostPreview {...post} />
          </Content>
        ))}
      </MainContent>
    </>
  );
};
