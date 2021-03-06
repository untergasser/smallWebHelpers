

const centerPage = document.getElementById('my-central-space');

document.addEventListener("DOMContentLoaded", function() {
    startup();
});


function startup() {
    var ret = "";
    var search = {};

    var curAddress = decodeURI(window.location.search);

    if (curAddress.includes("?")) {
        search = JSON.parse('{"' + curAddress.replace(/\?/g, '').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    }

    if (search.hasOwnProperty("datetime") && search.hasOwnProperty("title")) {
        ret += '    <div class="my-center-it">\n';
        ret += "      <h2>" + search["title"] + "</h2>\n<br />\n"
        ret += '      <h3 id="countDown"></h3>\n'
        ret += "<br /><br /><br /><br /><br />";
        ret += '      <p>\n';
        ret += '        <a id="finalLink" target="_blank" href="' + window.location.href.split('?')[0];
        if (document.documentElement.lang == "de") {
            ret += '">Erstelle neuen Countdown</a>\n';
        } else {
            ret += '">Create New Countdown</a>\n';
        }
        ret += '      </p>\n';
        ret += '    </div>\n';
        ret += footer();
        centerPage.innerHTML = ret;


        var b = search["datetime"].split(/\D+/);
        window.countDownDate = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));

        window.timer = setInterval(updateCountdown, 1000);
        updateCountdown();
    } else {
        var newYear = new Date().getFullYear() + 1;
        if (document.documentElement.lang == "de") {
            ret += "<h2>Erstelle neuen Countdown</h2>\n"
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inTitle">Countdown Titel</label>\n';
            ret += '      <input type="text" class="form-control" id="inTitle" onchange="updateLink();" value="Countdown bis Neujahr">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inDate">Datum</label>\n';
            ret += '      <input type="date" class="form-control" id="inDate" onchange="updateLink();" value="' + newYear + '-01-01">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inTime">Uhrzeit</label>\n';
            ret += '      <input type="time" class="form-control" id="inTime" onchange="updateLink();" value="00:00">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inSec">Sekunden</label>\n';
            ret += '      <input type="text" class="form-control" id="inSec" onchange="updateLink();" value="00">\n';
            ret += '    </div>\n';

            ret += '    <div class="form-group">\n';
            ret += '      <p>Hier ist der Link zum Countdown. Er kann gespeichert und geteilt werden, um den Countdown sp&auml;ter aufzurufen.<br />\n';
            ret += '        Zum &Ouml;ffnen des Countdowns bitte anklicken:<br />\n';

        } else {
            ret += "<h2>Create New Countdown</h2>\n"
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inTitle">Countdown Title</label>\n';
            ret += '      <input type="text" class="form-control" id="inTitle" onchange="updateLink();" value="Countdown till New Year">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inDate">Date</label>\n';
            ret += '      <input type="date" class="form-control" id="inDate" onchange="updateLink();" value="' + newYear + '-01-01">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inTime">Time</label>\n';
            ret += '      <input type="time" class="form-control" id="inTime" onchange="updateLink();" value="00:00">\n';
            ret += '    </div>\n';
            ret += '    <div class="form-group">\n';
            ret += '      <label for="inSec">Seconds</label>\n';
            ret += '      <input type="text" class="form-control" id="inSec" onchange="updateLink();" value="00">\n';
            ret += '    </div>\n';

            ret += '    <div class="form-group">\n';
            ret += '      <p>Below is the link to the timer. It may be saved and shared to access the timer later.<br />\n';
            ret += '        Click to open the created timer:<br />\n';
        }
        ret += '        <a id="finalLink" target="_blank" href="index.html">Not updated yet</a>\n';
        ret += '      </p>\n';
        ret += '    </div>\n';

        ret += footer();

        centerPage.innerHTML = ret;

        updateLink();
    }
}


function updateCountdown() {
    var now = new Date().getTime();
    var distance = window.countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countDown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(window.timer);
        window.context = new (window.AudioContext || window.webkitAudioContext)();
        beep_alarm();
        if (document.documentElement.lang == "de") {
            document.getElementById("countDown").innerHTML = "ABGELAUFEN";
        } else {
            document.getElementById("countDown").innerHTML = "EXPIRED";
        }
    }
}


function updateLink() {
    var eleFinLink = document.getElementById('finalLink');

    var cTitle = document.getElementById('inTitle').value;
    var cDate = document.getElementById('inDate').value.split('-');
    var cTime = document.getElementById('inTime').value.split(':');
    var cSec = document.getElementById('inSec').value;

    var date = new Date(cDate[0], cDate[1], cDate[2], cTime[0], cTime[1], cSec);
    var dateUTC =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, date.getUTCDate(),
                            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    var outDate = new Date(dateUTC);

    var link = window.location.href.split('?')[0] + "?datetime=" + outDate.toISOString() + "&title=" + encodeURI(cTitle);
    eleFinLink.href = link;
    eleFinLink.innerHTML = link;
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

function beep_alarm() {
    beep_sequence()
    setTimeout(beep_alarm, 700);
}

function beep_sequence() {
    beep()
    setTimeout(beep, 110);
    setTimeout(beep, 220);
    setTimeout(beep, 330);
}

function beep() {
    var context = window.context;
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    var now = context.currentTime;
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.type = "square";
    gain.gain.setValueAtTime(1.0, now);

    oscillator.start(now+0.04);
    oscillator.stop(now+0.1);
}
