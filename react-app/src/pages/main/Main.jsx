import React, { useState } from "react";
import { CategorySelector } from "../../components/categorySelector/CategorySelector";
import { ScrollHeader } from "../../components/scrollHeader/ScrollHeader";
import { NavBar } from "../../components/navBar/NavBar";
import { PostPreview } from "../../components/postPreview/PostPreview";
import { MainContent, Content } from "../../components/containers/Containers";


const testData = {
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
    {
      id: 2,
      title: <p>Dogecoin to the MOON!!! &#128640; &#128640; &#128640;</p>,
      image: "../../assets/doge.svg",
      text: "So i decided to believe this delusional hype train and invested like 200k into dogecoin. Guess what! I fucking lost 57k. This isn't funny man I used my 4 years of tuition to invest for this literal garbage dump of a coin. You delusional fucking apes made me lose 57k and are still saying 'HOLD HOLD' like a bunch of fucking subhuman monkeys with 1 fucking braincell. I want all my money back and I demand for reddit to pay it. Fucking hell u all are redacted for convincing me. Anyone who is considering investing in dogecoin DONT. THis dog coin is literally worth less than the shit i take in the morning.",
      username: "average-redditor",
      likes: 10,
      liked: true,
    }
  ],
};

export const Main = () => {
  const [category, setCategory] = useState("ETH");

  return (
    <>
      <NavBar />
      <CategorySelector selected={category} setSelected={setCategory} />
      <ScrollHeader />
      <MainContent>
        {testData.posts.map((post) => (
          <Content key={post.id}>
            <PostPreview {...post} />
          </Content>
        ))}
      </MainContent>
    </>
  );
};
