const Player = (name, mark) => {
    let moves = [];
    return { name, mark, moves };
};

const player1 = Player("Player1", "X");
const player2 = Player("Player2", "O");

const gameBoard = (() => {
    let turn = 0;
    const board = [ "", "", "", "", "", "", "", "", "" ];
    const callBoard = () => board;
    const htmlBoard = document.querySelector(".gameBoard");
    const marks = [player1.mark, player2.mark];
    const players = [player1, player2]
    const result = document.querySelector(".result");
    
    const gameStart = () => {
        board.forEach((cell, index) => {
            let cells = document.createElement("div")
            cells.className = "gameBoardCell"
            cells.id = `${index}`
            cells.textContent = board[index]
            cells.addEventListener("click", (e) => {
                if (e.target.textContent === "") {
                    e.target.textContent = marks[turn % 2];
                    players[turn % 2].moves.push(Number(e.target.id));
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
    gameStart();
 
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


    const resetGame = () => {
        const allCells = document.querySelectorAll(".gameBoardCell");
        allCells.forEach(cell => cell.textContent = "")
        player1.moves = [];
        player2.moves = [];
        turn = 0;
    }

    const restart = () => {
        let restartButton = document.querySelector(".restart");
        restartButton.addEventListener("click", function() {
            result.textContent = "";
            htmlBoard.style.display = "grid";
            resetGame();
        });
    }
    restart();

    return { board, callBoard, gameStatus, gameStart, resetGame, restart }
})();