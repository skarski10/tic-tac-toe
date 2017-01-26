// Business logic
var space1 = new Space(1,1);
var space2 = new Space(1,2);
var space3 = new Space(1,3);
var space4 = new Space(2,1);
var space5 = new Space(2,2);
var space6 = new Space(2,3);
var space7 = new Space(3,1);
var space8 = new Space(3,2);
var space9 = new Space(3,3);

function PlayerInfo (userName, userMark) {
  this.playerName = userName;
  this.playerMark = userMark;
}

function Board(space1, space2, space3, space4, space5, space6, space7, space8, space9) {
  this.spaces = [space1, space2, space3, space4, space5, space6, space7, space8, space9];
}

function Space(row, column, userMark) {
  this.rowCoordinance = row;
  this.columnCoordinance = column;
  this.mark = userMark;
}

function Game(player1, player2, board){
  this.player1 = player1;
  this.player2 = player2;
  this.board = board;
}

Board.prototype.searchSpace = function(row, col){
  var boardspaceReturn;
    this.spaces.forEach(function(boardspace){
    if (boardspace.rowCoordinance === row && boardspace.columnCoordinance === col){
      boardspaceReturn = boardspace;
    }
    });
  return boardspaceReturn
}

Space.prototype.markPlayer = function(Player){
  console.log(Player);
  console.log(Player.playerMark);
  this.mark = Player.playerMark;
  console.log(this.mark);
}

function Move(rowValue, colValue, game, index){ //rowV =1 , colVal = 1, game = newGame
  if (index % 2 !== 0){
    Player = game.player1;
  }else{
    Player = game.player2;
  }
  currentSpace = game.board.searchSpace(rowValue, colValue);
  currentSpace.markPlayer(Player);
  return currentSpace;
}

// User logic
$(document).ready(function() {
  $('#user-names').submit(function(event) {
    event.preventDefault();
    var playerOne = $('#player-one').val();
    var playerTwo = $('#player-two').val();
    var user1 = new PlayerInfo(playerOne, "X");
    var user2 = new PlayerInfo(playerTwo, "O");
    var newBoard = new Board(space1, space2, space3, space4, space5, space6, space7, space8, space9);
    var newGame = new Game(user1, user2, newBoard);
    var i = 1;
    $('#placeMark').submit(function(event) {
      event.preventDefault();
      var rowSelected = parseInt($('#row-coordinance').val());//--->1
      var columnSelected = parseInt($('#column-coordinance').val());//--->1
      var userTurn = Move(rowSelected, columnSelected, newGame, i);//Move(1,1,newGame)
      var turnRow = userTurn.rowCoordinance;
      var turnCol = userTurn.columnCoordinance;
      console.log('#' + turnRow + turnCol);
      $('#' + turnRow + turnCol).text(userTurn.mark);
      i += 1;
    });
  });
});
