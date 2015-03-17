function initial_setup() {
    continious_refresh();
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
    press_refresh_button();
    setTimeout(continious_refresh, 30000); // Thousands are seconds
}

function refresh_if_no_activity() {
     var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
         if(new Date().getTime() - time >= 60000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 10000);
     }

     setTimeout(refresh, 10000);
}
window.onload = initial_setup; 
