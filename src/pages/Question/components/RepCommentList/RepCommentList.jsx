import React, { useEffect, useState } from 'react';
import { Axios } from '../../../../api/axios';
import RepCommentItem from './RepCommentItem';

function RepComment({ idComment }) {
  const [repComments, setRepComments] = useState(() => {
    if (idComment)
      Axios.get(`/question/repcomment/${idComment}`)
        .then((res) => {
          setRepComments(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
  });
  //check new comment
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(idComment)
      if (idComment)
        Axios.get(`/question/repcomment/${idComment}`)
          .then((res) => {
            const _repcomments = res.data;
            if (_repcomments?.length !== repComments.length)
              setRepComments(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
    }, 1600);
    return () => clearInterval(interval);
  });

  return (
    <>
      {
        repComments?.map((repComment) => (
          <>
            <RepCommentItem key={repComment._id} repComment={repComment} />
            <hr />
          </>
        ))
      }
    </>
  );
}

export default RepComment;