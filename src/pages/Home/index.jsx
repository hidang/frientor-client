import RigisterForm from "../../components/Register/RigisterForm";
import React, { useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import LoginForm from "../../components/Login/LoginForm";
Home.propTypes = {

};

export default function Home({ auth }) {
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

  return (
    <div>
      {/* Navbar */}
      {!user &&
        <>
          <p>
            <NavLink to="/login" activeClassName="active-menu" exact>
              👉Login
        </NavLink>
            {/*NavLink khác với Link ở chỗ có activeClassName khi truy cập vào*/}
          </p>
          <p>
            <NavLink to="/rigister" activeClassName="active">
              👉Rigister
            </NavLink>
          </p>
          <p>
            <NavLink to="/">
              <button>Go to home</button>
            </NavLink>
          </p>
        </>
      }
      {user &&
        <>
          Bạn đã đăng nhập<br />
          ✅ Xin chào {user.email}<br />
          <button onClick={logOut} color="yellow">👈 Log out </button>
        </>
      }
      {/* Header */}
      <center><h2>FRIENTOR</h2></center>
      {/* text box */}

      {/* -------- */}
      {/* tạm thời để ở đây nữa sẽ nằm ở navbar và có button gọi ra */}
      <Switch>
        <Route path="/login">
          {!user && <LoginForm auth={auth} />}
        </Route>
        <Route path="/rigister">
          {!user && <RigisterForm auth={auth} />}
        </Route>
      </Switch>
    </div >
  );
}