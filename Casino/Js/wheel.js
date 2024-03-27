let redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
let blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
let luckyZero = [0];




let choiceMem = [];
let prevWin = [];
let wins = 0;
let balance = 400;
let attempt = 0;




let attemptDiv = document.getElementById('attempts');
let balanceDiv = document.getElementById('balance');
let numberAttempt = document.getElementById('amount-of-wins');
window.addEventListener('load', () => {
    updateWin();
    attemptDiv.textContent = attempt + 1;
    balanceDiv.textContent = balance + "$";
    numberAttempt.textContent = wins;
})

if (localStorage.getItem('choices') !== null) {
    choiceMem = JSON.parse(localStorage.getItem('choices'));
    if (!Array.isArray(choiceMem)) {
        choiceMem = [];
    }
}
if (localStorage.getItem('wins') !== null) {
    prevWin = JSON.parse(localStorage.getItem('wins'));

    if (!Array.isArray(prevWin)) {
        prevWin = []; 
    }
}

if (localStorage.getItem('balance') !== null) {
    balance = parseFloat(localStorage.getItem('balance'));
}
if (localStorage.getItem('attempts') !== null) {
    attempt = parseInt(localStorage.getItem('attempts'));
}
if (localStorage.getItem('wins') !== null) {
    wins = parseInt(localStorage.getItem('wins'))
}

 


let currentChoice;




//Input Checker//
red='Red';
black = 'Black';
green = 'Green';



let betInput = document.getElementById('bet-input')
let colorInput;
function setColor (color) {
    let drop = document.querySelector('.dropbtn');
    drop.textContent = color.toString();
    colorInput = color.toString().toLowerCase();    
    drop.style.backgroundColor = colorInput;
    if (colorInput=='black') {
        drop.style.border = 'solid .8px gold'
    }
    else {
        drop.style.border = 'none'
    }
}
let numInput = document.getElementById('bet-num') 



function checkInputs() {
    let bet = betInput.value;
    let num = numInput.value;    
    let colour = colorInput;
    let x = true;   


    if (colorInput!='green' && colorInput!='red' && colorInput!='black') {
        console.log('fuck you')
        x=false;
        return x;
    }      
    if (bet<=0 || bet>balance || bet.toString().includes('.')) {
        console.log('Enter valid amount');
        x = false;
        return x;
    }    
    if (num>37 || num<0)
    {
        console.log('Enter valid number')
        x = false;
        return x;
    }    

    if (x=true) {
        setTimeout(() => {
            betInput.value = "";           
        }, 100); 
        let choice  = new userChoice(bet, colour, num);
        choiceMem.push(choice);
        currentChoice = choice;        
        attempt++;
        attemptDiv.textContent = attempt + 1;             
        return true;
    }
           
}
//Input Checker//



//choices//
class userChoice {    
    constructor(betChoice, colorChoise, numberChoice){
        this.betChoice = betChoice;
        this.colorChoise = colorChoise;
        this.numberChoice = numberChoice;
    }
}
class Winner {
    constructor(arrayChoice, numChoice) {
        this.arrayChoice = arrayChoice;
        this.numChoice = numChoice;
    }
}
//choices//



let numberElement = document.querySelector('.p-number');
let spin = document.getElementById('spin-wheel');
let numberDiv = document.getElementById('number');
let wheelDiv = document.querySelector('.wheel');
let winarray;
let winnumber;

window.addEventListener('unload', reset());


function reset () {
numberElement.textContent = 'Click';
numberDiv.style.background='linear-gradient(to right, silver 0%, gold 100%)';
numberDiv.style.color= '#d4af37';
numberDiv.style.border = 'solid 1.3px #d4af37'
numberDiv.style.borderRadius = '50%';
numberDiv.style.animation = "colorChange 5s infinite alternate";
}


wheelDiv.addEventListener('click', () => SpinWheel(spin, (randomArray, randomIndex) => {     
    setTimeout(() => {
        WinAnim(randomArray, randomArray[randomIndex]);   
    }, 100);        
     
}));

spin.addEventListener('click', () => SpinWheel(spin, (randomArray, randomIndex) => { 
    winarray=randomArray;
    winnumber=randomIndex;
    setTimeout(() => {
        WinAnim(randomArray, randomArray[randomIndex]);   
    }, 100);        
     
}));

function SpinWheel(button, onSpinEnd) { 
    if (checkInputs()==true) {
    betInput.disabled = true;   
    button.disabled = true;   
    button.style.cursor = 'normal'    
    let i = 0;
    let interval = setInterval(() => {  
        let randomArray = getRandomArray();
        let randomIndex = Math.floor(Math.random() * randomArray.length);         
        OutPutEffect(randomArray, randomArray[randomIndex]);
        i++;
        if (i >= redNumbers.length + blackNumbers.length + luckyZero.length) {
            clearInterval(interval);
            betInput.disabled = false; 
            button.disabled = false;            
            button.style.cursor = 'pointer'; 
            if (typeof onSpinEnd === 'function') {
                onSpinEnd(randomArray, randomIndex);
            }
        }
    }, 200);    
}
}

function OutPutEffect(randomArray, number) { 
    numberDiv.style.animation='none';
    if (randomArray === redNumbers) {        
        numberDiv.style.background= 'red';
        numberDiv.style.color='black';
        numberDiv.style.border = 'solid 1.3px black';
    }  
    else if (randomArray === blackNumbers) {
        numberDiv.style.background = 'black';
        numberDiv.style.color='red';
        numberDiv.style.border = 'solid 1.3px red';
    }  
    else {
        numberDiv.style.background = 'green';
        numberDiv.style.color='yellow';
        numberDiv.style.border = 'solid 1.3px yellow';
    }
    numberDiv.style.borderRadius='50%';

    numberElement.textContent = number;    
}

function getRandomArray() {
    let x = Math.random();
    if (x < 18/37) {
        return redNumbers;        
    }
    else if (x >=18/37 && x <=36/37) {
        return blackNumbers;        
    }
    else {
        return luckyZero;
    }
}

function WinAnim(randomArray, number) {   
         
    let i = 0;     
    let Wininterval = setInterval(() => { 
        setTimeout(() => {
            OutPutEffect(randomArray, number)           
            numberElement.textContent = 'Winner: \n' +number;       
        i++;
        }, 300); 
        numberDiv.style.color= '#c0c0c0';
        numberDiv.style.backgroundColor='#d4af37';
        numberDiv.style.border = 'none';    
        if (i >= 5) {
            setTimeout(() => {
                clearInterval(Wininterval);   
            reset();     
            }, 800);
                          
        }
    }, 500); 
    checkWin(randomArray, number, currentChoice);
    
}

function checkWin(winarray, winnumber, userChoice) {
    let checkcolor = userChoice.colorChoise;
    let checknum = userChoice.numberChoice;
    let win = false;
    if (checknum=='') {
        checknum = winnumber;
    }
    if (checkcolor == 'red') {
        if (winarray=redNumbers && winnumber==checknum) {
            balance+=userChoice.betChoice*2;
            win=true;
        }
    } 
    else if (checkcolor == 'black') {
        if (winarray=blackNumbers && winnumber==checknum) {
            balance+=userChoice.betChoice*2;     
            win=true;    
        }
    } 
    else if (checkcolor == 'green') {
        if (winarray=luckyZero && winnumber==checknum) {
            balance+=userChoice.betChoice*100;
            win=true;
        }
        }
    if (win==true) {
        let winner = new Winner(checkcolor, checknum)
        wins++;
        numberAttempt.textContent = wins;
        prevWin.push(winner);      
        updateWin();  
    }
    else {
        balance-=userChoice.betChoice
    }
    balanceDiv.textContent = balance + "$";
}
window.addEventListener('unload', () => {
    localStorage.setItem('choices', JSON.stringify(choiceMem));
    localStorage.setItem('wins', JSON.stringify(prevWin));
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('attempts', attempt.toString());
    localStorage.setItem('wins', wins.toString())
});


