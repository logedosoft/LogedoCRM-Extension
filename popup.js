let queryOptions = { active: true, lastFocusedWindow: true };
chrome.tabs.query(queryOptions, ([tab]) => {
    if (tab.url != null) {
        var URL = tab.url.match(/:\/\/(www\.)?(.[^/]+)/)[2];
        //console.log(URL);
        //SaveData_Erpnext(URL);


        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://companyenrichment.abstractapi.com/v1/?api_key=9514c0a78aae44849c15598b1fe75f6b&domain=${URL}`);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var responseText  = JSON.parse(xhr.responseText);
                var h1Tag = document.getElementsByTagName("h1");
                h1Tag[0].innerText = "Data saving to Frappe...";
                SaveData_Erpnext(responseText);


                if (xhr.status === 400) {
                    console.error("Bad Request:", xhr.responseText);
                }
            }
        };
        xhr.send();
    }
});

function SaveData_Erpnext(arrResponse){
    var h1Tag = document.getElementsByTagName("h1");
    h1Tag[0].innerText = arrResponse.domain;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.135.171.183:8000/api/resource/Lead");

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.setRequestHeader("Authorization", "token 7e298d253706582:5d3f58efd0e9207");

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
        territory: arrResponse.country || ""
    });

    xhr.send(body);
}