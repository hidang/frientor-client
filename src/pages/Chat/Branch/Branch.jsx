import React, { useEffect, useState } from 'react';
import { Axios } from '../../../api/axios';
import CommentBox from '../../Question/components/CommentBox/CommentBox';
import BranchItem from './BranchItem';


function Branch({ idComment, handleChithubEvent }) {
  const [repComments, setRepComments] = useState();
  //get repComment
  useEffect(() => {
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
  //-----------------------------------------------------------------
  const _handleChithubEvent = () => {
    handleChithubEvent();
  }
  //-----------------------------------------------------------------
  //handle show BoxAdd
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      <div className="w-2/5 bg-gray-200 overflow-y-auto flex flex-col">
        <div className="flex flex-col space-y-4 p-4">
          <div className="bg-green-300" ><center><b>Branch (RepIdea)</b></center></div>
          <input type="button" onClick={() => { setShowBox(!showBox) }} className="ml-2 bg-white text-gray-700 font-medium px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="+" />
          {showBox && <CommentBox questionId={false} commentId={idComment} />}
          {
            repComments?.map((repComment) => (
              <>
                <BranchItem key={repComment._id} idComment={idComment} repComment={repComment} triggerRefreshChat={_handleChithubEvent} />
              </>
            ))
          }

        </div>
      </div>
    </>
  );
}

export default Branch;