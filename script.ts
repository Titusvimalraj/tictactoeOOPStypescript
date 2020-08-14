type markerType = "X" | "O" | "";

type boardType = markerType[][];
type positionCoordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface coordinates {
  x: number;
  y: number;
}

const board: markerType[][] = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let gameOn: boolean = true;

let player1: string;
let player1Marker: string;
let player2: string;
let player2Marker: string;
let playerMarker: markerType = "O";
function updateMarkerListener(ele: string): string {
  // console.log("ele playerMarker");
  // console.log(ele, playerMarker);
  document.getElementById(ele).innerHTML = playerMarker;
  board[ele[0]][ele[1]] = playerMarker;  
  let old_element = document.getElementById("board");
  let new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
  let game = new Game();
  if (game.checkDraw(board)) {
    console.log(`Draw!`);
    document.getElementById("tic-player-turn").innerHTML = "Draw!";
    return;
  }
  if (game.checkWin(board, playerMarker)) {
    
    console.log(`${playerMarker == "O" ? player1 : player2} wins!`);
    document.getElementById("tic-player-turn").innerHTML = `${playerMarker == "O" ? player1 : player2} wins!`;
    return;
  }
  let nextMark: markerType = playerMarker == "O" ? "X" : "O";
  // console.log("nextMark", nextMark);
  playerMarker = nextMark;

  let playerTurnMessage: string = `${
    nextMark === "O" ? player1 : player2
  } your turn!`;
  // console.log("Player Marker", nextMark);
  // console.log(`${nextMark === "O" ? player1 : player2} your turn!`);
  document.getElementById("tic-player-turn").innerHTML = playerTurnMessage;

  let newGameBoard = new Board(board);
  // console.log(board);
  newGameBoard.addEventListnerToBoard(board, nextMark);

  return;
}

let startGame = () => {
  player1 = prompt("Player One: Enter Your Name , you will be O");
  player1Marker = "O";

  player2 = prompt("Player Two: Enter Your Name, you will be X");
  player2Marker = "X";

  let playerTurnMessage: string = `${
    playerMarker === "O" ? player1 : player2
  } your turn!`;
  console.log("Player Marker", playerMarker);
  console.log(`${playerMarker === "O" ? player1 : player2} your turn!`);
  document.getElementById("tic-player-turn").innerHTML = playerTurnMessage;

  let newGameBoard = new Board(board);
  newGameBoard.addEventListnerToBoard(board, playerMarker);
  newGameBoard.printBoard(board);
};

class Board {
  board: boardType;
  constructor(board: boardType) {
    this.board = board;
  }

  printBoard(boardValue: boardType) {
    this.board = boardValue;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(`${i}${j}`).innerHTML = this.board[i][j];
      }
    }
  }

  clearBoard(): boardType {
    return board;
  }

  addEventListnerToBoard(board: boardType, player: markerType): boardType {
    // console.log("adding Event listener");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // console.log("the filled value", board[i][j]);
        if (board[i][j] == "") {
          // console.log("empty element");
          // console.log(`${i}${j}`);
          // console.log("player marker during event listener", player);
          document
            .getElementById(`${i}${j}`)
            .addEventListener("click", function () {
              updateMarkerListener(`${i}${j}`);
            });
        }
      }
    }
    console.log(board);
    return board;
  }
}

class Player extends Board {
  marker: markerType;

  constructor(marker: markerType, board: boardType) {
    super(board);
    this.marker = marker;
  }

  move(board: boardType, position: coordinates): boardType {
    this.marker;
    let { x, y } = position;
    if (board[x][y] == "") {
      board[x][y] == this.marker;
      return board;
    } else {
      this.move(board, position);
      return board;
    }
  }
}

class Game {
  constructor() {}

  checkWin(board: boardType, playerMarker: markerType): boolean {
    if (
      (board[0][0] === playerMarker &&
        board[0][1] === playerMarker &&
        board[0][2] === playerMarker) ||
      (board[1][0] === playerMarker &&
        board[1][1] === playerMarker &&
        board[1][2] === playerMarker) ||
      (board[2][0] === playerMarker &&
        board[2][1] === playerMarker &&
        board[2][2] === playerMarker) ||
      (board[0][0] === playerMarker &&
        board[1][1] === playerMarker &&
        board[2][2] === playerMarker) ||
      (board[0][0] === playerMarker &&
        board[1][1] === playerMarker &&
        board[2][2] === playerMarker) ||
      (board[0][2] === playerMarker &&
        board[1][1] === playerMarker &&
        board[2][0] === playerMarker) ||
      (board[0][0] === playerMarker &&
        board[1][0] === playerMarker &&
        board[2][0] === playerMarker) ||
      (board[0][1] === playerMarker &&
        board[1][1] === playerMarker &&
        board[2][1] === playerMarker) ||
      (board[0][2] === playerMarker &&
        board[1][2] === playerMarker &&
        board[2][2] === playerMarker)
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkDraw(board: boardType): boolean {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (!(board[i][j] == "")) {
          continue;
        } else {
          return false;
        }
      }
    }

    return true;
  }
  resetGame(): void {
    location.reload();
  }
}

startGame();
