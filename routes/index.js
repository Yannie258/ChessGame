var express = require('express')
var router = express.Router()
const app = express()
const gameLogic = require('../public/javascripts/renderChessBoard')

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
  const chessboardHTML = gameLogic.renderChessBoard(pov)

  // Send the generated chessboard HTML to the client
  //just send, not render
  res.send(chessboardHTML)
})




module.exports = router
