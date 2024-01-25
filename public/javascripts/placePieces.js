import { sendRequestGetPossibleMoves, sendMoveToServerForPlaying } from './helper.js'
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
}

//expand amount of consecate empty cells based on number
// repeat space for num times
function emptyCell(cell) {
  return cell.replace(/\d/g, (digit) => ' '.repeat(digit)).split('')
}

function getSinglePiece(char) {
  return char !== '' ? `<span class="chess-piece">${encodeFen[char]}</span>` : ''
}

function handleCellClick(cell, currentClickedCell, fen) {
  console.log('cell',cell)
  let storePossibleMoves = null;
  console.log('store', storePossibleMoves)
    cell.addEventListener('click', async (event) => {
      const clickedCell = event.target.closest('td')

      if (currentClickedCell) {
        // Remove styling from the previously clicked cell, 
        //either remove for the click in same position
        removeHighlight(currentClickedCell)
        removePossibleHighlight()

      }

      // Check if the clicked to Cell is catched
      if (clickedCell) {
        const cellId = clickedCell.getAttribute('id')
        console.log('Click on cell', cellId)
        // cell contains pieces
        const pos = clickedCell.querySelector('span')
        //request possible moves
        let result = await sendRequestGetPossibleMoves(fen, cellId)
        
        // if click to cell contains piece
        if (pos) {         
          //highlight current piece pos
          addHighlight(clickedCell)
          // highlight possible moves from server response
          const highLightArr = result.possible_moves.map((move) => move.to)
          //console.log('possible move', highLightArr)
          for (let i = 0; i < highLightArr.length; i++) {
            // console.log('arr', highLightArr[i])
            addPossibleHighLight(document.getElementById(highLightArr[i]))
          }
          console.log('result', result.possible_moves)
          storePossibleMoves = result
         
        } else {
          // when click to an empty cell without piece
          //places piece to right position base on new fen (board_aftermove ) 
          //console.log('else', storePossibleMoves) // empty because of validation possible move for empty cell 
          console.log('Click on empty cell', clickedCell)
          const newPos = storePossibleMoves.possible_moves.filter((el)=>el.to === clickedCell.getAttribute('id'))
          console.log('pos', newPos)
          placePieces(newPos[0].board_after_move.fen)

          //TODO: implement Play to send actual board (fen) and receive new board from server
          
        }

        // Update the currently clicked cell and high light cell
        currentClickedCell = clickedCell
      }
    })
  
}

// Function to add highlighting to the cell
function addHighlight(cell) {
  console.log('cell click', cell)
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

document.addEventListener('DOMContentLoaded', async function () {
   const pov = 'white'
   const initFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
   try {
     // get element with id = chess-container in html view
     const chessboardContainer = document.getElementById('chess-container')

     // fetch data by sending request with pov parameter, then route will send the res of table side over '/', then implement placePieces()
     //In the context of the fetch function, if we don't specify the method, it defaults to a GET request.
     const response = await fetch(`/?pov=${pov}`)
     const chessboardHTML = await response.text()
     // chessboardHTML is the response from the server
     // console.log('test', chessboardHTML)

     // Client gets the chessboard from the server and places the pieces with FEN
     chessboardContainer.innerHTML = chessboardHTML
     // Call a function to place pieces here (not implemented in this snippet)
     await placePieces(initFen)
   } catch (error) {
     console.error('Error fetching chessboard:', error)
  }
  
  // listen click event in whole table
  // important when we move to the possible position later on
  const chessBoard = document.querySelectorAll('.chess-board')

  // Variable to keep track of the currently clicked cell
  let currentClickedCell = null
  chessBoard.forEach((cell) => {
    handleCellClick(cell, currentClickedCell, initFen)
  })
 })