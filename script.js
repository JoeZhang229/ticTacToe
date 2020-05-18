const Player = (name, mark) => {
    let moves = [];
    return { name, mark, moves };
};

let player1 = Player("player1", "X");
let player2 = Player("player2", "O");

const gameBoard = (() => {
    let turn = 0;
    const board = [ "", "", "", "", "", "", "", "", "" ];
    const callBoard = () => board;
    const htmlBoard = document.querySelector(".gameBoard");
    let players = [];
    const result = document.querySelector(".result");

    function randStart() {
        // randomly changes player array to sync up turn & player marks
        if (Math.random() > 0.5) {
            players.push(player1)
            players.push(player2)
            return player1
        } else {
            players.push(player2)
            players.push(player1)
            return player2
        }
    }

    function playerActions(player, e) {
        e.target.textContent = player.mark;
        player.moves.push(Number(e.target.id));
    }
    
    const gameStart = () => {
        randStart();
        result.textContent = `${players[0].name}'s turn`;
        board.forEach((cell, index) => {
            let cells = document.createElement("div")
            cells.className = "gameBoardCell"
            cells.id = `${index}`
            cells.textContent = board[index]
            cells.addEventListener("click", (e) => {
                // player's turn and marks are alternating with every turn
                if (e.target.textContent === "") {
                    let nextPlayer = players[turn % 2]
                    if (turn === 0) {
                        playerActions(players[turn % 2], e);
                    } else {
                        playerActions(players[turn % 2], e);
                    }
                    turn++;
                    result.textContent = `${players[turn % 2].name}'s turn`;
                }
                if (gameStatus(player1.moves, player2.moves)) {
                    result.textContent = gameStatus(player1.moves, player2.moves)
                    htmlBoard.style.display = "none"
                }
            });
            htmlBoard.appendChild(cells)
        })
    }
 
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];
    
    const gameStatus = (player1Moves, player2Moves) => {
        if (winner(player1Moves)) {
            return "Player1 Wins!"
        } else if (winner(player2Moves)) {
            return "Player2 Wins!"
        } else if (turn >= 9){
            return "It's a tie!"
        }
    }

    const winner = (playerMoves) =>
        winCombos.some((combos) =>
        combos.every((allMoves) => playerMoves.includes(allMoves))
        );
    let gameStarted = false;
    const startGameButton = () => {
        let playerForm = document.querySelector("form");
        let startButton = document.querySelector(".start");
        startButton.addEventListener("click", (e) => {
            if ((playerForm[0].value && playerForm[1].value) && !gameStarted) {
                player1.name = playerForm[0].value
                player2.name = playerForm[1].value
                gameStart();
                gameStarted = true;
            }
        });
    }
    startGameButton();

    const resetGame = () => {
        const allCells = document.querySelectorAll(".gameBoardCell");
        allCells.forEach(cell => cell.textContent = "")
        player1.moves = [];
        player2.moves = [];
        players = [];
        turn = 0;
        randStart();
        result.textContent = `${players[0].name}'s turn`;
    }

    const restartButton = () => {
        let restartButton = document.querySelector(".restart");
        restartButton.addEventListener("click", function() {
            result.textContent = "";
            htmlBoard.style.display = "grid";
            resetGame();
        });
    }
    restartButton();

    return { board, callBoard, gameStatus, gameStart, startGameButton, resetGame, restartButton }
})();