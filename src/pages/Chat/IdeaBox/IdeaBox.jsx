import React from 'react';

function IdeaBox({ commentItem, handleClickIdea }) {
  const handleClickNe = () => {
    handleClickIdea(commentItem?._id);
  }
  return (
    <>
      <button onClick={handleClickNe} className="bg-blue-200 h-32" >
        {commentItem?.content}
      </button>
    </>
  );
}

export default IdeaBox;