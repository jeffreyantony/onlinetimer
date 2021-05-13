
btn.onclick = button_handler;
var start_time;
var timer;

const audio = new Audio("hopbell.mp3");

function button_handler() {
    var txt = document.getElementById("btn").textContent;
    if(txt == "Start Timer") {
        document.getElementById("btn").textContent= "Stop Timer";
        start_timer();
    }
    else {
        document.getElementById("btn").textContent= "Start Timer";
        stop_timer();
    }
}

function start_timer() {
    start_time = Date.now();
    timer = setInterval(run_timer, 1000); // update about every second
}

function stop_timer() {
    clearInterval(timer); //stop the timer
    document.getElementById("time").innerHTML = 0;
}

function run_timer() {
    var delta = Date.now() - start_time; // milliseconds elapsed since start
    var time = Math.floor(delta / 1000); // in seconds
    document.getElementById("time").innerHTML = time;
    
    if(!(time%60)) {
        audio.play(); // now we're safe to play it        
    }
}
