import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Idea from './Idea/Idea';
import { auth } from './../../Auth/firebase';
import { Axios } from './../../api/axios';
import Branch from './Branch/Branch';
import Chithub from './Chithub/Chithub';
import BtnRegisterLogin from '../../components/Navbar/BtnRegisterLogin';
import { NavLink } from 'react-router-dom';
import Chit from './Chit/Chit';

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
  //const [chithub, setChithub] = useState(null);
  const handleChithubEvent = () => {
    console.log('alo')
    //window.location.reload();
    setRefresh({});
  }

  const [chatContent, setChatContent] = useState(null);
  const handleSetChatContent = (_chatcontent) => {
    if (_chatcontent !== chatContent) setChatContent(_chatcontent);
  }
  return (
    <>
      {/* navbar */}
      <div className="flex justify-between bg-gray-100 text-sm text-gray-700">
        <div className="flex items-center">
          <NavLink to="/" activeClassName="active-menu" exact>
            <h2 className="text-red-500 font-svn-inter font-bold text-4xl ml-4 cursor-pointer">Frientor</h2>
          </NavLink>
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
                  src={userLogin?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} width="62" height="62"
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
          <Idea idQuestion={idq} handleClickIdea={handleClickIdea} triggerRefreshChat={handleChithubEvent} />
        </div>
        <div className="flex flex-row flex-auto bg-white rounded-tl-xl border-l shadow-xl">
          {/*  */}
          <Branch idComment={idComment} handleChithubEvent={handleChithubEvent} />
          {/*  */}
          <div className="flex flex-col w-1/5">
            <div className="flex-none h-20 bg-yellow-200">
              <center><p className="">Chithub</p></center>
            </div>
            <div className="flex-auto overflow-y-auto">
              <Chithub idComment={idComment} handleSetChatContent={handleSetChatContent} triggerNe={refresh} />
            </div>
          </div>
          {/*  */}
          <Chit _chatContent={chatContent} />

        </div>
      </div>
    </>
  );
}

export default ChatPage;