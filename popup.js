chrome.tabs.query({'active': true, currentWindow:true}, 
function(tabs){
	var tab = tabs[0];
    var h1Tag = document.getElementsByTagName("h1");
    h1Tag[0].innerText = tab.url;
});