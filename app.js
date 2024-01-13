var consoleReady = false;
var textSpeed = 25;

const enterKeyPressed = (event) => {
    if(consoleReady){
        // console.log(event.keyCode)
        if(event.keyCode == 8){
            handleUserInput("",true);
        }else if(event.keyCode == 13){
            const lastUserInput = document.getElementById("userInput").innerHTML.split("<span")[0];
            handleUserInput(lastUserInput, false, true);
            console.log(lastUserInput)
            if(lastUserInput.toLowerCase()=="help"){
                activitiOptionNum=0;
                displayText(activityPrompt, activityPromptText, 0);
            }else{
                startApp(lastUserInput);
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
const activityChoices = ["1: Numbers Game", "2: Calculator", "3: Guess the Phrase", "4: Username and Password"]
var activitiOptionNum = 0;
var activityPromptText = "Choose an activity from the list below";

const displayText = (element, text, letterPos) => {
    element.innerHTML += text[letterPos];
    letterPos++;
    if(letterPos==text.length){
        element.innerHTML += "<br>";
        if(activitiOptionNum<activityChoices.length){
            displayText(activityPrompt, activityChoices[activitiOptionNum], 0);
            activitiOptionNum++;
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

displayText(activityPrompt, activityPromptText, 0);

const handleUserInput = (userInput, delLast=false, submitInput=false) => {
    if(submitInput){
        document.getElementById("userInput").innerHTML = userInput+"<br>";
        document.getElementById("customCaret").innerHTML = "";
        document.getElementById("customCaret").id = "null";
        document.getElementById("fauxTerminal").scrollTop = document.getElementById("fauxTerminal").scrollHeight;
        consoleReady = false;
        if(userInput.toLowerCase()=="help"){
            document.getElementById("userInput").id = "null";
        }
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
    switch(parseInt(selectedApp)){
        case 1:
            numbersGameApp();
            break;
        default:
            document.getElementById("userInput").id = "";
            displayText(activityPrompt, "Please make a valid selection. Type help to see options again.", 0);
    }
}

const numbersGameApp = _ => {
    document.getElementById("userInput").id = "";
    displayText(activityPrompt, "Coming soon!", 0);
}