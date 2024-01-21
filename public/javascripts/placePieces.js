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
  //console.log('[.chess-board]', chessBoard)
  // Variable to keep track of the currently clicked cell
  let currentClickedCell = null
  chessBoard.forEach((cell) => {
    handleCellClick(cell, currentClickedCell)
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

function handleCellClick(cell, currentClickedCell) {
  cell.addEventListener('click', (event) => {
    const clickedCell = event.target.closest('td')
    console.log('Click on cell', clickedCell)

    if (currentClickedCell) {
      // Remove styling from the previously clicked cell
      removeHighlight(currentClickedCell)
    }

    // Check if the clickedCell is not null
    if (clickedCell) {
      const pos = clickedCell.querySelector('span')

      if (pos) {
        // Code for handling clicks on pos
        console.log('Click on piece', pos)
        addHighlight(clickedCell)
      } else {
        // Code for handling clicks on empty cells
        console.log('Click on empty cell', clickedCell)
        
      }

      // Update the currently clicked cell
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
