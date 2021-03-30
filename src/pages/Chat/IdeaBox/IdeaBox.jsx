import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { auth } from './../../../Auth/firebase';
import { Axios } from '../../../api/axios';

function IdeaBox({ commentItem, handleClickIdea, triggerRefreshChat }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idcmt = query.get('idcomment');
  let className = "bg-blue-200 h-20";
  if (idcmt === commentItem?._id) className = "bg-blue-400 h-20 border-2 border-black border-opacity-1000";
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
  //-------------------------------------------------------------
  //get user of idea (comment)
  const [userOfIdea, setUserOfIdea] = useState(() => {
    Axios.get(`/user/${commentItem?.uid}`)
      .then((res) => {
        setUserOfIdea(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  });
  //-------------------------------------------------------------
  const handleClickChat = async () => {
    if (!userLogin) {
      alert('You are not Login');
      return;
    }
    //post create chat
    const token = await userLogin.getIdToken();
    Axios.post(
      `/chat/${commentItem?._id}`,
      {
        uid2: commentItem?.uid,
        content: [],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).then(() => {
      triggerRefreshChat();
    });
  }
  return (
    <>
      <button onClick={handleClickNe} className={className} >
        {commentItem?.content}
        {!(userLogin.uid === commentItem.uid)
          &&
          <div className="flex justify-center">
            <button onClick={handleClickChat} className=" rounded-lg border-double border-3 border-light-blue-500 flex justify-self-end transition duration-500 ease-in-out bg-yellow-200 hover:bg-yellow-500 transform hover:-translate-y-1 hover:scale-110">
              <p className="ml-1 mr-1 mt-1 mb-1 text-xs">Chat with <b><i>{userOfIdea?.name}</i></b></p>
            </button>
          </div>
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