
const display = document.getElementById("display");

function insertToDisplay(input){
    display.value += input;
}

function backspaceDisplay(){
    display.value = display.value.slice(0, -1);
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval?.(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}