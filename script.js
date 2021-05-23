
btn.onclick = button_handler;

const audio = new Audio("hopbell.mp3");

var w;

function startTimerWorker() {
    start_time = Date.now();
    timer = setInterval(workerTimerLoop, 1000); // update about every second
    
    function workerTimerLoop() {
    var delta = Date.now() - start_time; // milliseconds elapsed since start
    var time = Math.floor(delta / 1000); // in seconds

    postMessage(time);
    }
}

function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (typeof(w) == "undefined") {
            w = new Worker(URL.createObjectURL(new Blob(["("+startTimerWorker.toString()+")()"], {type: 'text/javascript'})));
        }
        
        w.onmessage = function(event) {
            document.getElementById("time").innerHTML = event.data;
            //console.log(event.data);
            if(!(event.data%60)) {
                play_audio();
                //console.log("bell");
            }
        };
    }
    else {
        document.getElementById("time").innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() {
  w.terminate();
  w = undefined;
  document.getElementById("time").innerHTML = 0;
}

let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
    audio.volume = e.currentTarget.value / 100;
    //console.log(e.currentTarget.value+"%");
    document.getElementById("vol-percentage").innerHTML= e.currentTarget.value+"%";
})

function button_handler() {
    var txt = document.getElementById("btn").textContent;
    if(txt == "Start Timer") {
        document.getElementById("btn").textContent= "Stop Timer";
        startWorker();
    }
    else {
        document.getElementById("btn").textContent= "Start Timer";
        stopWorker();
    }
}

/*function stop_timer() {
    clearInterval(timer); //stop the timer
    document.getElementById("time").innerHTML = 0;
}*/

function play_audio() {
    audio.play();
}
