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
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/posts?sortBy=${sort}&page=${page}&category=${category}&searchText=${searchText}`
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sort, page, category, searchText]);

  return (
    <>
      <NavBar />
      <CategorySelector selected={category} setSelected={setCategory} />
      <ScrollHeader setSort={setSort} setSearching={setSearchText} />
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
