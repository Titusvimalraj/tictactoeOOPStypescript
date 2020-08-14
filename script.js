var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];
var gameOn = true;
var player1;
var player1Marker;
var player2;
var player2Marker;
var playerMarker = "O";
function updateMarkerListener(ele) {
    // console.log("ele playerMarker");
    // console.log(ele, playerMarker);
    document.getElementById(ele).innerHTML = playerMarker;
    board[ele[0]][ele[1]] = playerMarker;
    var old_element = document.getElementById("board");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    var game = new Game();
    if (game.checkDraw(board)) {
        console.log("Draw!");
        document.getElementById("tic-player-turn").innerHTML = "Draw!";
        return;
    }
    if (game.checkWin(board, playerMarker)) {
        console.log((playerMarker == "O" ? player1 : player2) + " wins!");
        document.getElementById("tic-player-turn").innerHTML = (playerMarker == "O" ? player1 : player2) + " wins!";
        return;
    }
    var nextMark = playerMarker == "O" ? "X" : "O";
    // console.log("nextMark", nextMark);
    playerMarker = nextMark;
    var playerTurnMessage = (nextMark === "O" ? player1 : player2) + " your turn!";
    // console.log("Player Marker", nextMark);
    // console.log(`${nextMark === "O" ? player1 : player2} your turn!`);
    document.getElementById("tic-player-turn").innerHTML = playerTurnMessage;
    var newGameBoard = new Board(board);
    // console.log(board);
    newGameBoard.addEventListnerToBoard(board, nextMark);
    return;
}
var startGame = function () {
    player1 = prompt("Player One: Enter Your Name , you will be O");
    player1Marker = "O";
    player2 = prompt("Player Two: Enter Your Name, you will be X");
    player2Marker = "X";
    var playerTurnMessage = (playerMarker === "O" ? player1 : player2) + " your turn!";
    console.log("Player Marker", playerMarker);
    console.log((playerMarker === "O" ? player1 : player2) + " your turn!");
    document.getElementById("tic-player-turn").innerHTML = playerTurnMessage;
    var newGameBoard = new Board(board);
    newGameBoard.addEventListnerToBoard(board, playerMarker);
    newGameBoard.printBoard(board);
};
var Board = /** @class */ (function () {
    function Board(board) {
        this.board = board;
    }
    Board.prototype.printBoard = function (boardValue) {
        this.board = boardValue;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                document.getElementById("" + i + j).innerHTML = this.board[i][j];
            }
        }
    };
    Board.prototype.clearBoard = function () {
        return board;
    };
    Board.prototype.addEventListnerToBoard = function (board, player) {
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                // console.log("the filled value", board[i][j]);
                if (board[i][j] == "") {
                    // console.log("empty element");
                    // console.log(`${i}${j}`);
                    // console.log("player marker during event listener", player);
                    document
                        .getElementById("" + i + j)
                        .addEventListener("click", function () {
                        updateMarkerListener("" + i + j);
                    });
                }
            };
            for (var j = 0; j < 3; j++) {
                _loop_2(j);
            }
        };
        // console.log("adding Event listener");
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        console.log(board);
        return board;
    };
    return Board;
}());
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(marker, board) {
        var _this = _super.call(this, board) || this;
        _this.marker = marker;
        return _this;
    }
    Player.prototype.move = function (board, position) {
        this.marker;
        var x = position.x, y = position.y;
        if (board[x][y] == "") {
            board[x][y] == this.marker;
            return board;
        }
        else {
            this.move(board, position);
            return board;
        }
    };
    return Player;
}(Board));
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.checkWin = function (board, playerMarker) {
        if ((board[0][0] === playerMarker &&
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
                board[2][2] === playerMarker)) {
            return true;
        }
        else {
            return false;
        }
    };
    Game.prototype.checkDraw = function (board) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < 3; j++) {
                if (!(board[i][j] == "")) {
                    continue;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    };
    Game.prototype.resetGame = function () {
        location.reload();
    };
    return Game;
}());
startGame();
