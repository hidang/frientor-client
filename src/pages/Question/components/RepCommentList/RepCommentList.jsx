import React, { useEffect, useState } from 'react';
import { Axios } from '../../../../api/axios';
import RepCommentItem from './RepCommentItem';

function RepComment({ idComment }) {
  const [repComments, setRepComments] = useState(null);
  useEffect(() => {
    Axios.get(`/question/repcomment/${idComment}`)
      .then((res) => {
        setRepComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [idComment]);


  return (
    <>
      {
        repComments?.map((repComment) => (
          <>
            <RepCommentItem repComment={repComment} />
            <hr />
          </>
        ))
      }
    </>
  );
}

export default RepComment;