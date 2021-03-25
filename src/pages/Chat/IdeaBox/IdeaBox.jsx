import React from 'react';
import { useLocation } from 'react-router';

function IdeaBox({ commentItem, handleClickIdea }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idcmt = query.get('idcomment');
  let className = "bg-blue-200 h-16";
  if (idcmt === commentItem?._id) className = "bg-blue-400 h-16 border-2 border-black border-opacity-1000";
  const handleClickNe = () => {
    handleClickIdea(commentItem?._id);
  }
  return (
    <>
      <button onClick={handleClickNe} className={className} >
        {commentItem?.content}
      </button>
    </>
  );
}

export default IdeaBox;