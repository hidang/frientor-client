import React, { useEffect, useState } from 'react';
import { auth } from './../../../Auth/firebase';
import { Axios } from './../../../api/axios';

function ChithubItem({ chithub, handlePickChat }) {
  const [userLogin, setUserLogin] = useState(true);
  //check user login?
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
    handlePickChat(chithub?._id);
  }
  return (
    <>
      <p onClick={clickNe} className="block border-b">
        <div className="border-l-2 border-transparent hover:bg-gray-100 p-3 space-y-4">
          <div className="flex flex-row items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <strong className="flex-grow text-sm">{user?.name}</strong>
            {/* <div className="text-sm text-gray-600">5hr</div> */}
          </div>
          <div className="flex flex-row items-center space-x-1">
            <svg className="flex-none w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div className="flex-grow truncate text-xs">{chithub?._id}</div>
          </div>
        </div>
      </p>
    </>
  );
}

export default ChithubItem;