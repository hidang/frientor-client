import React from 'react';
import BtnRegisterLogin from "../../../../components/Navbar/BtnRegisterLogin";
import { NavLink } from "react-router-dom";

function Navbar({ user, logOut, match }) {
  return (
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
  );
}

export default Navbar;