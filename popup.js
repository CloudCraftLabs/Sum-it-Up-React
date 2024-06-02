var button = document.querySelector('#triggerButton')

button.addEventListener('click', function(){
  // document.body.style.backgroundColor = "blue";
 window.close();
  chrome.tabs.query({active:true, currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,{message:"start"});
  });
})