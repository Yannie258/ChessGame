var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/chessboard/possibleMoves', function (req, res, next) {
  res.send('possible move')
})

module.exports = router
