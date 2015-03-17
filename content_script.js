function initial_setup() {
    chrome.storage.sync.get("auto_refresh_on", function (returned_bool) {
       if(returned_bool["auto_refresh_on"]) continious_refresh();
    });
}

function press_refresh_button() {
    var arr = document.querySelectorAll("button");
        for(i = 0; i < arr.length; i++) {
            if (arr[i].innerHTML == "Refresh") {
                arr[i].click();
            }
        }
}

function continious_refresh() {
    chrome.storage.sync.get("auto_refresh_on", function (returned_bool) {
       if(returned_bool["auto_refresh_on"]) {
           console.log(returned_bool["auto_refresh_on"]);
           press_refresh_button();
           setTimeout(continious_refresh, 30000); // Thousands are seconds
       }
    });
}

function turn_on_auto_refresh() {
    chrome.storage.sync.set({"auto_refresh_on": true});
}

window.onload = initial_setup;
