import React, { useState, useEffect } from 'react';
import QuestionItem from './components/QuestionItem/QuestionItem';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from './../../Auth/firebase';
import { NavLink } from "react-router-dom";
import { Axios } from './../../api/axios';
import BtnRegisterLogin from "../../components/Navbar/BtnRegisterLogin";
import sortSearchResponse from './searchML';

function NewsFeedPage(props) {
  //----------get Question by URL---------------------------------------
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const q = query.get('q');
  //------------------------------------------------------------
  const [refresh, setRefresh] = useState({});
  const [questionItems, setQuestionItems] = useState();
  //get question
  useEffect(() => {
    Axios.get("/question")
      .then((res) => {
        let _questionItems = res.data;
        if (_questionItems) {
          const _idQuestionSorteds = sortSearchResponse(_questionItems, q);
          const kq = [];
          _idQuestionSorteds.map((_questionSorted) => (
            kq.push(_questionItems.filter(_questionItem => _questionItem._id === _questionSorted.index))
          ))
          setQuestionItems(kq);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [q, refresh]);
  //------------------------------------------------------------
  const [user, setUser] = useState(true);
  //check user login?
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else setUser(false);
    })
  });
  //------------------------------------------------------------
  const handleQuest = async (e) => {
    if (!user) alert("Bạn chưa login");
    else {
      e.preventDefault();
      const content = document.querySelector("#inputQuestion").value;
      const token = await user.getIdToken();
      Axios.post(
        "/question",
        {
          content: content,
          date: new Date(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      ).then(() => {
        document.querySelector("#inputQuestion").value = "";
        setRefresh({});
      });
    };
  }
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    const content = document.querySelector("#inputQuestion").value;
    if (content) history.push(`/search?q=${content}`);
  }
  //--------------Check new Question-------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      Axios.get("/question")
        .then((res) => {
          let _questionItems = res.data;
          if (_questionItems) {
            const _idQuestionSorteds = sortSearchResponse(_questionItems, q);
            const kq = [];
            _idQuestionSorteds.map((_questionSorted) => (
              kq.push(_questionItems.filter(_questionItem => _questionItem._id === _questionSorted.index))
            ))
            setQuestionItems(kq);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
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
                  src={user?.photoURL || null} width="62" height="62"
                />
              </p>
            </>
          }
        </div>
      </div>

      {/* body */}
      <div className="overflow-x-hidden">

        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            {/*  */}
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-4 text-xl font-bold text-gray-700">Hot Topic</h1>
                <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
                  <ul className="-mx-4">
                    <li className="flex items-center"><img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Alex John</a><span className="text-gray-700 text-sm font-light">Created 23 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Jane Doe</a><span className="text-gray-700 text-sm font-light">Created 52 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=281&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Lisa Way</a><span className="text-gray-700 text-sm font-light">Created 73 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=735&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Steve Matt</a><span className="text-gray-700 text-sm font-light">Created 245 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Khatab
                    Wedaa</a><span className="text-gray-700 text-sm font-light">Created 332 Posts</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 px-8">
                <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
                <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                  <ul>
                    <li><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                  AWS</a></li>
                    <li className="mt-2"><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                  Laravel</a></li>
                    <li className="mt-2"><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">- Vue</a>
                    </li>
                    <li className="mt-2"><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                  Design</a></li>
                    <li className="flex items-center mt-2"><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                  Django</a></li>
                    <li className="flex items-center mt-2"><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">- PHP</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 px-8">
                <h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
                <div className="flex flex-col bg-white px-8 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                  <div className="flex justify-center items-center"><a href="#" className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500">Laravel</a>
                  </div>
                  <div className="mt-4"><a href="#" className="text-lg text-gray-700 font-medium hover:underline">Build
                Your New Idea with Laravel Freamwork.</a></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center"><img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80" alt="avatar" className="w-8 h-8 object-cover rounded-full" /><a href="#" className="text-gray-700 text-sm mx-3 hover:underline">Alex John</a></div><span className="font-light text-sm text-gray-600">Jun 1, 2020</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-8/12">
              <textarea id="inputQuestion" defaultValue={q} className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"></textarea>
              <button onClick={handleSearch} className="mb-1 mr-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Search
              </button>
              <button onClick={handleQuest} className=" bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
                Post Question
              </button>
              <hr />
              {questionItems?.map((questionItem) => (
                <QuestionItem key={questionItem[0]._id} questionItem={questionItem[0]} />
              ))}

              <div className="mt-8">
                <div className="flex">
                  <p href="#" className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
                    previous
                  </p>
                  <p href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                    1
                  </p>
                  <p href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                    2
                  </p>
                  <p href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                    3
                  </p>
                  <p href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                    Next
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ---- */}
      </div>

    </div>
  );
}

export default NewsFeedPage;