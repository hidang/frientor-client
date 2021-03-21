import React, { useState } from "react";
import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RigisterForm from "./components/Register/RigisterForm";
import { auth } from "../../Auth/firebase";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
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
            Bạn đã đăng nhập<br />
          ✅ Xin chào {user.email}<br />
            <button onClick={logOut} color="yellow">👈 Log out </button>
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
    </>
  );
}

export default UserPage;