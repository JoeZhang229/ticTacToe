const Player = (name, mark) => {
    let moves = [];
    let turn = "";
    return { name, mark, moves };
};

let player1 = Player("player1", "X");
let player2 = Player("player2", "O");

const gameBoard = (() => {
    let turn = 0;
    const maxTurns = 9;
    const board = [ "", "", "", "", "", "", "", "", "" ];
    const callBoard = () => board;
    const htmlBoard = document.querySelector(".gameBoard");
    const result = document.querySelector(".result");

    function randStart() {
        // randomly changes player array to sync up turn & player marks
        if (Math.random() > 0.5) {
            return player1;
        } else {
            return player2;
        }
    }

    function playerMarking(player, e) {
        e.target.textContent = player.mark;
        player.moves.push(Number(e.target.id));
    }

    function stateTurn(player) {
        player.turn = true;
        result.textContent = `${player.name}'s turn`;
    }

    const startGame = () => {
        stateTurn(randStart());

        board.forEach((cell, index) => {
            let cells = document.createElement("div");

            cells.className = "gameBoardCell";
            cells.id = `${index}`;
            cells.textContent = board[index];

            cells.addEventListener("click", (e) => {
                // player's turn and marks are alternating with every turn
                
                if (e.target.textContent === "") {

                    if (player1.turn === true) {
                        playerMarking(player1, e);
                        stateTurn(player2);
                        console.log("player 1", player1.turn)
                        player1.turn = false;

                    } else if (player2.turn === true) {
                        playerMarking(player2, e);
                        stateTurn(player1);
                        console.log("player 2", player2.turn)
                        player2.turn = false;
                    }

                    turn++;
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

    const checkIfWinner = (playerMoves) => 
        winCombos.some((subArrays) =>
            subArrays.every((index) => playerMoves.includes(index))
        );
    
    const gameStatus = (player1Moves, player2Moves) => {
        if (checkIfWinner(player1Moves)) {
            return `${player1.name} Wins!`;

        } else if (checkIfWinner(player2Moves)) {
            return `${player2.name} Wins!`;

        } else if (turn == maxTurns) {
            return "It's a Tie!";
        }
    }

    let gameStarted = false;
    
    const startGameButton = () => {
        let playerForm = document.querySelector("form");
        let startButton = document.querySelector(".start");

        startButton.addEventListener("click", (e) => {
            if ((playerForm[0].value && playerForm[1].value) && !gameStarted) {

                player1.name = playerForm[0].value
                player2.name = playerForm[1].value
                startGame();
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
        turn = 0;
        stateTurn(randStart());
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

    return { board, callBoard, gameStatus, startGame, startGameButton, resetGame, restartButton }
})();