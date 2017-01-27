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
var i = 1;

var winConditions = [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[13,23,33],[21,22,23],[31,32,33],[31,22,13]]

function PlayerInfo (userName, userMark, userMove) {
  this.playerName = userName;
  this.playerMark = userMark;
  this.playerMove = userMove;
}

function Board(space1, space2, space3, space4, space5, space6, space7, space8, space9) {
  this.spaces = [space1, space2, space3, space4, space5, space6, space7, space8, space9];
}

function Space(row, column, userMark) {
  this.rowCoordinance = row;
  this.columnCoordinance = column;
  this.mark = userMark;
  this.use = false;
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
  if (!this.use){
  this.mark = Player.playerMark;
  this.use = true;
  }
}

function Move(rowValue, colValue, game){
  if (i % 2 !== 0){
    Player = game.player1;
  }else{
    Player = game.player2;
  }
  currentSpace = game.board.searchSpace(rowValue, colValue);
  if (!currentSpace.use){
  currentSpace.markPlayer(Player);
  Player.playerMove.push(rowValue*10+colValue);
  // if(checkWin(Player.playerMove)){
  //   alert(Player.playerName + ' wins!')
  // }
  i += 1;
  } else {
    alert('Pick a different spot')
  }
    return Player;
  }

function checkWin(playerArray){
  for (var i=0; i<winConditions.length;i++){
    count = 0;
    for (var j=0; j<winConditions[i].length;j++){
      for (var k=0; k<playerArray.length;k++){
        if (playerArray[k] === winConditions[i][j]){
          count+=1;
          if (count === 3){
            return true;
          }
      }
    }
  }
}
}

// User logic
$(document).ready(function() {
  $('#user-names').submit(function(event) {
    event.preventDefault();
    $("#user-names").hide();
    $(".hide-me").show();
    var playerOne = $('#player-one').val();
    var playerTwo = $('#player-two').val();
    var user1 = new PlayerInfo(playerOne, "X", []);
    var user2 = new PlayerInfo(playerTwo, "O", []);
    var newBoard = new Board(space1, space2, space3, space4, space5, space6, space7, space8, space9);
    var newGame = new Game(user1, user2, newBoard);

    $('.col-md-4').click(function(){
      var rowSelected = parseInt($(this).find("span").attr('id').charAt(0));
      var columnSelected = parseInt($(this).find("span").attr('id').charAt(1));
      var userTurn = Move(rowSelected, columnSelected, newGame);
      $('#' + rowSelected + columnSelected).text(userTurn.playerMark);
      if(checkWin(userTurn.playerMove)){
        $("#winner").text(userTurn.playerName + ' wins!');
        $("#winning").show().delay(5000).fadeOut();
      }else{
        if (i===10){
          $("#winner").text("Tie!");
          $("#winning").show().delay(5000).fadeOut();
        }
      }
    });
  });
  $('#reset').click(function() {
    location.reload();
  })
});
