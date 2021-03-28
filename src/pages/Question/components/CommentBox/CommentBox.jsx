import React, { useEffect, useState } from 'react';
import { auth } from './../../../../Auth/firebase';
import { Axios } from './../../../../api/axios';

function CommentBox({ questionId, commentId }) {
  const _idOnly = Math.floor(Math.random() * Math.floor(1000));
  const [user, setUser] = useState(true);
  //------------------------------------------------------------
  //check user login?
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else setUser(false);
    })
  });
  //------------------------------------------------------------
  const handleComment = async (e) => {
    if (!user) alert("Bạn chưa login");
    else {
      e.preventDefault();
      const content = document.querySelector(`#inputComment${_idOnly}`).value;
      const token = await user.getIdToken();
      Axios.post(
        `/question/${questionId ? "comment" : "repcomment"}/${questionId || commentId}`,
        {
          content: content,
          date: new Date(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      ).then(() => {
        const _inputTextArea = document.querySelector(`#inputComment${_idOnly}`);
        if (_inputTextArea) _inputTextArea.value = "";
      });
    };
  }
  return (
    <>
      {/* comment form */}
      <div className="flex mx-auto items-center justify-center shadow-lg mt-2 mx-8 mb-4 max-w-2xl">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">{questionId ? "Add a new idea" : "Add a new branch"}</h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea id={`inputComment${_idOnly}`} className="rounded border border-green-500 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder={questionId ? "Type Your Idea" : "Type Your Branch"} required defaultValue={""} />
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                {/* <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p> */}
              </div>
              <div className="-mr-1">
                <input onClick={handleComment} type="button" className="bg-white text-green-700 font-medium py-1 px-4 border border-green-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="Post" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CommentBox;