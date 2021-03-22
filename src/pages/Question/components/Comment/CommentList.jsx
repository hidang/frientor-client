import React, { useEffect, useState } from 'react';
import { auth } from '../../../../Auth/firebase';
import { Axios } from '../../../../api/axios';
import CommentItem from './../CommentItem/CommentItem';
function CommentList({ questionId }) {
  const [refresh, setRefresh] = useState({});
  const [commentItems, setCommentItems] = useState([]);
  const [user, setUser] = useState(null);
  //------------------------------------------------------------
  const [userLogin, setUserLogin] = useState(true);
  //check user login?
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  //-----------------------------------------------------------
  //get question
  useEffect(() => {
    Axios.get(`/question/comment/${questionId}`)
      .then((res) => {
        setCommentItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questionId, refresh]);
  return (
    <>
      {commentItems.map((commentItem) => (
        <CommentItem key={commentItem._id} commentItem={commentItem} />
      ))}
    </>
  );
}

export default CommentList;