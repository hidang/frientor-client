import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from './../../Auth/firebase';
import { Axios } from './../../api/axios';
import { NavLink } from "react-router-dom";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
function QuestionPage(props) {
  const [refresh, setRefresh] = useState({});
  const [questionItem, setQuestionItem] = useState([]);
  const [user, setUser] = useState(null);
  //------------------------------------------------------------
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');
  //------------------------------------------------------------
  const [userLogin, setUserLogin] = useState(true);
  //check user login?
  useEffect(() => {
    auth.onAuthStateChanged((userLogin) => {
      if (userLogin) {
        setUserLogin(userLogin);
      } else setUserLogin(false);
    })
  });
  //-----------------------------------------------------------
  //get question
  useEffect(() => {
    Axios.get(`/question/${id}`)
      .then((res) => {
        return res.data;
      }).then((_questionItem) => {
        //get user of question
        Axios.get(`/user/${questionItem?.uid}`)
          .then((res) => {
            setUser(res.data);
            setQuestionItem(_questionItem);
          })
          .catch((err) => {
            console.log(err);
            return null;
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, questionItem?.uid, refresh]);
  //-----------------------------------------------------------
  const converDate = (date) => {
    function checkZero(data) {
      if (data.length === 1) {
        data = "0" + data;
      }
      return data;
    }
    var today = new Date(date);
    var day = today.getDate() + "";
    var month = (today.getMonth() + 1) + "";
    var year = today.getFullYear() + "";
    var hour = today.getHours() + "";
    var minutes = today.getMinutes() + "";
    var seconds = today.getSeconds() + "";

    day = checkZero(day);
    month = checkZero(month);
    year = checkZero(year);
    hour = checkZero(hour);
    minutes = checkZero(minutes);
    seconds = checkZero(seconds);

    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
  }
  return (
    <div>
      {/* navbar */}
      <div className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center">
          {/* <p className="block p-3">About</p>
            <p className="block p-3">DSC - HCMUIT</p> */}
        </div>
        <div className="flex items-center">
          {!userLogin &&
            <BtnRegisterLogin match_path={"user"} />
          }
          {userLogin &&
            <>
              <p className="block">
                <NavLink to="user" activeClassName="active-menu" exact>
                  <p className="block">{userLogin?.displayName || userLogin?.email}</p>

                </NavLink>
              </p>
              <p className="block">
                <img alt=""
                  className="rounded-full block py-3 px-3"
                  src={userLogin?.photoURL || null} width="62" height="62"
                />
              </p>
            </>
          }
        </div>
      </div>



      {/* header */}
      <div className="flex mx-auto items-center justify-center shadow-lg mt-2 mx-8 mb-4 max-w-5xl">
        <div className="mr-1">
          <input type="button" className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="❤" />
        </div>
        <div className="flex flex-wrap  mt-4 w-full max-w-xl bg-white rounded-lg px-4 pt-2 mb-4">
          <div className="flex flex-wrap justify-between items-center -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              {questionItem?.content}
            </h2>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-blue-500 mr-4">99 Comment</p>
            <div className="font-light text-gray-600">
              {converDate(questionItem?.date)}
            </div>
            <p href="#" className="flex items-center">
              <img src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} alt="avatar" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
              <h1 className="text-gray-700 font-bold hover:underline">{user?.name || user?.email}</h1>
            </p>
          </div>
        </div>

      </div>


      {/* comment form */}
      <div className="flex mx-auto items-center justify-center shadow-lg mt-2 mx-8 mb-4 max-w-2xl">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder="Type Your Comment" required defaultValue={""} />
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                {/* <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p> */}
              </div>
              <div className="-mr-1">
                <input type="button" className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="Post Comment" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionPage;