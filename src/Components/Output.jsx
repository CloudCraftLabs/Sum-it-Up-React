import React from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'

function Output({clickedOnNavIcon,setClickedOnNavIcon}) {
//   if(clickedOnNavIcon == 0){
//     return <Page1/>
//   }
//   else if(clickedOnNavIcon == 1){
//     return <Page2/>
//   }
//   else{
//     return <Page3/>
//   }

return(
   <div className="w-full h-[91vh] flex items-center justify-center">
     <Page1 clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
<Page2 clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
<Page3 clickedOnNavIcon={clickedOnNavIcon} setClickedOnNavIcon={setClickedOnNavIcon}/>
   </div>

)
}

export default Output