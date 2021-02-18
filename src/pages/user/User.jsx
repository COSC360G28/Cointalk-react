import React from "react";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { PostPreview } from "../../components/postPreview/PostPreview";
import { UserCard } from "../../components/userCard/UserCard";

const testData = {
  user: {
    uid: 0,
    username: "User212",
    image: "../../assets/example_profile.jpg",
    likes: 22,
    email: "email@gmail.com",
  },
  posts: [
    {
      id: 0,
      title: "News: Paypal now accepting ETH",
      image: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem justo, mattis sed magna in, luctus pretium felis. Fusce malesuada pulvinar lectus, pharetra fringilla tellus mattis sed. Donec nec turpis quis odio vestibulum interdum. Etiam quis interdum quam, et ultrices nunc. Praesent ut vulputate ipsum, nec mollis purus. Suspendisse pulvinar ac sem vel sagittis. Cras metus lacus, placerat in diam id, consectetur semper nulla. Aliquam cursus sapien eu augue congue mattis. Aliquam dolor dui, fringilla rhoncus pellentesque et, accumsan eu lectus. Nullam malesuada fringilla fermentum. In in porttitor augue. Pellentesque suscipit lectus id nulla rutrum eleifend. Nulla libero ante, aliquam ac pellentesque vitae, pulvinar eget dui. Nam eu massa vitae tellus tempus interdum in id ex.",
      username: "User212",
      likes: 2,
      liked: false,
    },
    {
      id: 1,
      title: "Newcomers Beware!",
      image: "../../assets/example_image.png",
      text:
        "Cryptos are not for everyone and you should be ready to lose money if you’re not careful!",
      username: "User212",
      likes: 5,
      liked: true,
    },
  ],
};

export const User = () => {
  return (
    <>
      <NavBar />
      <MainContent>
        <Content>
          <UserCard {...testData.user} />
        </Content>
        {testData.posts.map((post) => (
          <Content key={post.id}>
            <PostPreview {...post} />
          </Content>
        ))}
      </MainContent>
    </>
  );
};
