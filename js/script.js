var output = document.getElementById('output-numbers');
var comment = document.getElementsByClassName('comment')[0];
var score = document.getElementsByClassName('score')[0];
var progress = document.getElementById('progress');
var cpu = document.getElementById('cpu-output');
var difficulty = document.getElementsByClassName('difficulty');

function mineGame() {  // All this just to bind it to a button...

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

    for (i = 0; i < difficulty.length; i++) {
        if (difficulty[i].checked) {
            var totalNumbers = difficulty[i].value.split('; ')[0];
            var maxCpuNumbers = difficulty[i].value.split('; ')[1];
            var flag = true;
        } 
    } // .split removes the ';' in the radio value, resulting in an array.   

    var maxUserNumbers = totalNumbers - maxCpuNumbers;

    comment.innerHTML = 'Be careful now! You must insert ' + maxUserNumbers + ' numbers in total!'


    var cpuNumbers = [];
    var userNumbers = [];
    progress.style.width = 0;
    progress.style.backgroundColor = 'green'
    score.innerHTML = '';
    output.innerHTML = '';
    comment.innerHTML = '';

    while (cpuNumbers.length < maxCpuNumbers) {
        numGen();
    }

    cpuNumbers.sort(function(a, b){return a - b});
    console.log(cpuNumbers);

    loop1:
    while (userNumbers.length < maxUserNumbers) {

        do {
            var userNum = promptFunct();
        }
        while(userNum.length === 0 || isNaN(userNum) || userNum < 1 || userNum > totalNumbers || userNumbers.includes(userNum))

        if(cpuNumbers.includes(userNum)) {
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

    if (!flag) {
        comment.innerHTML = 'You should pick a difficulty before playing!';
    } else if (userNumbers.length < 5) {
        comment.innerHTML = 'Damn. You tripped a mine so early!';
    } else if (userNumbers.length >= 5 && userNumbers.length < 20) {
        comment.innerHTML = "Oof. That wasn't too bad!";
    } else if (userNumbers.length >= 20 && userNumbers.length < maxUserNumbers) {
        comment.innerHTML = "Now we're getting somewhere! Keep it up!";
    } else if (userNumbers.length === maxUserNumbers) {
        progress.style.backgroundColor = 'yellow';
        progress.style.transition = 'width 1s ease-in-out, background-color 0s linear 1.2s';
        comment.innerHTML = 'You win!! Congratulations!'
        cpu.innerHTML = cpuNumbers;
        score.innerHTML = 'Your score: ' + userNumbers.length + '/' + maxUserNumbers;
    }
}