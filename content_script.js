function initial_setup() {
    chrome.storage.sync.get("auto_refresh_on", function (returned_bool) {
       if(returned_bool["auto_refresh_on"]) continious_refresh();
    });
    //remove_todo_text_and_viewselector();
}

function continious_refresh() {
    chrome.storage.sync.get("auto_refresh_on", function (returned_bool) {
       if(returned_bool["auto_refresh_on"]) {
           press_refresh_button();
           setTimeout(continious_refresh, 30000); // Thousands are seconds
       }
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

function get_the_todo_iframe_document() {
    try { // A workaround for function being called before iframe loads
        if (document.getElementsByClassName('dm-list').length > 0) {
            //console.log(document);
            return document;
        }
        return null;
    }
    catch (err) {
        console.log(err);
        return null
    }
}

function remove_todo_text_and_viewselector() {
    var doc = get_the_todo_iframe_document();
    if (doc) {
        //console.log('Moving on');
        var labels = doc.getElementsByClassName('Label');
        var boxes = doc.getElementsByClassName('ComboBox')
        for(i = 0; i < labels.length; i++) {
            labels[i].style.display = 'none';
        }
        for(i = 0; i < boxes.length; i++) {
            boxes[i].style.display = 'none';
        }
        var bodyo = doc.getElementById('tpz_body');
        console.log(doc.getElementById('topaz'));
        doc.getElementsByClassName('SubFormat')[0].style.display = 'none';
        //console.log(doc.getElementById('tpz_body'));
    }
}

// window.onload = initial_setup;
window.addEventListener("load", initial_setup);
// <a id="cwc_masthead_title_link" title="HP Service Manager:9.40.0015">HP
// Service Manager</a>
