type markerType = 'X' | 'O' | '';

type boardType = markerType[][];
type positionCoordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ;

interface coordinates {
    'x':positionCoordinates,
    'y':positionCoordinates;
}

const board:markerType[][] = new Array(3).fill('').map(() => new Array(3).fill(''));
let gameOn:boolean=true;
class Board{    
    board:boardType;
    constructor(board:boardType){
        this.board = board;
    }

    printBoard(boardValue:Board){
        console.log(boardValue);
    }
}

class Player extends Board{
    marker:markerType;

    constructor(marker:markerType, board:boardType){
        super(board);
        this.marker = marker;
    }

    move(board:Board, position:coordinates):Board{    
        this.marker;
        let {x,y} = position;
        if(board[x][y]==''){
            board[x][y] == this.marker;
            return board;
        }else{
            this.move(board,position);
            return board;
        }      
    
    }
}

class Game{
    
    constructor(){

    }

    checkWin(board:boardType, playerMarker:markerType):boolean{
        if(
            board[0][0]===playerMarker && board[0][1]===playerMarker && board[0][2]===playerMarker ||
            board[1][0]===playerMarker && board[1][1]===playerMarker && board[1][2]===playerMarker ||
            board[2][0]===playerMarker && board[2][1]===playerMarker && board[2][2]===playerMarker ||
            board[0][0]===playerMarker && board[1][1]===playerMarker && board[2][2]===playerMarker ||
            board[0][0]===playerMarker && board[1][1]===playerMarker && board[2][2]===playerMarker ||
            board[0][2]===playerMarker && board[1][1]===playerMarker && board[2][0]===playerMarker ||
            board[0][0]===playerMarker && board[1][0]===playerMarker && board[2][0]===playerMarker ||
            board[0][1]===playerMarker && board[1][1]===playerMarker && board[2][1]===playerMarker ||
            board[0][2]===playerMarker && board[1][2]===playerMarker && board[2][2]===playerMarker
        ){

            return true;

        }else{

            return false;

        }


    }
}

let newGameBoard = new Board(board);

console.log(newGameBoard);
// while(gameOn){


// }