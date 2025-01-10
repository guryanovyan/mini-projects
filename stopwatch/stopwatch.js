
const display = document.getElementById("stopwatch");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false; 

function start(){

    if (!isRunning){       
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop(){
    
    if (isRunning){
        elapsedTime = Date.now() - startTime;
        timer = clearInterval(timer);
        isRunning = false;
    }
}

function reset(){

    timer = clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;

    display.textContent = `00:00:00:00`;
}

function update(){
    
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, 0);;
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60).toString().padStart(2, 0);;
    let seconds = Math.floor(elapsedTime / 1000 % 60).toString().padStart(2, 0);;
    const milliseconds = Math.floor(elapsedTime % 1000 / 10).toString().padStart(2, 0);

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}