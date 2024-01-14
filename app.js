var consoleReady = false;
var textSpeed = 25;
var currentApp = 0; //0-Main, 1-Numbers, 2-Calc, 3-Phrase, 4-Username/Password
const messageQueue = ["Choose an activity from the list below", "1: Numbers Game", "2: Calculator", "3: Guess the Phrase", "4: Username and Password"];
const numbersGameData = {};

const enterKeyPressed = (event) => {
    if(consoleReady){
        // console.log(event.keyCode)
        if(event.keyCode == 8){
            handleUserInput("",true);
        }else if(event.keyCode == 13){
            const lastUserInput = document.getElementById("userInput").innerHTML.split("<span")[0];
            handleUserInput(lastUserInput, false, true);
            switch(currentApp){
                case 1:
                    numbersGameApp(lastUserInput);
                    break;
                case 2:
                    // Calculator
                case 3:
                    // Guess the Phrase
                case 4:
                    // Username and Password
                default:
                    if(lastUserInput.toLowerCase()=="help"){
                        messageQueue.push("Choose an activity from the list below", "1: Numbers Game", "2: Calculator", "3: Guess the Phrase", "4: Username and Password");
                        displayText(activityPrompt, " ", 0);
                    }else{
                        startApp(lastUserInput);
                    }
            }
        }else if(/^[a-zA-Z0-9 +-=*/?!@#$%^&()'`~]+$/.test(event.key) && event.key.length==1){ // Only accept certain keys
            handleUserInput(event.key);
        }
    }else{
        if(event.keyCode == 13){
            textSpeed = 1;
        }
    }
}

document.addEventListener("keydown", enterKeyPressed, false);
const activityPrompt = document.getElementById("activityPrompt");

const displayText = (element, text, letterPos) => {
    element.innerHTML += text[letterPos];
    letterPos++;
    if(letterPos==text.length){
        element.innerHTML += "<br>";
        document.getElementById("fauxTerminal").scrollTop = document.getElementById("fauxTerminal").scrollHeight;
        if(messageQueue.length>0){
            console.log(messageQueue)
            displayText(activityPrompt, messageQueue[0], 0);
            messageQueue.shift();
        }else{
            element.innerHTML += '<br>$ <span id="userInput"></span><span id="customCaret">&nbsp;</span>';
            consoleReady = true;
            textSpeed = 25;
        }
    }
    if(letterPos<text.length){
        setTimeout(() => {
            displayText(element, text, letterPos);
        }, textSpeed);
    }
}

displayText(activityPrompt, " ", 0);

const handleUserInput = (userInput, delLast=false, submitInput=false) => {
    if(submitInput){
        document.getElementById("userInput").innerHTML = userInput+"<br>";
        document.getElementById("customCaret").innerHTML = "";
        document.getElementById("customCaret").id = "null";
        consoleReady = false;
        document.getElementById("userInput").id = "null";
        return
    }
    let currentUserText = document.getElementById("userInput").innerHTML;
    if(delLast){
        document.getElementById("userInput").innerHTML = currentUserText.substring(0, currentUserText.length-1);
    }else{
        document.getElementById("userInput").innerHTML += userInput;
    }
}

const startApp = selectedApp => {
    if(document.getElementById("userInput")){
        document.getElementById("userInput").id = "";
    }
    switch(parseInt(selectedApp)){
        case 1:
            currentApp = 1;
            numbersGameData['answer'] = Math.floor(Math.random()*10);
            numbersGameData['count'] = 0;
            console.log(numbersGameData['answer'])
            messageQueue.push("Starting Numbers Game");
            messageQueue.push("Guess a number between 0 and 10");
            numbersGameApp(); // HERE
            break;
        default:
            displayText(activityPrompt, "Please make a valid selection. Type help to see options again.", 0);
    }
}

const numbersGameApp = (guess=null) => {
    if(guess){
        if(isNaN(guess)){
            displayText(activityPrompt, "Please enter a valid number", 0);
        }else{
            if(guess == numbersGameData['answer']){
                currentApp = 0;
                messageQueue.push(
                    "You got it! Thank you for playing.",
                    "*************************", 
                    "Choose an activity from the list below", 
                    "1: Numbers Game", 
                    "2: Calculator", 
                    "3: Guess the Phrase", 
                    "4: Username and Password");
                displayText(activityPrompt, " ", 0);
            }else{
                numbersGameData['count']++;
                displayText(activityPrompt, "Try again", 0);
            }
        }
    }else{
        if(numbersGameData['count']>0){
            displayText(activityPrompt, "Guess a number between 0 and 10", 0);
        }else{
            displayText(activityPrompt, " ", 0);
        }
    }
}