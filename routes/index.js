const config = require("../config");
const express = require("express");
const gameLogic = require("../logic/gameLogic");
const withGameState = require("../logic/middlewares/withGameState");
const router = express.Router();

router.get(config.pages.index, function (req, res) {
  const pov = req.query.pov || config.defaultPov;
  const chessboardHtml = gameLogic.renderChessboard(pov);
  console.log(config.pages.index, req.app.locals?.gameState ?? "no gameState");

  withGameState(req, ({ isNewGame, state }) => {
    if (isNewGame) res.cookie("game-state", state.gameId, { httpOnly: true });

    res.render("index", {
      title: "International Chess",
      chessboardHtml,
      fen: state.fen,
    });
  });
});

module.exports = router;
