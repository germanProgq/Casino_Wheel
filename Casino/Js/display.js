
let prev = document.querySelector('.prev-wins');
let numOfPrev = document.querySelector('.amount-of-wins');

function updateWin() {
    let i = 0;
    prevWin.forEach(win => {
    i++      
    prev.innerHTML += '<p id="win">' + win.numChoice + ' ' + win.arrayChoice+ '</p>'
    let winDiv = document.getElementById('win');
    if (winDiv.arrayChoice=='green') {
    winDiv.style.color = 'gold';
    }
    if (winDiv.arrayChoice == 'black') {
        winDiv.style.color = '#fff';
    }
    else  {
     winDiv.style.color = win.arrayChoice;
    }
    winDiv.style.borderBottom = "solid .3px "+ win.arrayChoice;
    winDiv.style.padding = ' 4px 10px'
    winDiv.style.borderRadius = '10px'
});
}
function resetAll() {
    attempt= 0;
    balance=400;
    wins=0;
    choiceMem = [];
    prevWin = [];
    attemptDiv.textContent = attempt + 1;
    balanceDiv.textContent = balance + "$";
    numberAttempt.textContent = wins;
    updateWin();
}
