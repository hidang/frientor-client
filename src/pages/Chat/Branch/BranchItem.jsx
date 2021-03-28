import React, { useEffect, useState } from 'react';
import { Axios } from '../../../api/axios';
import { auth } from './../../../Auth/firebase';

function BranchItem({ idComment, repComment, triggerRefreshChat }) {
  //check user login?
  const [userLogin, setUserLogin] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  //get user of repcomment
  const [userOfcomment, setUserOfcomment] = useState(() => {
    Axios.get(`/user/${repComment?.uid}`)
      .then((res) => {
        setUserOfcomment(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  })
  //--------------------------------------------------
  const handleClickChat = async () => {
    if (!userLogin) {
      alert('You are not Login');
      return;
    }
    //post create chat
    const token = await userLogin.getIdToken();
    Axios.post(
      `/chat/${idComment}`,
      {
        uid2: userOfcomment?.uid,
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
      <div className="flex flex-none text-sm bg-white rounded p-4 items-center grid justify-items-stretch">
        {repComment?.content}
        {!(userLogin.uid === repComment.uid)
          &&
          <button onClick={handleClickChat} className="rounded-lg border-double border-3 border-light-blue-500 flex justify-self-end transition duration-500 ease-in-out bg-yellow-200 hover:bg-yellow-500 transform hover:-translate-y-1 hover:scale-110">

            <p className="ml-1 mr-1 mt-1 mb-1 text-xs">Chat with <b><i>{userOfcomment?.name}</i></b></p>

          </button>
        }
        {(userLogin.uid === repComment.uid)
          &&
          <p className="ml-1 mr-1 mt-1 mb-1 text-xs flex justify-self-end transition duration-500 ease-in-out bg-white hover:bg-yellow-100 transform hover:-translate-y-1 hover:scale-110"> <b><i>You</i></b></p>
        }
      </div>
    </>
  );
}

export default BranchItem;