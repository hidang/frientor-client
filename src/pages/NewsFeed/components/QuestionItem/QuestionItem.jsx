import React, { useState } from 'react';
import { Axios } from './../../../../api/axios';
import { useHistory } from 'react-router-dom';

function QuestionItem({ questionItem }) {
  const history = useHistory();
  const [user, setUser] = useState(() => {
    Axios.get(`/user/${questionItem?.uid}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  })
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
    <div className="mt-6">
      <div className=" px-10 py-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <input type="button" className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" defaultValue="0 ❤" />
          <span className="font-light text-gray-600">
            {converDate(questionItem?.date)}
          </span>
          {/* <p href="#" className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500">
            Laravel
          </p> */}
        </div>
        <div className="mt-2">
          <p href="#" onClick={() => { history.push(`/question?id=${questionItem?._id}`) }} className=" text-gray-700 font-bold hover:underline cursor-pointer">
            {questionItem?.content}
          </p>
          {/* <p className="mt-2 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p href="#" className="text-blue-500">0 Idea</p>
          <div>
            <p href="#" className="flex items-center">
              <img src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} alt="avatar" className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" />
              <h1 className="text-gray-700 font-bold hover:underline">{user?.name || user?.email}</h1>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;