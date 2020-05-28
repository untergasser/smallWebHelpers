
window.running = false;
window.context = new (window.AudioContext || window.webkitAudioContext)();
const centerPage = document.getElementById('my-central-space');

document.addEventListener("DOMContentLoaded", function() {
    startup();
});


function startup() {
    var ret = "    <h2>Revolving Timer</h2>\n";
    ret += '<br />\n    <h3 id="stopwatch"></h3><br />\n'

    if (document.documentElement.lang == "de") {
        ret += "    <h3>Wiederhole alle</h3>\n";
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inTitle">Tage</label>\n';
        ret += '      <input type="text" class="form-control" id="inDays" value="0">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inDate">Stunden</label>\n';
        ret += '      <input type="text" class="form-control" id="inHours" value="0">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inTime">Minuten</label>\n';
        ret += '      <input type="text" class="form-control" id="inMin" value="5">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inSec">Sekunden</label>\n';
        ret += '      <input type="text" class="form-control" id="inSec" value="0">\n';
        ret += '    </div>\n';
    } else {
        ret += "    <h3>Repeat every</h3>\n";
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inTitle">Days</label>\n';
        ret += '      <input type="text" class="form-control" id="inDays" value="0">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inDate">Hours</label>\n';
        ret += '      <input type="text" class="form-control" id="inHours" value="0">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inTime">Minutes</label>\n';
        ret += '      <input type="text" class="form-control" id="inMin" value="5">\n';
        ret += '    </div>\n';
        ret += '    <div class="form-group">\n';
        ret += '      <label for="inSec">Seconds</label>\n';
        ret += '      <input type="text" class="form-control" id="inSec" value="0">\n';
        ret += '    </div>\n';
    }

    ret += '      <h3 id="stopwatch"></h3><br />\n'
    ret += '      <button type="button" onclick="startStopwatch();" class="btn btn-success">Start/Stop</button>\n'

    ret += "<br /><br /><br /><br /><br />";
    ret += '    </div>\n';
    ret += footer();
    centerPage.innerHTML = ret;

    document.getElementById("stopwatch").innerHTML = "0d 0h 0m 0.0s ";
}


function startStopwatch() {
    if (window.running) {
        clearInterval(window.timer);
        document.getElementById("stopwatch").innerHTML = "0d 0h 0m 0.0s ";
        window.running = false;
    } else {
        window.startTime = new Date().getTime();
        window.startTime += addTime();
        window.timer = setInterval(updateStopwatch, 100);
        updateStopwatch();
        window.running = true;
    }
}


function addTime() {
    var addTimeSp = parseInt(document.getElementById("inDays").value) * 1000 * 60 * 60 * 24;
    addTimeSp += parseInt(document.getElementById("inHours").value) * 1000 * 60 * 60;
    addTimeSp += parseInt(document.getElementById("inMin").value) * 1000 * 60;
    addTimeSp += parseInt(document.getElementById("inSec").value) * 1000;
    return addTimeSp;
}


function updateStopwatch() {
    var now = new Date().getTime();
    var distance = window.startTime - now;

    if ((distance < 2000) && (distance > 1900)) {
        beep_short();
    }
    if ((distance < 1000) && (distance > 900)) {
        beep_short();
    }
    if (distance < 0) {
        window.startTime += addTime();
        distance = window.startTime - now;
        beep_long();
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var msec = Math.floor(distance % 1000/ 100);

    document.getElementById("stopwatch").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "." + msec + "s ";
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


function beep_long() {
    var context = window.context;
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    var now = context.currentTime;
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.type = "square";
    gain.gain.setValueAtTime(1.0, now);

    oscillator.start();
    oscillator.stop(now + 0.2);
}

function beep_short() {
    var context = window.context;
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    var now = context.currentTime;
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.type = "square";
    gain.gain.setValueAtTime(1.0, now);

    oscillator.start();
    oscillator.stop(now + 0.6);
}
