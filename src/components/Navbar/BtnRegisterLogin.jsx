import React from 'react';
import { NavLink } from "react-router-dom";

function BtnRegisterLogin({ match_path }) {
  return (
    <div className="flex items-center my-1 mr-2">
      <NavLink to={`${match_path}/register`} activeClassName="active">
        <button className="block bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-red-700 hover:border-red-500 rounded">
          Sign up
        </button>
      </NavLink>
      <NavLink to={`${match_path}/login`} activeClassName="active-menu" exact>
        <button className="block p-3 ml-1 mr-1 block bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded">
          Login
        </button>
      </NavLink>
    </div>
  );
}

export default BtnRegisterLogin;