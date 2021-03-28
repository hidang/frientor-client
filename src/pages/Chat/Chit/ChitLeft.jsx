import React from 'react';


function ChitLeft({ content, user }) {
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

    return hour + ":" + minutes + ":" + seconds;
  }
  return (
    <>
      <div className="flex flex-row space-x-2">
        <img alt="" src={user?.photoURL || "https://i.pinimg.com/564x/ce/34/25/ce3425a53b03b8eecb176fcc0b4fd44e.jpg"} className="flex-none rounded-full w-6 h-6" />
        <div className="flex flex-col">
          <div className="bg-gray-200 rounded p-2">
            {content?.content}
          </div>
          <div className="text-sm text-gray-600">{converDate(content?.date)}</div>
        </div>
      </div>
    </>
  );
}

export default ChitLeft;