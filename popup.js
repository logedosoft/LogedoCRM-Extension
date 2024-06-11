

var saveBtn = document.getElementById("saveButton");
saveBtn.onclick = function() {
    var serverURL = document.getElementById("server_url").value;
    var apiKey = document.getElementById("api_key").value;
    var apiSecret = document.getElementById("api_secret").value;
    setServerName(serverURL, apiKey, apiSecret);
};


function setServerName(serverURL, apiKey, apiSecret) {
    console.log("test1");
    chrome.storage.local.get(["server_data"]).then((result) => {
        console.log("result");
        let serverDataArray = Array.isArray(result.server_data) ? result.server_data : [];
        serverDataArray.push({ server_url: serverURL, api_key: apiKey, api_secret: apiSecret });
        chrome.storage.local.set({ server_data: serverDataArray }).then(() => {
            console.log("Local storage saved.");
        });
    });
}


function checkStorage() {
    chrome.storage.local.get(["server_data"]).then((result) => {
        if (result.server_data && Array.isArray(result.server_data)) {
            result.server_data.forEach(data => {
                if(data.server_url.length > 0 && data.api_key.length > 0 && data.api_secret.length > 0){


                    var server_url_Txt = document.getElementById("server_url");
                    server_url_Txt.value = data.server_url;
                    
                    var api_key_txt = document.getElementById("api_key");
                    api_key_txt.value = data.api_key;

                    var api_secret_txt = document.getElementById("api_secret");
                    api_secret_txt.value = data.api_secret;


                    let queryOptions = { active: true, lastFocusedWindow: true };

                    chrome.tabs.query(queryOptions, ([tab]) => {
                        if (tab.url != null) {
                            var URL = tab.url.match(/:\/\/(www\.)?(.[^/]+)/)[2];
                            //console.log(URL);
                            //SaveData_Erpnext(URL);
                            var h1Tag = document.getElementsByTagName("h1");
                            h1Tag[0].innerText = URL;

                            const xhr = new XMLHttpRequest();
                            xhr.open("GET", `https://companyenrichment.abstractapi.com/v1/?api_key=9514c0a78aae44849c15598b1fe75f6b&domain=${URL}`);

                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    var responseText  = JSON.parse(xhr.responseText);
                                    var h1Tag = document.getElementsByTagName("h1");
                                    h1Tag[0].innerText = "Data saving to Frappe...";
                                    console.log(responseText,data.server_url,data.api_key,data.api_secret);

                                    SaveData_Erpnext(responseText, data.server_url, data.api_key, data.api_secret);


                                    if (xhr.status === 400) {
                                        console.error("Bad Request:", xhr.responseText);
                                    }
                                }
                            };
                            xhr.send();
                        }
                    });

                }
            });
        } else {
            console.log("No server data found or server_data is not an array.");
        }
    });
}


function SaveData_Erpnext(arrResponse, ServerURL, APIKey, APISecret){


    const xhr = new XMLHttpRequest();
    xhr.open("POST", ServerURL);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.setRequestHeader("Authorization", `token ${APIKey}:${APISecret}`);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log("Status:", xhr.status);
            console.log("Response:", xhr.responseText);
            if (xhr.status === 400) {
                console.error("Bad Request:", xhr.responseText);
            }
        }
    };

    const body = JSON.stringify({
        first_name: arrResponse.domain || "",
        website: arrResponse.domain || "",
        //territory: arrResponse.country || "",
        company_name: arrResponse.domain || ""
    });

    console.log(body);
    xhr.send(body);
}

window.addEventListener('load', function () {
    console.log("tam olarak yüklendi");
    checkStorage();
})