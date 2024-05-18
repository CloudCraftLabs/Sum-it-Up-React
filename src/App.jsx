

import { useState } from "react"
import Output from "./Components/Output";
import left from '../Images/arrow-left-line.png'
import right from '../Images/arrow-right-line.png'
function App() {
const [clickedOnNavIcon, setClickedOnNavIcon] = useState(0);
const [mouseEnterLeft, setMouseEnterLeft] = useState(false);
const [mouseEnterRight, setMouseEnterRight] = useState(false);

  return (
<div className="w-full h-[100vh] relative">
  <div className={`w-20 h-full  absolute top-[0%] left-[0%] ${clickedOnNavIcon == 0 ? "hidden":"flex"}  items-center justify-start pl-2`} onMouseEnter={(e)=>{
        setMouseEnterLeft(true);
      }} onMouseLeave={()=>{setMouseEnterLeft(false)}}>
      
     <div className={`bg-white w-10 h-10 rounded-full cursor-pointer  items-center justify-center ${mouseEnterLeft==true?"flex":" hidden"} z-10`} onClick={()=>{
       if(clickedOnNavIcon>0){
        setClickedOnNavIcon(clickedOnNavIcon-1)
       }
      }} id="parentCircle">
     <img src={left} alt="left" className={`cursor-pointer w-6 h-6 object-cover`} style={clickedOnNavIcon == 0 ? {opacity:0.5}:{opacity:1}} id="arrow" />
     </div>
  </div>
<Output clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon} />
<div className={`w-20 h-full  absolute top-[0%] right-[0%] ${clickedOnNavIcon == 2 ?"hidden":"flex"} items-center justify-end pr-2`} onMouseEnter={(e)=>{
        setMouseEnterRight(true);
      }} onMouseLeave={()=>{setMouseEnterRight(false)}}>
  <div className={`bg-white w-10 h-10 rounded-full cursor-pointer  items-center justify-center ${mouseEnterRight==true?"flex":" hidden"} z-10`} onClick={()=>{
       if(clickedOnNavIcon<=1){
        setClickedOnNavIcon(clickedOnNavIcon+1)
       }
      }} id="parentCircle">
  <img  src={left} alt="right" className={` cursor-pointer rotate-180 w-6 h-6 object-cover`} style={clickedOnNavIcon == 2 ? {opacity:0.5}:{opacity:1}} id="arrow"/>
  </div>
</div>
</div>
   
  )
}

export default App
