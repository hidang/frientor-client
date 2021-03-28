import React, { useEffect, useState } from 'react';
import { auth } from './../../../Auth/firebase';
import { Axios } from './../../../api/axios';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

function ChithubItem({ chithub, handlePickChat }) {
  //------------------------------------------------------------
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idq = query.get('idq');
  //-----------------------------------------------------------
  const match = useRouteMatch();
  const history = useHistory();
  //check chatItem Pick by id form idchat in param
  const idchat = query.get('idchat');
  let className = "border-l-2 border-transparent hover:bg-gray-100 p-3 space-y-4";
  if (idchat === chithub?._id) className = "border-l-2 bg-green-200 border-transparent hover:bg-green-300 p-3 space-y-4";
  //---------------------------------------------------------
  //check user login?
  const [userLogin, setUserLogin] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLogin(user);
      } else setUser(false);
    })
  }, []);
  //get info user of chat
  const [user, setUser] = useState(null);
  useEffect(() => {
    let _uid = null;
    if (userLogin.uid === chithub?.uid1) _uid = chithub?.uid2; else _uid = chithub?.uid1;
    Axios.get(`/user/${_uid}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, [chithub, userLogin?.uid]);


  const clickNe = () => {
    handlePickChat(chithub?._id);//FIXME: lần đầu load page
    history.push(`${match.path}?idq=${idq}&idcomment=${chithub?.commentId}&idchat=${chithub?._id}`);
  }

  return (
    <>
      <p id={chithub?._id} onClick={clickNe} className="block border-b">
        <div className={className}>
          <div className="flex flex-row items-center space-x-2">
            <img alt="" src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} className="flex-none rounded-full w-6 h-6" />
            <strong className="flex-grow text-sm">{user?.name}</strong>
            {/* <div className="text-sm text-gray-600">5hr</div> */}
          </div>
          {/* <div className="flex flex-row items-center space-x-1">
            <svg className="flex-none w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div className="flex-grow truncate text-xs">{chithub?._id}</div>
          </div> */}
        </div>
      </p>
    </>
  );
}

export default ChithubItem;