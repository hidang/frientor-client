import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Idea from './Idea/Idea';
import { auth } from './../../Auth/firebase';
import { Axios } from './../../api/axios';
import Branch from './Branch/Branch';
import Chithub from './Chithub/Chithub';
import BtnRegisterLogin from '../../components/Navbar/BtnRegisterLogin';
import { NavLink } from 'react-router-dom';

function ChatPage(props) {
  const [refresh, setRefresh] = useState({});
  //------------------------------------------------------------
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idq = query.get('idq');
  //-----------------------------------------------------------
  const [idComment, setIdComment] = useState(query.get('idcomment'));
  const match = useRouteMatch();
  const history = useHistory();
  const handleClickIdea = (_idComment) => {
    if (_idComment !== idComment) setIdComment(_idComment);
    history.push(`${match.path}?idq=${idq}&idcomment=${_idComment}`);
  };
  //------------------------------------------------------------
  const [questionItem, setQuestionItem] = useState([]);
  const [user, setUser] = useState(null);
  //------------------------------------------------------------
  const [userLogin, setUserLogin] = useState(true);
  //check user login?
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  //-----------------------------------------------------------
  //get question
  useEffect(() => {
    Axios.get(`/question/${idq}`)
      .then((res) => {
        return res.data;
      }).then((_questionItem) => {
        //get user of question
        Axios.get(`/user/${questionItem?.uid}`)
          .then((res) => {
            setUser(res.data);
            setQuestionItem(_questionItem);
          })
          .catch((err) => {
            console.log(err);
            return null;
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idq, questionItem?.uid]);
  //----------------------------------------------------------
  const [chithub, setChithub] = useState(null);
  const handleChithubEvent = () => {
    setRefresh({});
  }
  return (
    <>
      {/* navbar */}
      <div className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center">
          {/* <p className="block p-3">About</p>
            <p className="block p-3">DSC - HCMUIT</p> */}
        </div>
        <div className="flex items-center">
          {!userLogin &&
            <BtnRegisterLogin match_path={"user"} />
          }
          {userLogin &&
            <>
              <p className="block">
                <NavLink to="user" activeClassName="active-menu" exact>
                  <p className="block">{userLogin?.displayName || userLogin?.email}</p>
                </NavLink>
              </p>
              <p className="block">
                <img alt=""
                  className="rounded-full block py-3 px-3"
                  src={userLogin?.photoURL || null} width="62" height="62"
                />
              </p>
            </>
          }
        </div>
      </div>


      {/* body */}
      <div className="flex flex-row h-screen bg-gray-100">

        <div className="w-64 flex-none bg-gray-100 p-4 flex flex-col space-y-4">
          <div className="bg-red-300"><center>Question</center></div>
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="font-semibold text-xs">{questionItem?.content} - {user?.name}</h1>
            <svg className="flex-none w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div className="bg-red-300"><center>Idea</center></div>
          <Idea idQuestion={idq} handleClickIdea={handleClickIdea} />
        </div>
        <div className="flex flex-row flex-auto bg-white rounded-tl-xl border-l shadow-xl">
          {/*  */}
          <div className="flex flex-col w-1/5">
            <div className="flex-none h-20 bg-yellow-200">
              <center><p className="">Chithub</p></center>
            </div>
            <div className="flex-auto overflow-y-auto">
              <Chithub idComment={idComment} />
            </div>
          </div>
          {/*  */}
          <div className="w-2/5 border-l border-r border-gray-400 flex flex-col">
            <div className="flex-none h-20 flex flex-row justify-between items-center p-5 border-b">
              <div className="flex flex-col space-y-1">
                <strong>Nikola Tesla</strong>
                <input type="text" placeholder="Add coversation title" className="text-sm outline-none border-b border-dashed text-black placeholder-gray-600" />
              </div>
              <div className="flex flex-row items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
            </div>
            <div className="flex-auto overflow-y-auto p-5 space-y-4" style={{ backgroundImage: 'url(https://static.intercomassets.com/ember/assets/images/messenger-backgrounds/background-1-99a36524645be823aabcd0e673cb47f8.png)' }}>
              <div className="flex flex-row space-x-2">
                <svg className="flex-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="flex flex-col">
                  <div className="bg-gray-200 rounded p-5">
                    Some message text
            </div>
                  <div className="text-sm text-gray-600">4hr ago</div>
                </div>
              </div>
              <div className="flex flex-row justify-center text-sm text-gray-600">
                You assigned this conversation to yourself 5d ago
        </div>
              <div className="flex flex-row space-x-2 flex-row-reverse space-x-reverse">
                <svg className="flex-none w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="flex flex-col">
                  <div className="bg-blue-100 rounded p-5">
                    Some message text
            </div>
                  <div className="text-sm text-gray-600">5hr ago</div>
                </div>
              </div>
            </div>
            <div className="flex-none h-40 p-4 pt-0">
              <textarea className="w-full h-full outline-none border focus:border-blue-600 hover:border-blue-600 rounded p-4 shadow-lg" defaultValue={"Hi"} />
            </div>
          </div>
          {/*  */}
          <Branch idComment={idComment} handleChithubEvent={handleChithubEvent} />
        </div>
      </div>

    </>
  );
}

export default ChatPage;