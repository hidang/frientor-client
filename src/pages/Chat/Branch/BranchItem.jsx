import React from 'react';


function BranchItem({ repComment }) {
  return (
    <>
      <div className="flex flex-none h-16 bg-white border rounded p-4 justify-center items-center">
        {repComment?.content}
      </div>
    </>
  );
}

export default BranchItem;