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

/* GET board */

router.get('/chessBoard', function (req, res, next) {
  res.setHeader('Cache-Control', 'no-store')

  console.log("res",res);
  console.log(req);
  //index.hbs
  res.render('index')
})

/* GET home page. */

router.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-store')

  // get {pov} from client
  // Default  POV = 'white' if user does not provide
  const pov = req.query.pov || 'white'

  // Call the renderChessboardWithPov function with the provided POV
  //this run the js function and send to client
  const chessboardHTML = renderChessboardWithPov(pov)

  // Send the generated chessboard HTML to the client
  //just send, not render
  res.send(chessboardHTML)
})




module.exports = router
