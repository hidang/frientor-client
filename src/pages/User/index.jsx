import React, { useEffect, useState } from "react";
import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RigisterForm from "./components/Register/RigisterForm";
import { auth } from "../../Auth/firebase";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
import { Axios } from '../../api/axios';
import ChatItem from "./components/ChatItem/ChatItem";

function UserPage() {
  const [user, setUser] = useState(null);
  //const [token, setToken] = useState('');
  auth.onAuthStateChanged(function (user) {
    if (user) {
      user.getIdToken().then(function (idToken) {
        //setToken(idToken);
        setUser(user);
      });
    }
  });
  const logOut = () => {
    auth.signOut().then((result) => {
      console.log(result, user)
      setUser(null);
    })
  }
  //-------------------------------------------------------------
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    //get user of question
    Axios.get(`/user/${user?.uid}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      })
  }, [user])
  const match = useRouteMatch();//lấy path theo thằng cha
  return (
    <>
      {/* navbar */}

      {!user &&
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center">
              <NavLink to="/" activeClassName="active-menu" exact>
                <h2 className="text-red-500 font-svn-inter font-bold text-4xl mt-2 ml-4 cursor-pointer">Frientor</h2>
              </NavLink>
            </div>
          </div>
          <BtnRegisterLogin match_path={`${match.path}`} />
        </div>
      }
      {user &&
        <>
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center">
              <NavLink to="/" activeClassName="active-menu" exact>
                <h2 className="text-red-500 font-svn-inter font-bold text-4xl mt-2 ml-4 cursor-pointer">Frientor</h2>
              </NavLink>
              {/* <p className="block p-3">About</p> */}
              {/* <p className="block p-3">DSC - HCMUIT</p> */}
            </div>
          </div>
          <div className="rounded rounded-t-lg overflow-hidden ">
            <div className="flex justify-center mt-8">
              <img src={userData?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} width="96" height="96" alt="avatar" className="rounded-full border-solid border-white border-2 -mt-3" />
            </div>
            <div className="text-center px-3 pb-6 pt-2">
              <h3 className="text-black text-sm bold font-sans">{userData?.name} <i className="fas fa-edit ml-1"></i></h3>
              <p className="mt-2 font-sans font-light text-grey-dark">{userData?.bio}</p>
            </div>
            <div className="flex justify-center pb-3 text-grey-dark">
              <div className="text-center mr-3 border-r pr-3">
                <h2>34</h2>
                <span><i className="far fa-question-circle mr-1"></i>Question</span>
              </div>
              <div className="text-center">
                <h2>42</h2>
                <span><i className="far fa-lightbulb mr-1"></i>Idea</span>
              </div>
            </div>
            <center>
              <button onClick={logOut} className=""><i className="fas fa-sign-out-alt mr-1"></i>Log out </button>
            </center>
          </div>
          <ChatItem user={user} />
        </>
      }
      <Switch>
        <Route path={`${match.path}/login`} exact>
          {!user && <LoginForm />}
        </Route>
        <Route path={`${match.path}/register`} exact>
          {!user && <RigisterForm />}
        </Route>
      </Switch>
    </>
  );
}

export default UserPage;