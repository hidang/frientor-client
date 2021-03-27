import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { auth } from './../../../Auth/firebase';

function IdeaBox({ commentItem, handleClickIdea }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idcmt = query.get('idcomment');
  let className = "bg-blue-200 h-16";
  if (idcmt === commentItem?._id) className = "bg-blue-400 h-16 border-2 border-black border-opacity-1000";
  const handleClickNe = () => {
    handleClickIdea(commentItem?._id);
  }
  //--------------------------------------------------------------
  //check user login?
  const [userLogin, setUserLogin] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  return (
    <>
      <button onClick={handleClickNe} className={className} >
        {commentItem?.content}
        {!(userLogin.uid === commentItem.uid)
          &&
          <button className="rounded-lg border-double border-3 border-light-blue-500 flex justify-self-end transition duration-500 ease-in-out bg-yellow-200 hover:bg-yellow-500 transform hover:-translate-y-1 hover:scale-110">

            <p className="ml-1 mr-1 mt-1 mb-1 text-xs">Chat with <b><i>{userLogin?.name}</i></b></p>

          </button>
        }
        {(userLogin.uid === commentItem.uid)
          &&
          <p className=""> <b><i>You</i></b></p>
        }
      </button>

    </>
  );
}

export default IdeaBox;