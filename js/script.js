var output = document.getElementById('output-numbers');
var comment = document.getElementsByClassName('comment')[0];
var score = document.getElementsByClassName('score')[0];
var progress = document.getElementById('progress');
var cpu = document.getElementById('cpu-output');

function numGen() {
    var cpuNum = Math.floor(Math.random()*totalNumbers) + 1;
    if (!cpuNumbers.includes(cpuNum)) {
        cpuNumbers.push(cpuNum)
    }
}

function promptFunct() {
    var userNum = parseInt(prompt('Inserisci un numero minore del max! (' + totalNumbers + ')'));
    if (userNum.length === 0 || isNaN(userNum) || userNum < 1 || userNum > totalNumbers) {
        alert('Invalid value!')
    } else if (userNumbers.includes(userNum)) {
        alert('You already picked that number!');
    }
    return userNum;
}

var totalNumbers = 60;
var maxCpuNumbers = 15;

var maxUserNumbers = totalNumbers - maxCpuNumbers;

comment.innerHTML = 'Be careful now! You must insert ' + maxUserNumbers + ' numbers in total!'


var cpuNumbers = [];
var userNumbers = [];
score.innerHTML = '';
output.innerHTML = '';
comment.innerHTML = '';

while (cpuNumbers.length < maxCpuNumbers) {
    numGen();
}

cpuNumbers.sort(function(a, b){return a - b});

loop1:
while (userNumbers.length < maxUserNumbers) {

    do {
        var userNum = promptFunct();
    }
    while(userNum.length === 0 || isNaN(userNum) || userNum < 1 || userNum > totalNumbers || userNumbers.includes(userNum))

    if(cpuNumbers.includes(userNum)) {
        comment.innerHTML = 'Damn. You tripped a mine!'
        cpu.innerHTML = cpuNumbers;
        score.innerHTML = 'Your score: ' + userNumbers.length + '/' + maxUserNumbers;
        break loop1;
    } else {
        userNumbers.push(userNum);
        userNumbers.sort(function(a, b){return a - b});
        output.innerHTML = userNumbers;
    }
    
        progress.style.width = userNumbers.length/maxUserNumbers*100 + '%';
}

if (userNumbers.length === maxUserNumbers) {
    comment.innerHTML = 'You win!! Congratulations!'
    cpu.innerHTML = cpuNumbers;
    score.innerHTML = 'Your score: ' + userNumbers.length + '/' + maxUserNumbers;
}