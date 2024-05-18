import React from 'react'

function CurrentPage({clickedOnNavIcon,setClickedOnNavIcon}) {
  return (
    <div className='w-full my-4 flex items-center justify-center gap-5'>
        <div className={`w-8 h-2 rounded-lg ${clickedOnNavIcon==0?"bg-white":'bg-transparent'} cursor-pointer`} style={{border:"1px solid gray"}} onClick={()=>{
          setClickedOnNavIcon(0)
        }}></div>
        <div className={`w-8 h-2 rounded-lg ${clickedOnNavIcon==1?"bg-white":'bg-transparent'} cursor-pointer`} style={{border:"1px solid gray"}} onClick={()=>{
          setClickedOnNavIcon(1)
        }}></div>
        <div className={`w-8 h-2 rounded-lg ${clickedOnNavIcon==2?"bg-white":'bg-transparent'} cursor-pointer`} style={{border:"1px solid gray"}} onClick={()=>{
          setClickedOnNavIcon(2)
        }}></div>
    </div>
  )
}

export default CurrentPage