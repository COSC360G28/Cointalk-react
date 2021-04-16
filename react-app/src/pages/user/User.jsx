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
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    if (!userData) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          window.alert(err.response.data.error);
        });
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}/comments`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          window.alert(err.response.data.error);
        });
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}/posts`)
        .then((res) => {
          setPosts(res.data);
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
        {posts?.map((post) => (
          <Content key={post.pid}>
            <PostPreview {...post} />
          </Content>
        ))}
      </MainContent>
    </>
  );
};
