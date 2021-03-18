import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import RigisterForm from "./components/Register/RigisterForm";
import { auth } from "../../Auth/firebase";
import Navbar from "./components/Navbar/Navbar";

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
      setUser(null);
    })
  }
  const match = useRouteMatch();//lấy path theo thằng cha
  return (
    <>
      <Navbar user logOut={logOut} match />
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