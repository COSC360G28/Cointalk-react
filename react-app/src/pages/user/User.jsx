import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/navBar/NavBar";
import { CommentPreview } from "../../components/commentPreview/CommentPreview";
import { MainContent, Content } from "../../components/containers/Containers";
import { PostPreview } from "../../components/postPreview/PostPreview";
import { UserCard } from "../../components/userCard/UserCard";
import "./styles.scss";

export const User = () => {
  let { id } = useParams();
  const [userData, setUserData] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    if (!userData) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/${id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
          window.alert(err.response.data.error);
        });
    }
  }, [userData, id]);

  useEffect(() => {
    if (toggle === 0) {
      if (!posts) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/user/${id}/posts`)
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => {
            window.alert(err.response.data.error);
          });
      }
    } else {
      if (!comments) {
        axios
          .get(`${process.env.REACT_APP_API_URL}/user/${id}/comments`)
          .then((res) => {
            setComments(res.data);
          })
          .catch((err) => {
            window.alert(err.response.data.error);
          });
      }
    }
  }, [toggle, comments, id, posts]);

  return (
    <>
      <NavBar />
      <MainContent>
        <Content>
          <UserCard {...userData} />
        </Content>
        <Content>
          <div className="user-toggle">
            <h3
              onClick={() => {
                setToggle(0);
              }}
              className={toggle === 0 ? "selected" : null}
            >
              Posts
            </h3>
            <h3
              onClick={() => {
                setToggle(1);
              }}
              className={toggle === 1 ? "selected" : null}
            >
              Comments
            </h3>
          </div>
        </Content>
        {toggle === 0
          ? posts?.map((post) => (
              <Content key={post.pid}>
                <PostPreview {...post} />
              </Content>
            ))
          : comments?.map((comment) => {
              return (
                <Content key={comment.cid}>
                  <CommentPreview {...comment} />
                </Content>
              );
            })}
      </MainContent>
    </>
  );
};
