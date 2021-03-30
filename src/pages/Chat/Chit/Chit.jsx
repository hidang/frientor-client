import React, { useEffect, useState } from 'react';
import { auth } from './../../../Auth/firebase';
import { Axios } from '../../../api/axios';
import ChitRight from './ChitRight';
import ChitLeft from './ChitLeft';

function Chit({ _chatContent }) {
  const [chatContent, setChatContent] = useState(_chatContent);
  //------------------------------------------------------
  //check user login?
  const [userLogin, setUserLogin] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  //-----------------------------------------------------
  useEffect(() => {
    auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        if (userLogin !== _user)
          setUserLogin(_user);
        //get chat for userLogin
        const token = await _user.getIdToken();
        Axios.get(
          `/chat/content/${_chatContent?._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        ).then((data) => {
          setChatContent(data.data);
        });
      } else {
        setUserLogin(false)
        //get chat for guest
      };
    })
  }, [_chatContent, userLogin])

  //-----------------------------------------------------
  //check new chatcontent
  //get chat by _id
  //check user login? and get data Chats of User in this comment
  useEffect(() => {
    const interval = setInterval(() => {
      auth.onAuthStateChanged(async (_user) => {
        if (_user) {
          if (userLogin !== _user)
            setUserLogin(_user);
          //get chat for userLogin
          const token = await _user.getIdToken();
          Axios.get(
            `/chat/content/${_chatContent?._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          ).then((data) => {
            if (data.data.content.length !== chatContent.content.length) {
              //const _data = data.data?.content?.reverse();
              //console.log(_data)
              setChatContent(data.data);
            }
          });
        } else {
          setUserLogin(false)
          //get chat for guest
        };
      })
    }, 1500);
    return () => clearInterval(interval);
  });
  //------------------------------------------------------

  const [user, setUser] = useState([]);
  //user[0]: userLogin
  //user[1]: userChat
  //get infor 2 user chat
  useEffect(() => {
    const _user = [];
    Axios.get(`/user/${chatContent?.uid1}`)
      .then((res) => {
        return res.data;
      }).then((user1) => {
        Axios.get(`/user/${chatContent?.uid2}`)
          .then((res) => {
            const user2 = res.data;
            if (user1?.uid === userLogin?.uid) {
              _user.push(user1);
              _user.push(user2);
            } else {
              _user.push(user2);
              _user.push(user1);
            }
            setUser(_user);
          })
      })
      .catch((err) => {
        console.log(err);
        return null;
      })
  }, [chatContent, userLogin.uid])
  //-----------------------------------------------------
  //send chat content to server
  const handleSendChatContent = async (e) => {
    const content = document.querySelector("#inputChatContent").value;
    if (content)
      if (!userLogin) alert("Bạn chưa login");
      else {
        e.preventDefault();
        console.log(content);
        //TODO: send contentchat to BE
        if (!user) alert("Bạn chưa login");
        else {
          e.preventDefault();
          const token = await userLogin.getIdToken();
          Axios.post(
            `/chat/content/${chatContent?._id}`,
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
            document.querySelector("#inputChatContent").value = '';
          });
        };
      }
  }
  //-----------------------------------------------------
  return (
    <>
      <div className="w-2/5 border-l border-r border-gray-400 flex flex-col">
        <div className="flex-none h-20 flex flex-row justify-between items-center p-5 border-b">
          <div className="flex flex-col space-y-1">
            <strong>{user[1]?.name}</strong>

            {/* <input type="text" placeholder="Add coversation title" className="text-sm outline-none border-b border-dashed text-black placeholder-gray-600" /> */}

            <label class="inline-flex items-center mt-3">
              <input onClick={() => { alert('Sorry, Coming soon...') }} type="checkbox" class="form-checkbox h-5 w-5 text-green-600" checked /><span class="ml-2 text-gray-700">Private</span>
            </label>
          </div>
          <div className="flex flex-row items-center">
            <p onClick={() => { alert('Sorry, Coming soon...') }} className="fas fa-phone mr-4"></p>
            <p onClick={() => { alert('Sorry, Coming soon...') }} className="fas fa-video"></p>
          </div>
        </div>
        <div className="flex-auto overflow-y-auto p-5 space-y-4" style={{ backgroundImage: 'url(https://static.intercomassets.com/ember/assets/images/messenger-backgrounds/background-1-99a36524645be823aabcd0e673cb47f8.png)' }}>
          {chatContent &&
            chatContent?.content?.map((c) => (
              (c.uid === userLogin?.uid) ? <ChitRight key={c._id} content={c} user={userLogin} /> : <ChitLeft key={c._id} content={c} user={user[1]} />
            ))
          }
        </div>
        <div className="flex mb-4">
          <textarea id="inputChatContent" className="ml-1 w-full h-full outline-none border focus:border-blue-600 hover:border-blue-600 rounded p-4 shadow-lg" defaultValue={""} />
          <button onClick={handleSendChatContent} className="ml-1 mr-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded float-right">
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Chit;