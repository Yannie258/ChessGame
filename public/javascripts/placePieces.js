//Enum Using Objects
const encodeFen = {
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  p: '♟',

  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  P: '♙',
}
function placePieces(fen) {
  const boardSize = 8
  //pov =white-> A8 is on top-left, H1: right-bottom
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1']
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  //split fen for row
  const fenRow = fen.split('/')
  console.log(fenRow)

  //let chessBoard = `<table class='chess-board'>`

  for (let i = 0; i < boardSize; i++) {
    const singleRow = fenRow[i]
    //console.log('singleRow:', singleRow)
    //rotate the board when change pov
    let rowIndex = boardSize - i
    //cut fenRow to get single pieces
    const singleCellPure = singleRow.split('')
    //change digit to space string
    let singleCell = emptyCell(singleRow)

    for (let j = 0; j < boardSize; j++) {
      const cell = singleCell[j]
      const singleCellt = singleCell[j]
      let piece = cell.match(/[prnbqkPRNBQK]/) ? getSinglePiece(cell) : ''
      const setPieces = document.getElementById(`${cols[j]}${rowIndex}`)
      setPieces.innerHTML = piece
    }
  }

  // listen click event in whole table
  // important when we move to the possible position later on
  const chessBoard = document.querySelectorAll('.chess-board')

  // Variable to keep track of the currently clicked cell
  let currentClickedCell = null
  chessBoard.forEach((cell) => {
    handleCellClick(cell, currentClickedCell, fen)
    
  })
}

//expand amount of consecate empty cells based on number
// repeat space for num times
function emptyCell(cell) {
  return cell.replace(/\d/g, (digit) => ' '.repeat(digit)).split('')
}

function getSinglePiece(char) {
  return char !== ''
    ? `<span class="chess-piece">${encodeFen[char]}</span>`
    : ''
}

function handleCellClick(cell, currentClickedCell, fen) {
  cell.addEventListener('click', async (event) => {
    const clickedCell = event.target.closest('td')
    

    if (currentClickedCell) {
      // Remove styling from the previously clicked cell
      removeHighlight(currentClickedCell)
      removePossibleHighlight()

    }

    // Check if the clickedCell is not null
    if (clickedCell) {
      const pos = clickedCell.querySelector('span')

      if (pos) {
        // Code for handling clicks on pos
        //console.log('Click on piece', pos)
        const cellId = clickedCell.getAttribute('id')
        console.log('from', cellId)
        addHighlight(clickedCell)

        const response = await fetch('/chessboard/possibleMoves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fen: fen, pos: cellId }),
        })
        const data = await response.json() // Assuming the response is in JSON format
        // response from server:
        // {
        //   "possible_moves": [
        // {
        //     "board_before_move": {
        //         "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        //     },
        const highLightArr = data.possible_moves.map((move) => move.to)
        console.log('possible move', highLightArr)
        for (let i = 0; i < highLightArr.length; i++) {
          console.log('arr', highLightArr[i])
          addPossibleHighLight(document.getElementById(highLightArr[i]))
        }
        
        //Assuming the response contains an array of possible moves
        //const possibleMoves = data.possible_moves
        // console.log('possible move', possibleMoves)

      } else {
        // Code for handling clicks on empty cells
        console.log('Click on empty cell', clickedCell)
        
      }
  
      // Update the currently clicked cell and high light cell
      currentClickedCell = clickedCell
    }
  })
}

// Function to add highlighting to the cell
function addHighlight(cell) {
 console.log('cell', cell)
  cell.classList.add('highlight-overlay')
}

// Function to remove highlighting from the cell
function removeHighlight(cell) {
  cell.classList.remove('highlight-overlay')
}

function addPossibleHighLight(cell) {
  cell.classList.add('highlight-overlay-move')
}

function removePossibleHighlight() {
  //cell.classList.remove('highlight-overlay-move')
  document.querySelectorAll('.highlight-overlay-move').forEach((cell) => {
    cell.classList.remove('highlight-overlay-move')
  })
}

async function sendRequestGetPossibleMoves(fen,cellId){
  // Make a POST request to the server when a piece is clicked
        const response = await fetch('/chessboard/possibleMoves', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({fen: fen, pos: cellId})
        })
        const data = await response.json() // Assuming the response is in JSON format
        // response from server: 
        // {
        //   "possible_moves": [
        // {
        //     "board_before_move": {
        //         "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        //     },
        //console.log("response from server: ", data )
        const highLightArr = data.possible_moves.map((move) => move.to)
        console.log('possible move', highLightArr)
        for (let i = 0; i < highLightArr.length; i++){
          console.log('arr', highLightArr[i])
          addPossibleHighLight(document.getElementById(highLightArr[i]))
        }
        

}