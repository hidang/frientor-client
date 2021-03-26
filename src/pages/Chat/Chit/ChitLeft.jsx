import React from 'react';


function ChitLeft({ content, user }) {
  return (
    <>
      <div className="flex flex-row space-x-2">
        <img alt="" src={user?.photoURL || null} className="flex-none rounded-full w-6 h-6" />
        <div className="flex flex-col">
          <div className="bg-gray-200 rounded p-2">
            {content?.content}
          </div>
          <div className="text-sm text-gray-600">4hr ago</div>
        </div>
      </div>
    </>
  );
}

export default ChitLeft;