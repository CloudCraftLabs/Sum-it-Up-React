// console.log("hello world!");

chrome.tabs.onActivated.addListener((tab)=>{
    chrome.tabs.get(tab.tabId,(currentTabData)=>{
        
            chrome.scripting.executeScript({
                target:{tabId:currentTabData.id},
                files:["contentScript.js"]
            })
            console.log(currentTabData.url)
        
       
    })
});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === 'triggerContentScript') {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             chrome.scripting.executeScript({
//               target: { tabId: tabs.id },
//               files: ['contentScript.js']
//             });
//           });
          
//     }
//   });
  chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {
    console.log(sender.tab ? "from a content script" + sender.tab.url :"from the extenstion")
    if(request.greetings === "hello") {
        sendResponse({farewell:"bye"})
    }
  })