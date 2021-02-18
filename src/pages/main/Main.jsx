import React, { useState } from "react";
import "./styles.scss";
import { CategorySelector } from "../../components/categorySelector/CategorySelector";
import { ScrollHeader } from "../../components/scrollHeader/ScrollHeader";
import { NavBar } from "../../components/navBar/NavBar";
import { PostPreview } from "../../components/postPreview/PostPreview";

const testData = {
  posts: [
    {
      title: "News: Paypal now accepting ETH",
      image: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem justo, mattis sed magna in, luctus pretium felis. Fusce malesuada pulvinar lectus, pharetra fringilla tellus mattis sed. Donec nec turpis quis odio vestibulum interdum. Etiam quis interdum quam, et ultrices nunc. Praesent ut vulputate ipsum, nec mollis purus. Suspendisse pulvinar ac sem vel sagittis. Cras metus lacus, placerat in diam id, consectetur semper nulla. Aliquam cursus sapien eu augue congue mattis. Aliquam dolor dui, fringilla rhoncus pellentesque et, accumsan eu lectus. Nullam malesuada fringilla fermentum. In in porttitor augue. Pellentesque suscipit lectus id nulla rutrum eleifend. Nulla libero ante, aliquam ac pellentesque vitae, pulvinar eget dui. Nam eu massa vitae tellus tempus interdum in id ex.",
      username: "User212",
      likes: 2,
      liked: false,
    },
    {
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

export const Main = () => {
  const [category, setCategory] = useState("ETH");

  return (
    <>
      <NavBar />
      <CategorySelector selected={category} setSelected={setCategory} />
      <ScrollHeader />
      <div id="main-content">
        {testData.posts.map((post) => (
          <PostPreview {...post} />
        ))}
      </div>
    </>
  );
};
