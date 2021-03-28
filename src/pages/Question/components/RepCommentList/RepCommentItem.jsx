import React, { useState } from 'react';
import { Axios } from '../../../../api/axios';


function RepCommentItem({ repComment }) {
  const [user, setUser] = useState(() => {
    Axios.get(`/user/${repComment?.uid}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  })
  return (
    <>
      <p className="ml-10 text-xs mr-40">{repComment?.content} - {user?.name}</p>
    </>
  );
}

export default RepCommentItem;