import React from 'react'

import Shimmer from './Shimmer'
import CurrentPage from './CurrentPage'
import ContentShow from './ContentShow'

function Page1({clickedOnNavIcon,setClickedOnNavIcon}) {
  return (
    <div className='flex items-center justify-between flex-col h-[91vh] ' style={clickedOnNavIcon==0?{display:"flex"}:{display:"none"}}>
        <div className="h-[80vh]   mb-5  flex items-center justify-center rounded-xl z-10 overflow-hidden  bg-[#282A2C] mt-5 w-[80%]">
          <ContentShow/>
        </div>
       <CurrentPage clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
    </div>
  )
}

export default Page1