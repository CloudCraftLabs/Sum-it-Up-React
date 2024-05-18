import React from 'react'
import user from '../../Images/user-line.png'
import left from '../../Images/arrow-left-line.png'
import right from '../../Images/arrow-right-line.png'


function Header({clickedOnNavIcon,setClickedOnNavIcon}) {
  console.log(clickedOnNavIcon)
  return (
    <div className='h-12 w-full flex items-center justify-between px-4' >
      <img src={left} alt="left" className={`cursor-pointer`} style={clickedOnNavIcon == 0 ? {opacity:0.5}:{opacity:1}} onClick={()=>{
       if(clickedOnNavIcon>0){
        setClickedOnNavIcon(clickedOnNavIcon-1)
       }
      }}/>
     <div className="flex items-center justify-center gap-4">
      <img src={user} alt="user" className={` cursor-pointer`}/>
      <img src={right} alt="right" className={` cursor-pointer`} style={clickedOnNavIcon == 2 ? {opacity:0.5}:{opacity:1}}onClick={()=>{
       if(clickedOnNavIcon<=1){
        setClickedOnNavIcon(clickedOnNavIcon+1)
       }
      }}/>
     </div>

    </div>
  )
}

export default Header