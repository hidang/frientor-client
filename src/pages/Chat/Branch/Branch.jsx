import React, { useEffect, useState } from 'react';
import { Axios } from '../../../api/axios';
import BranchItem from './BranchItem';


function Branch({ idComment }) {
  const [repComments, setRepComments] = useState();
  //get Comment
  useEffect(() => {
    if (idComment)
      Axios.get(`/question/repcomment/${idComment}`)
        .then((res) => {
          const _repcomments = res.data;
          if (_repcomments?.length !== repComments?.length)
            console.log('dang dep trai')
          setRepComments(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
  }, [idComment, repComments?.length])

  //check new comment //*temporary demo
  useEffect(() => {
    const interval = setInterval(() => {
      if (idComment)
        Axios.get(`/question/repcomment/${idComment}`)
          .then((res) => {
            const _repcomments = res.data;
            if (_repcomments?.length !== repComments?.length)
              setRepComments(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
    }, 2000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <div className="w-2/5 bg-gray-200 overflow-y-auto flex flex-col">
        <div className="flex flex-col space-y-4 p-4">
          <div className="bg-green-300" ><center>Branch (RepComment)</center></div>
          {
            repComments?.map((repComment) => (
              <>
                <BranchItem key={repComment._id} repComment={repComment} />
              </>
            ))
          }

        </div>
      </div>
    </>
  );
}

export default Branch;