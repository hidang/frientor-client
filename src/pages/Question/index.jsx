import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from './../../Auth/firebase';
import { Axios } from './../../api/axios';
import { NavLink } from "react-router-dom";
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
import CommentList from './components/Comment/CommentList';
import CommentBox from './components/CommentBox/CommentBox';
function QuestionPage(props) {
  const [refresh, setRefresh] = useState({});
  const [questionItem, setQuestionItem] = useState([]);
  const [user, setUser] = useState(null);
  const [showBox, setShowBox] = useState(false);
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
  //----------------------------------------------------------
  const history = useHistory();
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
            <input type="button" onClick={() => { setShowBox(!showBox) }} className="ml-2 bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="Add Idea" />
          </div>
          {showBox && <CommentBox questionId={questionItem?._id} commentId={false} />}
        </div>
        <div className="mr-1">
          <input onClick={() => { history.push(`/chat?idq=${questionItem?._id}`) }} type="button" className="bg-white text-gray-700 font-medium py-1 px-4 border border-green-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="Discussion" />
        </div>
      </div>
      {/* CommentList */}
      <CommentList questionId={questionItem?._id} />

    </div>
  );
}

export default QuestionPage;