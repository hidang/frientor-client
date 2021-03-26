import React from 'react';

function ChitRight({ content, user }) {
  return (
    <>
      <div className="flex flex-row space-x-2 flex-row-reverse space-x-reverse">
        <img alt="" src={user?.photoURL || null} className="flex-none rounded-full w-6 h-6" />
        <div className="flex flex-col">
          <div className="bg-blue-100 rounded p-2">
            {content?.content}
          </div>
          <div className="text-sm text-gray-600">5hr ago</div>
        </div>
      </div>
    </>
  );
}

export default ChitRight;