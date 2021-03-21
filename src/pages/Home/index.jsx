import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
import { auth } from "../../Auth/firebase";
import { useHistory } from 'react-router-dom';
import frientorPNG from './assets/FRIENTOR.png';
export default function HomePage() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else setUser(false);
    })
  });
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    const content = document.querySelector("#searchContent").value;
    if (content) history.push(`/search?q=${content}`);
  }
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode || e.which === 13) {
      handleSearch(e);
    }
  };
  return (
    <div>
      <div>
        {/* navbar */}
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center">
            {/* <p className="block p-3">About</p>
            <p className="block p-3">DSC - HCMUIT</p> */}
          </div>
          <div className="flex items-center">
            {!user &&
              <BtnRegisterLogin match_path={"user"} />
            }
            {user &&
              <>
                <p className="block">
                  <NavLink to="user" activeClassName="active-menu" exact>
                    <p className="block">{user?.displayName || user?.email}</p>

                  </NavLink>
                </p>
                <p className="block">
                  <img alt=""
                    className="rounded-full block py-3 px-3"
                    src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} width="62" height="62"
                  />
                </p>
              </>
            }
          </div>
        </div>
        {/* main */}
        <div className="flex justify-center pt-20">
          <div>
            <img alt="frientor"
              className="w-2/3 ml-auto mr-auto mb-6"
              src={frientorPNG}
            />
            <div className="flex border border-gray-200 rounded-full p-4 shadow text-xl">
              <div>🔎</div>
              <input onKeyPress={handleKeypress.bind(this)} type="text" id="searchContent" className="w-full outline-none px-3" />
              {/* <div>🎤</div> */}
            </div>
            <div className="mt-8 text-center">
              <button onClick={handleSearch} className="mr-3 bg-gray-200 border border-gray-300 py-3 px-4 rounded hover:bg-gray-400 hover:border-gray-500">
                Frientor!
              </button>
              <button className="bg-gray-200 border border-gray-300 py-3 px-4 rounded hover:bg-gray-400 hover:border-gray-500">
                I'm Feeling Lucky
              </button>
            </div>
          </div>
        </div>
        {/* footer */}
        {/* <div className="fixed bottom-0 bg-gray-200 border-t w-full flex justify-between text-gray-600 text-xs">
          <div className="flex">
            <a className="block p-3">Advertising</a>
            <a className="block p-3">Business</a>
            <a className="block p-3">How Search Works</a>
          </div>
          <div className="flex">
            <a className="block p-3">Privacy</a>
            <a className="block p-3">Terms</a>
            <a className="block p-3">Settings</a>
          </div>
        </div> */}
      </div>
    </div >
  );
}
