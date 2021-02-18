import React from "react";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { Comments } from "../../components/comments/Comments";

export const Post = () => {
  return (
    <>
      <NavBar />
      <MainContent>
        <Content>{/* <PostCard/> */}</Content>
        <Content>{/* <NewComment/> */}</Content>
        <Content>
          <Comments />
        </Content>
      </MainContent>
    </>
  );
};
