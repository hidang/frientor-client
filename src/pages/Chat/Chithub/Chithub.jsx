import React, { useEffect, useState } from 'react';
import { auth } from './../../../Auth/firebase';
import { Axios } from './../../../api/axios';
import ChithubItem from './ChithubItem';

function Chithub({ idComment }) {
  //const [refresh, setRefresh] = useState({});
  //------------------------------------------------------------
  const [chithubs, setChithubs] = useState([]);
  //check user login? and get data Chats of User in this comment
  const [user, setUser] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        setUser(_user);
        //get chat for userLogin
        const token = await _user.getIdToken();
        Axios.get(
          `/chat/${idComment}`,
          {
            headers: {
              Authorization: token,
            },
          }
        ).then((data) => {
          setChithubs(data.data);
        });
      } else {
        setUser(false)
        //get chat for guest
      };
    })
  }, [idComment]);
  //-------------------------------------------------------------
  // const [chats, setChats] = useState(null);
  // const handleGetChats = async () => {
  //   if (!user) alert("Bạn chưa login");
  //   else {
  //     const token = await user.getIdToken();
  //     Axios.get(
  //       `/chat/${idComment}`,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     ).then((data) => {
  //       console.log(data)
  //     });
  //   };
  // }
  // useEffect(() => {
  //   handleGetChats();
  // }, [idComment]);
  //-------------------------------------------------------------
  const handlePickChat = async () => {
    console.log(idComment);
    if (!user) alert("Bạn chưa login");
    else {
      const token = await user.getIdToken();
      Axios.get(
        `/chat/${idComment}`,
        {
          headers: {
            Authorization: token,
          },
        }
      ).then((data) => {
        console.log(data)
      });
    };
  }

  //-------------------------------------------------------------
  //border-l-2 border-blue-500 bg-blue-100 p-3 space-y-4
  return (
    <>
      {chithubs ?
        chithubs.map((chithub) => (
          <ChithubItem key={chithub._id} chithub={chithub} handlePickChat={handlePickChat} />
        )) : null
      }
    </>
  );
}

export default Chithub;