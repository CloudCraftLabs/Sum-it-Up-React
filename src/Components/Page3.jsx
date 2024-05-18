import React from 'react'

import { useState } from 'react'
import send from '../../Images/send-plane-2-fill.png'
import CurrentPage from './CurrentPage'

function Page3({clickedOnNavIcon,setClickedOnNavIcon}) {
    const [value, setValue] = useState("")
  return (
    <div style={clickedOnNavIcon==2?{display:"flex"}:{display:"none"}} className='flex items-center justify-between flex-col h-[91vh] ' >
        <div className="mt-6 h-[40vh] w-full bg-[#282A2C] flex flex-col items-center justify-end rounded-xl z-10">
       
        </div>
        <div className=" h-[10vh] w-full flex items-center justify-center ">
            <div className="w-[65vw] h-fit px-5 py-1 flex justify-center gap-2 mx-10 items-center " style={{border:"1px solid #fff", borderRadius:"5vh", textAlign:"center"}}>
               <textarea name="" id="" className='w-[80%] resize-none border-none pt-4 px-3 text-sm outline-none  text-center my-2 ' value={value} placeholder='Paste Your URL' onChange={(e)=>{setValue(e.target.value)}}></textarea>
               <img src={send} alt="send" className='h-4 w-4 cursor-pointer' />
            </div>
        </div>
      
       <CurrentPage clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
    </div>
  )
}

export default Page3