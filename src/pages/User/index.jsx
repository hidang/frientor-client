import React, { useEffect, useState } from "react";
import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RigisterForm from "./components/Register/RigisterForm";
import { auth } from "../../Auth/firebase";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
import { Axios } from '../../api/axios';

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
  })
  const match = useRouteMatch();//lấy path theo thằng cha
  return (
    <>
      <>
        {!user &&
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center">
              <p className="block p-3">
                <NavLink to="/">
                  <button>Home</button>
                </NavLink>
              </p>
            </div>
            <BtnRegisterLogin match_path={`${match.path}`} />
          </div>
        }
        {user &&
          <>
            <div className="rounded rounded-t-lg overflow-hidden ">
              <div className="flex justify-center mt-2">
                <img src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} alt="avatar" className="rounded-full border-solid border-white border-2 -mt-3" />
              </div>
              <div className="text-center px-3 pb-6 pt-2">
                <h3 className="text-black text-sm bold font-sans">{user?.displayName}</h3>
                <p className="mt-2 font-sans font-light text-grey-dark">Hello, i'm from another the other side!</p>
              </div>
              <div className="flex justify-center pb-3 text-grey-dark">
                <div className="text-center mr-3 border-r pr-3">
                  <h2>34</h2>
                  <span>Photos</span>
                </div>
                <div className="text-center">
                  <h2>42</h2>
                  <span>Friends</span>
                </div>
              </div>
            </div>

            <button onClick={logOut} className="bg-yellow-200">Log out </button>
          </>
        }
      </>

      <Switch>
        <Route path={`${match.path}/login`} exact>
          {!user && <LoginForm />}
        </Route>
        <Route path={`${match.path}/register`} exact>
          {!user && <RigisterForm />}
        </Route>
      </Switch>

      {/*  */}


    </>
  );
}

export default UserPage;