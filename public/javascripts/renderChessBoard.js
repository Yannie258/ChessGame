// render chessboard with pieces
// function renderChessBoardWithFenAndPov(fen, pov) {
//   const boardSize = 8
//   //pov =white-> A8 is on top-left, H1: right-bottom
//   const rows = ['8', '7', '6', '5', '4', '3', '2', '1']
//   const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
//   //split fen for row
//   const fenRow = fen.split('/')
//   console.log(fenRow)

//   if (pov == 'black') {
//     cols.reverse()
//     fenRow.reverse()
//   }

//   let chessBoard = `<table class='chess-board'>`

//   for (let i = 0; i < boardSize; i++) {
//     const singleRow = fenRow[i]
//     //console.log('singleRow:', singleRow)
//     chessBoard += `<tr>`
//     //rotate the board when change pov
//     let rowIndex = pov === 'white' ? boardSize - i : i + 1
//     //cut fenRow to get single pieces
//     const singleCellPure = singleRow.split('')
//     //change digit to space string
//     let singleCell = emptyCell(singleRow)

//     for (let j = 0; j < boardSize; j++) {
//       const cell = singleCell[j]
//       const singleCellt = singleCell[j]
//       //check if in every cell contains character or not
//       //when yes, then map to pieces, else do nothing
//       let piece = cell.match(/[prnbqkPRNBQK]/) ? getSinglePiece(cell) : ''
//       //render id / coordination for square
//       chessBoard += `<td id=${cols[j]}${rowIndex}>${piece}</td>`
//     }
//     chessBoard += `</tr>` // close a tr block
//   }
//   chessBoard += `</table>` // close tag table
//   //splitPieces(fen)
//   return chessBoard
// }

// //expand amount of consecate empty cells based on number
// // repeat space for num times
// function emptyCell(cell) {
//    return cell.replace(/\d/g, digit => ' '.repeat(digit)).split('');
// }

// function getSinglePiece(char) {
//   return char !== '' ? `<span class="chess-piece">${encodeFen[char]}</span>` : '';
// }
// //Enum Using Objects
// const encodeFen = {
//   r: '♜',
//   n: '♞',
//   b: '♝',
//   q: '♛',
//   k: '♚',
//   p: '♟',

//   R: '♖',
//   N: '♘',
//   B: '♗',
//   Q: '♕',
//   K: '♔',
//   P: '♙',
// }


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
