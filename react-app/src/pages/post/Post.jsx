import React from "react";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { Comment } from "../../components/comments/Comment";
import { NewComment } from "../../components/newComment/NewComment";
import { PostCard } from "../../components/postCard/PostCard";

export const Post = () => {
  const comments = [
    {
      user: {
        username: "TestUser1",
        uid: 0,
      },
      text: "Yeah but you can also make a lot of money :D",
      id: 0,
      replies: [
        {
          user: {
            username: "Etheater",
            uid: 1,
          },
          id: 1,
          text: "True!",
          replies: [
            {
              user: {
                username: "Bitboy",
                uid: 0,
              },
              id: 2,
              text: "True!",
            },
          ],
        },
      ],
    },
    {
      user: {
        username: "QBit",
        uid: 2,
      },
      id: 3,
      text: "Hmmmm, still pretty risky though!",
    },
  ];

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
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Content>
      </MainContent>
    </>
  );
};
