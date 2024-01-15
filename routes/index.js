var express = require('express')
var router = express.Router()
const app = express()

function renderChessboardWithPov(pov) {
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
      chessBoard += `<td id=${col}${row}></td>`
    }
    chessBoard += `</tr>` // close a tr block
  }
  chessBoard += `</table>` // close tag table
  return chessBoard
}

app.use(express.static('public'))

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'International Chess' });
// });

router.get('/', function (req, res) {
  const pov = req.query.pov || 'white' // Default to 'white' POV if not specified
  console.log(pov)

  // Call the renderChessboardWithPov function with the provided POV
  const chessboardHTML = renderChessboardWithPov(pov)

  // Send the generated chessboard HTML to the client
  res.send(chessboardHTML)
})

router.get('/chessBoard', function (req, res, next) {
  res.render('index', { title: 'International Chess' })
})


module.exports = router
