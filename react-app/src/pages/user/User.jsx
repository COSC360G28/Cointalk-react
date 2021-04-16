import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { PostPreview } from "../../components/postPreview/PostPreview";
import { UserCard } from "../../components/userCard/UserCard";

export const User = () => {
  let { id } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (!userData) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
        })
        .catch((err) => {
          window.alert(err.response.data.error);
        });
    }
  }, [userData, id]);

  return (
    <>
      <NavBar />
      <MainContent>
        <Content>
          <UserCard {...userData} />
        </Content>
        {/* {userPosts.map((post) => ( */}
        {/*   <Content key={post.id}> */}
        {/*     <PostPreview {...post} /> */}
        {/*   </Content> */}
        {/* ))} */}
      </MainContent>
    </>
  );
};
