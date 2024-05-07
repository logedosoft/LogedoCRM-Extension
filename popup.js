var saveButton = document.getElementById("save_data");
var serverName = document.getElementById("server_name");

saveButton.addEventListener("click", function(){
    if(serverName.value){
        chrome.storage.sync.set({ "server_name": serverName.value }, function(){
            console.log("server_name => " + serverName.value + " set edildi.");
            var h1Tag = document.getElementsByTagName("h1");
            h1Tag[0].innerText = serverName.value;
        });
    }
});

chrome.storage.sync.get(["server_name"]).then((result) => {
    if(result.server_name){
        var h1Tag = document.getElementsByTagName("h1");
        h1Tag[0].innerText = result.server_name;
    }
});