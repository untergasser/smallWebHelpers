
window.running = false;
window.mem = 0;
const centerPage = document.getElementById('my-central-space');

document.addEventListener("DOMContentLoaded", function() {
    startup();
});


function startup() {
    var ret = "";
    ret += '    <div class="my-center-it">\n';
        if (document.documentElement.lang == "de") {
            ret += "      <h2>Stoppuhr</h2>\n<br />\n"
        } else {
            ret += "      <h2>Stopwatch</h2>\n<br />\n"
        }

    ret += '      <h3 id="stopwatch"></h3><br />\n'
    ret += '      <button type="button" onclick="startStopwatch();" class="btn btn-success">Start/Stop</button>\n'
    ret += '      <button type="button" onclick="resetStopwatch();" class="btn btn-danger">Reset</button>\n'

    ret += "<br /><br /><br /><br /><br />";
    ret += '    </div>\n';
    ret += footer();
    centerPage.innerHTML = ret;

    resetStopwatch();
}


function startStopwatch() {
    if (window.running) {
        var now = new Date().getTime();
        var difference = now - window.startTime;
        window.mem += difference;
        window.startTime = window.startTime + difference;
        clearInterval(window.timer);
        window.running = false;
    } else {
        window.startTime = new Date().getTime();
        window.timer = setInterval(updateStopwatch, 100);
        window.running = true;
    }
    updateStopwatch();
}


function updateStopwatch() {
    var now = new Date().getTime();
    var distance = window.mem + now - window.startTime;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var msec = Math.floor(distance % 1000/ 100);

    document.getElementById("stopwatch").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "." + msec + "s ";
}


function resetStopwatch() {
    window.mem = 0;
    clearInterval(window.timer);
    window.running = false;

    document.getElementById("stopwatch").innerHTML = "0d 0h 0m 0.0s ";
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
