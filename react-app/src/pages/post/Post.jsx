import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/navBar/NavBar";
import "./styles.scss";
import { MainContent, Content } from "../../components/containers/Containers";
import { Comment } from "../../components/comments/Comment";
import { NewComment } from "../../components/newComment/NewComment";
import { PostCard } from "../../components/postCard/PostCard";
import axios from "axios";

export const Post = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState();

  useEffect(() => {
    // Get post data
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Get comments list
    axios
      .get(`http://localhost:5000/post/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <>
      <NavBar />
      <MainContent>
        <Content>{data ? <PostCard post={data} /> : null}</Content>
        <Content>
          <NewComment />
        </Content>
        <Content>
          {comments?.map((comment) => (
            <Comment key={comment.cid} {...comment} />
          ))}
        </Content>
      </MainContent>
    </>
  );
};
