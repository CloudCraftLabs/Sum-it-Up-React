import React from 'react'
import like from '../../Images/thumb-up-line.png';
import dislike from '../../Images/thumb-down-line.png';
import comment from '../../Images/chat-3-line.png';
import liked from '../../Images/thumb-up-fill.png';
import disliked from '../../Images/thumb-down-fill.png';
import { useState } from 'react';


function Footer() {
const [likedContent, setLikedContent] = useState(false)
const [dislikeContent, setDislikeContent] = useState(false);
const handleLike = ()=>{
setLikedContent(!likedContent);
if(dislikeContent){
    setDislikeContent(!dislikeContent);
}
}

const handleDislike = ()=>{
    setDislikeContent(!dislikeContent);
    if(likedContent){
        setLikedContent(!likedContent);
    }
}
  return (
    <div className='h-12 w-full flex items-center justify-between px-10 '>
        <img src={likedContent ? liked : like} alt="user" className={` cursor-pointer`} onClick={handleLike}/>
        <div className="flex items-center justify-center gap-4">
        <img src={comment} alt="user" className={` cursor-pointer`}/>
        <img src={dislikeContent ? disliked : dislike } alt="user" className={` cursor-pointer`} onClick={handleDislike}/>
       
        </div>

    </div>
  )
}

export default Footer