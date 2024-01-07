var finishText = false;
var consoleReady = false;
var textSpeed = 25;
document.addEventListener("keydown", enterKeyPressed, false);
function enterKeyPressed(event){
    if(consoleReady){
        console.log(event.keyCode)
        if(event.keyCode == 8){
            handleUserInput("",true)
        }else if(event.keyCode == 13){
            alert("submit user input")
        }else{
            handleUserInput(event.key);
        }
        // only look for alphanumeric keys
    }else{
        if(event.keyCode == 13){
            textSpeed = 1;
        }
    }
}
const activityPrompt = document.getElementById("activityPrompt");
const activityChoices = ["1: Numbers Game", "2: Calculator", "3: Guess the Phrase", "4: Username and Password"]
var activitiOptionNum = 0;
var activityPromptText = "Choose an activity from the list below";

function displayText(element, text, letterPos){
    element.innerHTML += text[letterPos];
    letterPos++;
    if(letterPos==text.length){
        element.innerHTML += "<br>";
        if(activitiOptionNum<activityChoices.length){
            displayText(activityPrompt, activityChoices[activitiOptionNum], 0)
            activitiOptionNum++;
        }else{
            element.innerHTML += '<br>$ <span id="userInput"></span><span id="customCaret">&nbsp;</span>'
            consoleReady = true;
            textSpeed = 25;
        }
    }
    if(letterPos<text.length && !finishText){
        setTimeout(() => {
            displayText(element, text, letterPos)
        }, textSpeed);
    }
}

displayText(activityPrompt, activityPromptText, 0);

function handleUserInput(userChar, delLast=false){
    let currentUserText = document.getElementById("userInput").innerHTML;
    if(delLast){
        document.getElementById("userInput").innerHTML = currentUserText.substring(0, currentUserText.length-1);
    }else{
        document.getElementById("userInput").innerHTML += userChar;
    }
}