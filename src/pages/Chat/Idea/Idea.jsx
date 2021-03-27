import React, { useEffect, useState } from 'react';
import { auth } from '../../../Auth/firebase';
import { Axios } from '../../../api/axios';
import IdeaBox from '../IdeaBox/IdeaBox';
import CommentBox from '../../Question/components/CommentBox/CommentBox';

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
  //handle show BoxAdd
  const [showBox, setShowBox] = useState(false);

  return (
    <>
      <input type="button" onClick={() => { setShowBox(!showBox) }} className="ml-2 bg-white text-gray-700 font-medium px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="+" />
      {showBox && <CommentBox questionId={idQuestion} commentId={false} />}

      {commentItems?.map((commentItem) => (
        <IdeaBox key={commentItem._id} commentItem={commentItem} handleClickIdea={handleClickIdea} />
      ))}
    </>
  );
}

export default Idea;