import React from "react";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { Comments } from "../../components/comments/Comments";
import { NewComment } from "../../components/newComment/NewComment";
import { PostCard } from "../../components/postCard/PostCard";

export const Post = () => {
  return (
    <>
      <NavBar />
      <MainContent>
        <Content>
          <PostCard />
        </Content>
        <Content>
          <NewComment />
        </Content>
        <Content>
          <Comments />
        </Content>
      </MainContent>
    </>
  );
};
