
window.running = false;
window.waiting = false;
window.mem = 0;
window.spanTime = 8000;
const centerPage = document.getElementById('my-central-space');

document.addEventListener("DOMContentLoaded", function() {
    startup();
});


function startup() {
    var ret = "";
    ret += '    <div class="my-center-it">\n';
    ret += "<h2>Erstelle neuen Countdown</h2>\n"
    ret += '    <div class="form-group">\n';
    if (document.documentElement.lang == "de") {
        ret += '      <label for="inSec">Sekunden bis zurm Start</label>\n';
    } else {
        ret += '      <label for="inSec">Seconds till test start</label>\n';
    }
    ret += '      <input type="text" class="form-control" id="waitSec" value="1.0">\n';
    ret += '    </div>\n';
    ret += '    <div class="form-group">\n';
    if (document.documentElement.lang == "de") {
        ret += '      <label for="inSec">Sekunden für den Test</label>\n';
    } else {
        ret += '      <label for="inSec">Seconds for the test</label>\n';
    }
    ret += '      <input type="text" class="form-control" id="forSec" value="5.0">\n';
    ret += '    </div>\n';

    ret += '      <button type="button" onclick="startStopwatch();" class="btn btn-success">Start/Stop</button>\n'
 
    ret += "<br /><br /><br /><br /><br /><br />";
    ret += '      <h2 id="resReact">Sekunden bis zurm Start</h2>\n';
    ret += "<br /><br /><br /><br /><br />";
    ret += '    </div>\n';
    ret += footer();
    centerPage.innerHTML = ret;
    centerPage.style.backgroundColor = "#ffffff";
}

function startStopwatch() {
    if ((window.running) && (!(window.waiting))) {
        var now = new Date().getTime();
        centerPage.style.backgroundColor = "#ffffff";
        var difference = now - window.startTime;
        window.mem += difference;
        window.startTime = window.startTime + difference;
        clearInterval(window.timer);
        window.running = false;
        ele = document.getElementById("resReact");
        if (document.documentElement.lang == "de") {
            ele.innerHTML = "Reaktionszeit: " + (difference / 1000) + " sec";
        } else {
            ele.innerHTML = "Reaction time: " + (difference / 1000) + " sec";
        }
    } else {
        if (!(window.waiting)) {
            window.running = true;
            window.waiting = true;
            var delayTime = document.getElementById("waitSec").value.replace(/,/, '.') * 1000;
            window.spanTime = document.getElementById("forSec").value.replace(/,/, '.') * 1000;
            centerPage.style.backgroundColor = "#ccffb3";
            setTimeout(delayStart, delayTime);
        }
    }
}

function delayStart() {
    var randSpice = Math.random();
    setTimeout(reallyStart, window.spanTime * randSpice);
}

function reallyStart() {
    window.waiting = false;
    window.startTime = new Date().getTime();
    centerPage.style.backgroundColor = "#ff0000";
}

function footer() {
    var ret = "<br /><br /><br /><br />";
    ret += '   <div class="title my-center-it" style="width:320;">\n';
    ret += '         <div class="titlebox">&copy; by A. Untergasser</div>\n';
    ret += '         <div style="padding-top:10px;">\n';
    ret += '           <a href="../index.html">Home</a>\n';
    ret += '           &nbsp;&nbsp;:&nbsp;&nbsp;\n';
    ret += '           <a href="../legal/impressum.html">Impressum</a>\n';
    ret += '           &nbsp;&nbsp;:&nbsp;&nbsp;\n';
    ret += '           <a href="../legal/privacy.html">Privacy Policy</a>\n';
    ret += '         </div>\n';
    ret += '     </div>\n';

    return ret;
}
