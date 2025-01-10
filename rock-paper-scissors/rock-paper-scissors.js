
const choices = ['rock', 'paper', 'scissors'];
const playersDisplay = document.getElementById("playersDisplay");
const opponentsDisplay = document.getElementById("opponentsDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const buttons = document.getElementsByClassName("buttons");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const playersScoreDisplay = document.getElementById("playersScoreDisplay");
const opponentsScoreDisplay = document.getElementById("opponentsScoreDisplay");
let playerScoreCount = 0;
let opponentScoreCount = 0;

function playGame(playersChoice){
    
    const opponentsChoice = choices[Math.floor(Math.random() * 3)];
    
    for (button of buttons){
        button.classList.remove("greenBackground", "redBackground", "greenAndRedBackground");
    }
    paintAButton("player", playersChoice);
    paintAButton("opponent", opponentsChoice);

    let result = "";
    if (playersChoice === opponentsChoice){
        result = "DRAW!";
        paintAButton("draw", opponentsChoice);
    }
    else {
        switch(playersChoice){
            case "rock":
                result = (opponentsChoice === "scissors") ? "YOU WON!" : "YOU LOSE!";
                break;
            case "paper":
                result = (opponentsChoice === "rock") ? "YOU WON!" : "YOU LOSE!";
                break;
            case "scissors":
                result = (opponentsChoice === "paper") ? "YOU WON!" : "YOU LOSE!";
                break;
        }
    }

    playersChoiceDisplay.textContent = `${playersChoice}`;
    opponentsChoiceDisplay.textContent = `${opponentsChoice}`;
    resultDisplay.textContent = result;
    
    resultDisplay.classList.remove("greenText", "redText", "greenAndRedText");
    switch(result){
        case "YOU WON!":
            resultDisplay.classList.add("greenText");
            playerScoreCount++;
            resultDisplay.classList.add("greenText");
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText")
            opponentScoreCount++;
            break;
        case "DRAW!":
            resultDisplay.classList.add("greenAndRedText")
            break;
    }

    playersScoreCountDisplay.textContent = `${playerScoreCount}`;
    opponentsScoreCountDisplay.textContent = `${opponentScoreCount}`;
}

function paintAButton(operator, choice){
    switch(operator){
        case "player":
            switch(choice){
                case "rock":
                    rockBtn.classList.add("greenBackground");
                    break;
                case "paper":
                    paperBtn.classList.add("greenBackground");
                    break;
                case "scissors":
                    scissorsBtn.classList.add("greenBackground");
                    break;
            }
            break;
        case "opponent":
            switch(choice){
                case "rock":
                    rockBtn.classList.add("redBackground");
                    break;
                case "paper":
                    paperBtn.classList.add("redBackground");
                    break;
                case "scissors":
                    scissorsBtn.classList.add("redBackground");
                    break;
            }
            break;
        case "draw":
            switch(choice){
                case "rock":
                    rockBtn.classList.add("greenAndRedBackground");
                    break;
                case "paper":
                    paperBtn.classList.add("greenAndRedBackground");
                    break;
                case "scissors":
                    scissorsBtn.classList.add("greenAndRedBackground");
                    break;
            }
            break;
    }
}