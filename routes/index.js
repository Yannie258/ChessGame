var express = require('express')
var router = express.Router()
const app = express()
const gameLogic = require('../public/javascripts/renderChessBoard')
const grpcClient = require('../grpc/client')

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

/* POST possible move from extern server */
router.post('/chessBoard/possibleMoves', function (req, res, next) {
  // send request body with pos is data we need to check
  //const fen = req.body.fen
   //const position = req.body.pos
  //shorthand:
  //{} : object define
  const { fen, pos } = req.body

  console.log('get fen from client', {fen,pos})
   res.setHeader('Cache-Control', 'no-store')  
  // should call grpc here to get real possible moves from extern server

  grpcClient.grpcClient.getPossibleMoves({ current_board: { fen }, from: pos }, (err, grpcResponse) => {
    if (err) {
      console.error('Error:', err)
      res.status(500).send('Internal Server Error')
    } else {
      console.log('Response from gRPC server:', grpcResponse.possible_moves)
      const possible_moves = grpcResponse.possible_moves
      // message GetPossibleMovesResponse{repeated Move possible_moves = 1;} 
      res.json({ possible_moves: possible_moves })
    }
 
  })

})


module.exports = router
