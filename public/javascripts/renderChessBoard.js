
function renderChessBoard(pov) {
  //pov =white-> A8 is on top-left, H1: right-bottom
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1']
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  //pov = black -> H1 is on top-left; A8 : right-bottom
  if (pov == 'black') {
    rows.reverse()
    cols.reverse()
  }

  let chessBoard = `<table class='chess-board'>`

  //for/in - loops through the properties of an object
  //for/of - loops through the values of an iterable object
  for (let row of rows) {
    chessBoard += `<tr>`
    for (let col of cols) {
      // row is fix and go through col by col
      chessBoard += `<td id=${col}${row}>${col}${row}</td>`
    }
    chessBoard += `</tr>` // close a tr block
  }
  chessBoard += `</table>` // close tag table
  return chessBoard
}




//need to module in order use require in express nodejs
module.exports = {renderChessBoard}
