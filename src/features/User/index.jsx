import React, { useState } from "react";
import PropTypes from 'prop-types';
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import LoginForm from "../../features/User/components/Login/LoginForm";
import RigisterForm from "../../features/User/components/Register/RigisterForm";

UserFeature.propTypes = {};

function UserFeature({ auth }) {
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
    <div>
      <div>
        {/* Navbar */}
        {!user &&
          <>
            <p>
              <NavLink to={`${match.path}/login`} activeClassName="active-menu" exact>
                👉Login
              </NavLink>
              {/*NavLink khác với Link ở chỗ có activeClassName khi truy cập vào*/}
            </p>
            <p>
              <NavLink to={`${match.path}/register`} activeClassName="active">
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
          <Route path={`${match.path}/login`}>
            {!user && <LoginForm auth={auth} />}
          </Route>
          <Route path={`${match.path}/register`}>
            {!user && <RigisterForm auth={auth} />}
          </Route>
        </Switch>
      </div >
    </div>
  );
}

export default UserFeature;