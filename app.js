const winningCombinations = {
    /** Horizontal wins */
    0 : [0, 1, 2],
    1 : [3, 4, 5],
    2 : [6, 7, 8],
    /** Vertical wins */
    3 : [0, 3, 6],
    4 : [1, 4, 7],
    5 : [2, 5, 8],
    /** Diagonal wins */
    6 : [0, 4, 8],
    7 : [2, 4, 6]
}
let currentPlayer = "O";
let nextPlayer = "O";
let turn = 1;
let currentPlayerIndicator = document.getElementById("current-player-indicator");
currentPlayerIndicator.innerHTML = "Next Player: <strong class=\"sign-color-"+nextPlayer+"\">" + nextPlayer + "</strong>";

function populateCell(e) {
    currentPlayer = turn % 2 == 0 ? "X" : "O";
    
    let el = e.target;
    el.removeAttribute("onclick");
    el.innerText = currentPlayer;
    el.setAttribute("played-by", currentPlayer);

    if (checkWinConditions(currentPlayer)) {
        currentPlayerIndicator.innerHTML = "Congratulations!";
        document.getElementsByTagName("h1")[0].innerHTML = "<strong class=\"sign-color-"+currentPlayer+"\">Player " + currentPlayer + "</strong> wins!";
        let cells = document.getElementsByClassName("cell");
        for (let index = 0; index < cells.length; index++) {
            let el = cells[index];
            if (el.hasAttribute("onclick")) { el.removeAttribute("onclick");}
        }
        var audio = new Audio("assets/win.wav");
        audio.play();   
        setTimeout(restart, 3000);
    } else if (checkDrawConditions()) {
        currentPlayerIndicator.innerHTML = "Try again!";
        document.getElementsByTagName("h1")[0].innerHTML = "It's a draw...";
        let cells = document.getElementsByClassName("cell");
        for (let index = 0; index < cells.length; index++) {
            let el = cells[index];
            if (el.hasAttribute("onclick")) { el.removeAttribute("onclick");}
        }
        var audio = new Audio("assets/draw.wav");
        audio.play();   
        setTimeout(restart, 3000);
    } else {
        nextPlayer = turn % 2 == 0 ? "O" : "X";
        currentPlayerIndicator.innerHTML = "Next Player: <strong class=\"sign-color-"+nextPlayer+"\">" + nextPlayer + "</strong>";  
    }

    turn++;
}

function checkWinConditions(signToCheck) {
    let playedPositions = [];
    let playedCells = document.querySelectorAll('[played-by="'+signToCheck+'"]');
    playedCells.forEach(
        function(playedCell) {
            playedPositions.push(playedCell.getAttribute("position"));
        }
    );
    playedPositions = playedPositions.map((i) => Number(i)); // Convert array string to numbers

    for (const combination in winningCombinations) {
        // Comparing two arrays for Victory Condition
        if (playedPositions.length >= 3 && winningCombinations[combination].every(position => playedPositions.includes(position))) { return true;};
    };
    return false;
};

function checkDrawConditions() {
    let playedCells = document.querySelectorAll('[played-by]');
    if (playedCells.length == 9) {
        return true;
    }
}

let restart = function restartGame() {
    document.getElementsByTagName("h1")[0].innerText = "TIC-TAC-TOE";
    currentPlayer = "O";
    nextPlayer = "O";
    turn = 1;
    currentPlayerIndicator.innerHTML = "Next Player: <strong class=\"sign-color-"+nextPlayer+"\">" + nextPlayer + "</strong>";
    let cells = document.getElementsByClassName("cell");
    for (let index = 0; index < cells.length; index++) {
        let el = cells[index];
        el.innerText = "";
        el.setAttribute("onclick", "populateCell(event)");
        el.removeAttribute("played-by");
    }
}