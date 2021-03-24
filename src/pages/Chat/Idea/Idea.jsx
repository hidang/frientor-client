import React, { useEffect, useState } from 'react';
import { auth } from '../../../Auth/firebase';
import { Axios } from '../../../api/axios';
import IdeaBox from '../IdeaBox/IdeaBox';

function Idea({ idQuestion, handleClickIdea }) {
  //---------------get comment---------------------------------------
  const [commentItems, setCommentItems] = useState(() => {
    Axios.get(`/question/comment/${idQuestion}`)
      .then((res) => {
        setCommentItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //-------------check new comment?------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      Axios.get(`/question/comment/${idQuestion}`)
        .then((res) => {
          const _commentItem = res.data;
          if (_commentItem?.length !== commentItems.length)
            setCommentItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
    return () => clearInterval(interval);
  });
  return (
    <>
      {commentItems?.map((commentItem) => (
        <IdeaBox key={commentItem._id} commentItem={commentItem} handleClickIdea={handleClickIdea} />
      ))}
    </>
  );
}

export default Idea;