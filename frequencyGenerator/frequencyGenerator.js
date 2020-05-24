var context = null;

var frequency = 440;
var gain = null;
var shape = null;
var osc = null;

var isTone = false;

function init(){
    context = new (window.AudioContext || window.webkitAudioContext)();
    Nexus.context = context;
    gain = context.createGain();
    gain.connect(context.destination);
    gain.gain.value=1.0;

    var oscilloscope = new Nexus.Oscilloscope('#oscilloscope');
    oscilloscope.connect(gain);

    initOscAndGain();
    }

function initOscAndGain(){
    var freqEle = document.getElementById('nr-frequency');
    freqEle.value = frequency;
    freqEle.addEventListener('change',function() {
        frequency = parseInt(document.getElementById('nr-frequency').value);
        if (frequency < 15) {
            frequency = 15;
        }
        if (frequency > 200000) {
            frequency = 200000;
        }
        if (isTone == true) {
            stopTone();
            startTone();
        }
    })
    
    shape = new Nexus.Select('#select',{
        'options':['sine', 'square', 'triangle','sawtooth']
    })
    shape.on('change',function(v) {
        if (isTone == true) {
            stopTone();
            startTone();
        }
    })
    
    var button = new Nexus.Button('#power-button',{
        'size': [80,80],
        'mode': 'toggle',
        'state': false
    })
    button.on('change',function(v) {
        if (v == true) {
            isTone = true;
            startTone();
        } else {
            isTone = false;
            stopTone();
        }
    })
}

function startTone(){
    var now = context.currentTime;
    osc = context.createOscillator();
    osc.connect(gain);
    osc.frequency.setValueAtTime(frequency, now);
    osc.type = shape.value;
    osc.start();
    
    gain.gain.cancelScheduledValues(0);
    gain.gain.setValueAtTime(1.0, now);
}

function stopTone(){
    osc.stop();
}