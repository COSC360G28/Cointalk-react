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
  const [replyID, setReplyID] = useState();
  const [replyUser, setReplyUser] = useState();

  const onReply = (cid, username) => {
    setReplyUser(username);
    setReplyID(cid);
    const commentInput = document.getElementById("comment-input");
    commentInput.focus();
  };

  const getComments = () => {
    // Get comments list
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        window.alert(err.response.data.error);
      });
  };

  const onCommentSent = () => {
    getComments();
    setReplyUser(null);
    setReplyID(null);
  };

  useEffect(() => {
    // Get post data
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        window.alert(err.response.data.error);
      });
    getComments();
  }, [id]);

  return (
    <>
      <NavBar />
      <MainContent>
        <Content>{data ? <PostCard post={data} /> : null}</Content>
        <Content>
          <NewComment
            postID={id}
            onSend={onCommentSent}
            parentID={replyID}
            parentUser={replyUser}
          />
        </Content>
        <Content>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.cid} onReply={onReply} {...comment} />
            ))
          ) : (
            <p className="no-comments">No Comments</p>
          )}
        </Content>
      </MainContent>
    </>
  );
};
