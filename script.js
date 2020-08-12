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
var board = new Array(3).fill('').map(function () { return new Array(3).fill(''); });
var gameOn = true;
var Board = /** @class */ (function () {
    function Board(board) {
        this.board = board;
    }
    Board.prototype.printBoard = function (boardValue) {
        console.log(boardValue);
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
        if (board[x][y] == '') {
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
        if (board[0][0] === playerMarker && board[0][1] === playerMarker && board[0][2] === playerMarker ||
            board[1][0] === playerMarker && board[1][1] === playerMarker && board[1][2] === playerMarker ||
            board[2][0] === playerMarker && board[2][1] === playerMarker && board[2][2] === playerMarker ||
            board[0][0] === playerMarker && board[1][1] === playerMarker && board[2][2] === playerMarker ||
            board[0][0] === playerMarker && board[1][1] === playerMarker && board[2][2] === playerMarker ||
            board[0][2] === playerMarker && board[1][1] === playerMarker && board[2][0] === playerMarker ||
            board[0][0] === playerMarker && board[1][0] === playerMarker && board[2][0] === playerMarker ||
            board[0][1] === playerMarker && board[1][1] === playerMarker && board[2][1] === playerMarker ||
            board[0][2] === playerMarker && board[1][2] === playerMarker && board[2][2] === playerMarker) {
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
var newGameBoard = new Board(board);
console.log(newGameBoard);
// while(gameOn){
// }
