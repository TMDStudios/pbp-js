var consoleReady = false;
var textSpeed = 25;
var currentApp = 0; //0-Main, 1-Numbers, 2-Calc, 3-Phrase, 4-Username/Password
var regEx = /^[a-zA-Z]+$/;
const messageQueue = ["Choose an activity from the list below", "1: Numbers Game", "2: Calculator", "3: Guess the Phrase", "4: Username and Password"];
const numbersGameData = {};
const guessThePhraseData = {
    phrasePool: ["this is the secret phrase", "she sells seashells", "this is the way", "fun with flags", "may the force be with you"]
};

const enterKeyPressed = (event) => {
    if(consoleReady){
        // console.log(event.keyCode)
        if(event.keyCode == 8){
            handleUserInput("",true);
        }else if(event.keyCode == 13){
            const lastUserInput = document.getElementById("userInput").innerHTML.split("<span")[0];
            handleUserInput(lastUserInput, false, true);
            if(lastUserInput.toLowerCase()=="exit"){
                messageQueue.push("Returning to main menu");
                backToMain();
            }else{
                switch(currentApp){
                    case 1:
                        numbersGameApp(lastUserInput);
                        break;
                    case 2:
                        calculatorApp(lastUserInput);
                        break;
                    case 3:
                        guessThePhraseApp(lastUserInput);
                        break;
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
        if(text.trim().length>0){
            element.innerHTML += "<br>";
        }
        document.getElementById("fauxTerminal").scrollTop = document.getElementById("fauxTerminal").scrollHeight;
        if(messageQueue.length>0){
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
            // console.log(numbersGameData['answer'])
            messageQueue.push("Starting Numbers Game", "Type 'exit' at any time to return to the main menu", "Guess a number between 0 and 10");
            numbersGameApp();
            break;
        case 2:
            currentApp = 2;
            messageQueue.push(
                "Starting Calculator App", 
                "Enter a basic equation with two numbers and one operator (i.e. 5*3)", 
                "Type 'exit' at any time to return to the main menu");
            calculatorApp();
            break;
        case 3:
            currentApp = 3;
            guessThePhraseData['answer'] = guessThePhraseData.phrasePool[Math.floor(Math.random()*guessThePhraseData.phrasePool.length)];
            console.log(`Answer: ${guessThePhraseData['answer']}`)
            guessThePhraseData['count']=0;
            guessThePhraseData['guessedLetters']="";
            guessThePhraseData['active'] = true;
            guessThePhraseData['guessLetter'] = true;
            guessThePhraseData['userAnswer'] = "";
            guessThePhraseData['userAnswerMap'] = {};
            for(let i=0; i<guessThePhraseData['answer'].length; i++){
                if(guessThePhraseData['answer'][i] == " "){
                    guessThePhraseData['userAnswer']+=(" ");
                    guessThePhraseData['userAnswerMap'][i] = " ";
                }else{
                    guessThePhraseData['userAnswer']+=("*");
                    guessThePhraseData['userAnswerMap'][i] = "*";
                }
            }
            messageQueue.push(
                "Starting Guess the Phrase", 
                "Type 'exit' at any time to return to the main menu",
                "   ",
                "Can you decipher the text?");
            guessThePhraseApp();
            break;
        default:
            displayText(activityPrompt, "Please make a valid selection. Type help to see options again.", 0);
    }
}

const numbersGameApp = (guess="") => {
    if(guess.length>0){
        if(isNaN(guess)){
            displayText(activityPrompt, "Please enter a valid number", 0);
        }else{
            if(guess == numbersGameData['answer']){
                messageQueue.push("You got it! Thank you for playing.");
                backToMain();
            }else{
                if(numbersGameData['count']==2){
                    messageQueue.push(`You lose. The number was ${numbersGameData['answer']}.`);
                    backToMain();
                }else{
                    numbersGameData['count']++;
                    messageQueue.push("Try again.", `You have guessed ${numbersGameData['count']} time(s).`);
                    displayText(activityPrompt, " ", 0);
                }
            }
        }
    }else{
        if(numbersGameData['count']>0){
            displayText(activityPrompt, "Guess a number between 0 and 10", 0);
        }else{
            if(guess.trim().length<1){
                messageQueue.push("Please enter a valid number")
            }
            displayText(activityPrompt, " ", 0);
        }
    }
}

const calculatorApp = (userInput=null) => {
    let overrideOperator = null; // Handle negative numbers
    if(userInput){
        if(userInput.includes('+-')||userInput.includes('--')||userInput.includes('*-')||userInput.includes('/-')){
            overrideOperator = true;
        }
        if(userInput.includes('+')){
            try{
                let num1 = userInput.split('+')[0];
                let num2 = userInput.split('+')[1];
                if(overrideOperator){
                    num1 = userInput.split('+-')[0];
                    num2 = userInput.split('+-')[1]*-1;
                }
                const output = parseInt(num1)+parseInt(num2);
                messageQueue.push(`${num1}+${num2}=${output}`);
            }catch{
                messageQueue.push("Please enter a valid equation (i.e. 9-5)");
            }
        }else if(userInput.includes('*')){
            try{
                let num1 = userInput.split('*')[0];
                let num2 = userInput.split('*')[1];
                if(overrideOperator){
                    num1 = userInput.split('*-')[0];
                    num2 = userInput.split('*-')[1]*-1;
                }
                const output = parseInt(num1)*parseInt(num2);
                messageQueue.push(`${num1}*${num2}=${output}`);
            }catch{
                messageQueue.push("Please enter a valid equation (i.e. 9-5)");
            }
        }else if(userInput.includes('/')){
            try{
                let num1 = userInput.split('/')[0];
                let num2 = userInput.split('/')[1];
                if(overrideOperator){
                    num1 = userInput.split('/-')[0];
                    num2 = userInput.split('/-')[1]*-1;
                }
                if(num1==0||num2==0){
                    messageQueue.push("You cannot divide by 0");
                }else{
                    const output = parseInt(num1)/parseInt(num2);
                    messageQueue.push(`${num1}/${num2}=${output}`);
                }
            }catch{
                messageQueue.push("Please enter a valid equation (i.e. 9-5)");
            }
        }else if(userInput.includes('-')){
            try{
                let num1 = userInput.split('-')[0];
                let num2 = userInput.split('-')[1];
                if(overrideOperator){
                    num1 = userInput.split('--')[0];
                    num2 = userInput.split('--')[1]*-1;
                }
                const output = parseInt(num1)-parseInt(num2);
                messageQueue.push(`${num1}-${num2}=${output}`);
            }catch(e){
                console.log(e)
                messageQueue.push("Please enter a valid equation (i.e. 9-5)");
            }
        }else{
            messageQueue.push("Please enter a valid equation (i.e. 9-5)");
        }
    }
    displayText(activityPrompt, " ", 0);
}

const guessThePhraseApp = (userInput="") => {
    if(userInput.length>0){
        if(guessThePhraseData['guessLetter']){
            if(userInput.length>1){
                messageQueue.push("You can only guess one letter at a time");
            }else if(!userInput.match(regEx)){
                messageQueue.push("You can only guess letters");
            }else{
                // check for space
                guessThePhraseData['userAnswer'] = "";
                guessThePhraseData['count']++;
                guessThePhraseData['guessLetter']=false;

                if(guessThePhraseData['guessedLetters'].length==0){
                    guessThePhraseData['guessedLetters']+=userInput;
                }else{
                    guessThePhraseData['guessedLetters']+=`, ${userInput}`;
                }

                for(let i=0; i<guessThePhraseData['answer'].length; i++){
                    if(guessThePhraseData['answer'][i]==userInput.toLowerCase()){
                        guessThePhraseData['userAnswerMap'][i]=userInput.toLowerCase();
                    }
                }

                for(k in guessThePhraseData['userAnswerMap']){
                    guessThePhraseData['userAnswer']+=guessThePhraseData['userAnswerMap'][k];
                }

                if(guessThePhraseData['userAnswer']==guessThePhraseData['answer']){
                    messageQueue.push("You got it!");
                    messageQueue.push(`The answer was: ${guessThePhraseData['answer']}`);
                    guessThePhraseData['active'] = false;
                    backToMain();
                }
            }
        }else{
            if(userInput.toLowerCase()==guessThePhraseData['answer']){
                messageQueue.push("You got it!");
                messageQueue.push(`The answer was: ${guessThePhraseData['answer']}`);
                guessThePhraseData['active'] = false;
                backToMain();
            }else{
                messageQueue.push("Incorrect guess");
            }
            guessThePhraseData['guessLetter']=true;
        }
    }
    if(guessThePhraseData['active']){
        if(guessThePhraseData['count']>=10 && guessThePhraseData['guessLetter']){
            messageQueue.push("Game over");
            messageQueue.push(`The answer was: ${guessThePhraseData['answer']}`);
            guessThePhraseData['active'] = false;
            backToMain();
            return;
        }
        if(guessThePhraseData['count']>0 && guessThePhraseData['guessLetter']){
            messageQueue.push(`You have guessed ${guessThePhraseData['count']} time(s)`);
        }
        messageQueue.push(" - - - ");
        messageQueue.push(`Phrase: ${guessThePhraseData['userAnswer']}`);
        messageQueue.push(`Guessed Letters: ${guessThePhraseData['guessedLetters']}`);
        messageQueue.push(" - - - ");
        if(guessThePhraseData['guessLetter']){
            messageQueue.push("Guess a letter");
        }else{
            messageQueue.push("Guess the phrase");
        }
        displayText(activityPrompt, " ", 0);
    }
}

const backToMain = _ => {
    currentApp = 0;
    messageQueue.push(
        "-------------------------", 
        "Choose an activity from the list below", 
        "1: Numbers Game", 
        "2: Calculator", 
        "3: Guess the Phrase", 
        "4: Username and Password");
    displayText(activityPrompt, " ", 0);
}