import React, { useState } from 'react';
import CommentBox from '../CommentBox/CommentBox';
import RepComment from '../RepCommentList/RepCommentList';
import { Axios } from './../../../../api/axios';

function CommentItem({ commentItem }) {
  const converDate = (date) => {
    function checkZero(data) {
      if (data.length === 1) {
        data = "0" + data;
      }
      return data;
    }
    var today = new Date(date);
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
  }
  const [user, setUser] = useState(() => {
    Axios.get(`/user/${commentItem?.uid}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  })
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      {/* comment form */}
      <div className="flex mx-auto items-center justify-center shadow-lg mt-2 mx-8 mb-4 max-w-2xl">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-2 mt-2 font-bold text-2xl">
              📢 {commentItem?.content}
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                <p href="#" className="hover:underline text-xs pt-px"> {user?.name} {converDate(commentItem?.date)}</p>
              </div>

              <div className="-mr-1">
                <input type="button" onClick={() => { setShowBox(!showBox) }} className="bg-white text-blue-700 font-medium py-1 px-4 border border-blue-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="Reply" />
              </div>
            </div>
            <RepComment idComment={commentItem?._id || null} />
            {/* comment form */}
            {showBox && <CommentBox questionId={false} commentId={commentItem?._id} />}
          </div>
        </form>
      </div>
    </>
  );
}

export default CommentItem;