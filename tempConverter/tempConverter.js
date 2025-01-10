function conversion(){
    const value = document.getElementById("value").value;
    const answer = document.getElementById("answer");
    
    if (document.getElementById("toFahrenheit").checked) {
        answer.textContent = `${convertToFahrenheit(value)} °F`    
    }
    else if (document.getElementById("toCelcius").checked) {
        answer.textContent = `${convertToCelcius(value)} °C`    
    }
    else {
        answer.textContent = `Select an option`
    }

    console.log(document.getElementById("toCelcius").checked);
}

function convertToFahrenheit(value){
    let temp = value * 1.8 + 32;
    return temp.toFixed(2);
}

function convertToCelcius(value){
    let temp = (value - 32) / 1.8;
    return temp.toFixed(2);
}