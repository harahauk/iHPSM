function initial_setup() {
    chrome.storage.sync.get("auto_refresh_on", function (returned_bool) {
       if(returned_bool["auto_refresh_on"]) continious_refresh();
    });
    //remove_todo_text_and_viewselector();
    //auto_dispatch();
    //TODO: Experiment with timeout
    setTimeout(parse_hpsm_fields, 2000);
}

function auto_dispatch() {
    if (document.getElementsByClassName("view_SD_update_interaction") > 0) {
        console.log('I see dispatching');
    }
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

/* This function is loaned/stolen/ripped off from
 * https://bitbucket.org/Dentsor/orakel-hpsm-script/
*/
function parse_hpsm_fields() {
    var arr = document.querySelectorAll(".x-tab-panel-body .x-panel.x-panel-noborder");
        for (var i=0; i < arr.length; i++) {
            if(arr[i].id.substring(0, 3) == "ext") {
                if(arr[i].className.indexOf('x-hide-nosize') == -1){
                        var arr2 = arr[i].querySelectorAll("iframe.ux-mif");
                        if(arr2.length === 1) {
                            var doc = arr2[0].contentWindow.document;
                            console.log(doc);
                            var fields = {}, listButtons = {}, unknownButtons = {}, findButtons = {}, fillButtons = {}, actionButtons = {}, labels = {};

                            labels["interactionId"] = $('label:contains("Interaction ID")', doc).first();
                            labels["status"] = $('label:contains("Status")', doc).first();
                            labels["helpdesk"] = $('label:contains("Helpdesk")', doc).first();
                            labels["contact"] = $('label:contains("Contact")', doc).first();
                            labels["contactEmail"] = $('label:contains("Contact email")', doc).first();
                            labels["title"] = $('label:contains("Title")', doc).first();
                            labels["endUser"] = $('label:contains("End user")', doc).first();
                            labels["endUserDept"] = $('label:contains("End user dept.")', doc).first();
                            labels["description"] = $('label:contains("Description")', doc).first();
                            labels["category"] = $('label:contains("Category")', doc).first();
                            labels["subcategory"] = $('label:contains("Subcategory")', doc).first();
                            labels["service"] = $('label:contains("Service")', doc).first();
                            labels["impact"] = $('label:contains("Impact")', doc).first();
                            labels["urgency"] = $('label:contains("Urgency")', doc).first();
                            labels["priority"] = $('label:contains("Priority")', doc).first();
                            labels["assignmentGroup"] = $('label:contains("Assignment group")', doc).first();
                            labels["assignee"] = $('label:contains("Assignee")', doc).first();
                            labels["targetDate"] = $('label:contains("SLA target date")', doc).first();
                            labels["newUpdate"] = $('label:contains("New update")', doc).first();
                            labels["closureCode"] = $('label:contains("Closure code")', doc).first();
                            labels["solution"] = $('label:contains("Solution")', doc).first();

                            fields["interactionId"] = $("#"+labels["interactionId"].attr("for"), doc);
                            fields["status"] = $("#"+labels["status"].attr("for"), doc);
                            fields["helpdesk"] = $("#"+labels["helpdesk"].attr("for"), doc);
                            fields["contact"] = $("#"+labels["contact"].attr("for"), doc);
                            fields["contactEmail"] = $("#"+labels["contactEmail"].attr("for"), doc);
                            fields["title"] = $("#"+labels["title"].attr("for"), doc);
                            fields["endUser"] = $("#"+labels["endUser"].attr("for"), doc);
                            fields["endUserDept"] = $("#"+labels["endUserDept"].attr("for"), doc);
                            fields["description"] = $("#"+labels["description"].attr("for"), doc);
                            fields["category"] = $("#"+labels["category"].attr("for"), doc);
                            fields["subcategory"] = $("#"+labels["subcategory"].attr("for"), doc);
                            fields["service"] = $("#"+labels["service"].attr("for"), doc);
                            fields["impact"] = $("#"+labels["impact"].attr("for"), doc);
                            fields["urgency"] = $("#"+labels["urgency"].attr("for"), doc);
                            fields["priority"] = $("#"+labels["priority"].attr("for"), doc);
                            fields["assignmentGroup"] = $("#"+labels["assignmentGroup"].attr("for"), doc);
                            fields["assignee"] = $("#"+labels["assignee"].attr("for"), doc);
                            // fields["assigneeFull"] = $( "#X" + (parseInt(labels["assignee"].attr("for").replace("X", "")) + 1), doc );
                            fields["targetDate"] = $("#"+labels["targetDate"].attr("for"), doc);
                            fields["newUpdate"] = $("#"+labels["newUpdate"].attr("for"), doc);
                            fields["closureCode"] = $("#"+labels["closureCode"].attr("for"), doc);
                            fields["solution"] = $("#"+labels["solution"].attr("for"), doc);

                            listButtons["status"] = $("#"+labels["status"].attr("for") + "Button", doc);
                            listButtons["helpdesk"] = $("#"+labels["status"].attr("for") + "Button", doc);
                            listButtons["impact"] = $("#"+labels["status"].attr("for") + "Button", doc);

                            unknownButtons["contact"] = $( "#X" + (parseInt(labels["contact"].attr("for").replace("X", "")) + 1), doc );
                            unknownButtons["endUser"] = $( "#X" + (parseInt(labels["endUser"].attr("for").replace("X", "")) + 1), doc );
                            unknownButtons["service"] = $( "#X" + (parseInt(labels["service"].attr("for").replace("X", "")) + 1), doc );

                            findButtons["service"] = $("#"+labels["status"].attr("for") + "FindButton", doc);

                            fillButtons["contact"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["endUser"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["category"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["subcategory"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["service"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["assignmentGroup"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["assignee"] = $("#"+labels["status"].attr("for") + "FillButton", doc);
                            fillButtons["closureCode"] = $("#"+labels["status"].attr("for") + "FillButton", doc);

                            actionButtons["markAsSpam"] = $('button:contains("Mark as SPAM")', doc);
                            actionButtons["newEmail"] = $('button:contains("New Email")', doc);
                            actionButtons["fullCaseflow"] = $('button:contains(Full Case Flow)', doc);
                            actionButtons["refreshHistory"] = $('button:contains(Refresh History)', doc);

                            var parsed = {}
                            parsed["fields"] = fields;
                            parsed["listButtons"] = listButtons;
                            parsed["unknownButtons"] = unknownButtons;
                            parsed["findButtons"] = findButtons;
                            parsed["fillButtons"] = fillButtons;
                            parsed["actionButtons"] = actionButtons;
                            //console.log(parsed);
                            return parsed;
                }
            }
        }
    }
}
//window.onload = initial_setup;
window.addEventListener("load", initial_setup);
