let queryOptions = { active: true, lastFocusedWindow: true };
chrome.tabs.query(queryOptions, ([tab]) => {
    if (tab.url != null) {
        var h1Tag = document.getElementsByTagName("h1");
        h1Tag[0].innerText = tab.url;

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
            first_name: tab.url,
            website: tab.url
        });

        xhr.send(body);
    }
});
