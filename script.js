let area = document.getElementById('area');
let cells = document.getElementsByClassName('cell');
let winner = document.getElementById('winner');
let currentPlayer = document.getElementById('currentPlayer');
let gameHistory = [];
let player1 = 'X';
let player2 = 'O';

let stat = {
    'X': 0,
    'O': 0,
    'D': 0
};

let winCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

for(let i = 1; i <= 9; i++){
    area.innerHTML += `
        <div class='cell' pos=${i}></div>
    `
};

for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', onClick)
};

function onClick() {
    if(!this.innerHTML){
        this.innerHTML = player1
    } else {
        return console.log('ячейка занята');
    }

    let data = [];
    let data2 = [];

    for(let i of cells){
        if(i.innerHTML === player1){
            data.push(parseInt(i.getAttribute('pos')));
        } else if(i.innerHTML === player2){
            data2.push(parseInt(i.getAttribute('pos')));
        };
    };

    player1 = player1 === 'X' ? 'O' : 'X';
    currentPlayer.innerText = player1 === 'X' ? 'X' : 'O';

    let foundArr = winCombination.find(e => {
        return e.every((value, index) => {
            return data.includes(value)
        });
    });
    let foundArr2 = winCombination.find(e => {
        return e.every((value, index) => {
            return data2.includes(value)
        });
    });


    let time = `${new Date().getHours()}:${new Date().getMinutes()}`

    if (foundArr) {
        if(player1 === 'X'){
            stat['O']++;
            document.getElementById('sO').innerText = stat['O'];
            cells.innerHTML = ' ';
            winner.innerText = 'выиграл игрок O';
            gameHistory.push({
                winner: 'Выиграл O',
                time: time
            });
        }else if (player1 === 'O') {
            stat['X']++;
            document.getElementById('sX').innerText = stat['X'];
            winner.innerText = 'выиграл игрок X';
            gameHistory.push({
                winner: 'Выиграл X',
                time: time
            });
        }
        for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = '';
        }
        document.querySelector('.gameHistory').innerHTML = '';
        gameHistory.map(e => {
            document.querySelector('.gameHistory').innerHTML += `
                <ul>
                    <li>${e.winner}</li>
                    <li>${e.time}</li>
                </ul>
            `
        })
    }else if(foundArr2) {
        if(player2 === 'O'){
            stat['X']++;
            document.getElementById('sX').innerText = stat['X'];
            winner.innerText = 'выиграл игрок X';
            gameHistory.push({
                winner: 'Выиграл X',
                time: time
            });
        }else if (player1 === 'O') {
            stat['X']++;
            document.getElementById('sX').innerText = stat['X'];
            winner.innerText = 'выиграл игрок X';
            gameHistory.push({
                winner: 'Выиграл X',
                time: time
            });
        }
        for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = '';
        }
        document.querySelector('.gameHistory').innerHTML = '';
        gameHistory.map(e => {
            document.querySelector('.gameHistory').innerHTML += `
                <ul>
                    <li>${e.winner}</li>
                    <li>${e.time}</li>
                </ul>
            `
        })
    }else if (Array.from(cells).every(e => e.innerHTML !== '')) {
        stat['D']++;
        document.getElementById('sD').innerText = stat['D'];
        winner.innerText = 'Ничья';
        gameHistory.push({
            winner: 'Ничья',
            time: time
        });
        for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = '';
        }
        document.querySelector('.gameHistory').innerHTML = '';
        gameHistory.map(e => {
            document.querySelector('.gameHistory').innerHTML += `
                <ul>
                    <li>${e.winner}</li>
                    <li>${e.time}</li>
                </ul>
            `
        })
    }
};