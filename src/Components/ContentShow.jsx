import React from 'react'
import { useState } from 'react'
import speaker from '../../Images/icons8-speaker-50.png'
import copy from '../../Images/icons8-copy-50.png'
import tick from '../../Images/icons8-tick-30.png'
import { useSpeechSynthesis } from 'react-speech-kit'
function ContentShow() {
    const [paragraphContent, setParagraphContent] = useState(`Democracy literally translates from Ancient Greek to "rule by the people." It's a system of government where the people hold power and influence over the decisions that are made.

    Here are some key ideas of democracy:
    
    Power to the People: Citizens have the power to influence the decisions that are made, either directly or through elected representatives. This can happen through voting in elections, participating in public forums, or contacting their representatives.
    Fairness and Equality: Ideally, everyone has an equal say and opportunity to participate in the democratic process. This includes things like freedom of speech and assembly, and the right to vote.
    Rule of Law: There are laws and procedures that apply to everyone, including those in power. This helps to ensure that everyone is treated fairly and that no one is above the law.
    There are different forms of democracy, but some common ones include:
    
    Direct Democracy: Citizens directly vote on laws and policies. This was how democracy worked in ancient Athens, but it's not very practical for large populations today.
    Representative Democracy: Citizens elect representatives to make decisions on their behalf. This is the most common form of democracy in the world today.
    Democracy is an ideal that many countries strive for, but it's not always easy to achieve or maintain. There are many challenges to democracy, such as corruption, inequality, and voter apathy. But it's a system of government that many believe is the best way to ensure that the people have a say in how they are governed.`)
    const [copied, setCopied] = useState(false);
    const {speak} = new useSpeechSynthesis();
    console.log(window.SpeechSynthesis)
   
    const handleCopy = (e)=>{
       setCopied(true);
       navigator.clipboard.writeText(paragraphContent)
       setTimeout(() => {
           setCopied(false);
       }, 2000);
    }
    const handleSpeaker = ()=>{
     
     
      speak({text:paragraphContent});
      console.log('handleSpeaker');
     
    }

  return (
    <div className='w-full h-[70vh] pl-4 py-2  pr-4 mt-4 mb-4 pt-[5vh] bg-transparent relative'  >
        <img src={speaker} alt="" className='absolute top-[0%] right-[10%] cursor-pointer' onClick={() => speak({ text: paragraphContent })} />
        <p className='ml-[10%] bg-transparent  text-lg  font-light  leading-relaxed tracking-wide w-[75%] h-[100%]  overflow-y-scroll  pr-5 text-left'>
        {paragraphContent}
        </p>
        <div className="w-full h-10 flex items-center justify-end bg-[#282A2C] pr-[10vw]">
        
        <img src={copied?tick:copy} alt="" style={{height:"4hv",width:"4vh",objectFit:"cover",cursor:'pointer'}} onClick={handleCopy} className='absolute bottom-[0%] right-[10%]'/></div>
       
    </div>
  )
}

export default ContentShow