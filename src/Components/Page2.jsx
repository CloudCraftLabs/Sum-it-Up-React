import React from 'react'
import CurrentPage from './CurrentPage'


function Page2({clickedOnNavIcon,setClickedOnNavIcon}) {
  return (
    <div className='flex items-center justify-between flex-col h-[91vh]'style={clickedOnNavIcon==1?{display:"flex"}:{display:"none"}}>
        <div className=" w-full h-[40vh] flex items-center justify-center">
            <h1 className=' text-sm overflow-scroll '>{window.location.href}</h1>
        </div>
        <CurrentPage clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
    </div>
  )
}

export default Page2