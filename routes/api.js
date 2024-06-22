const config = require("../config");
const express = require("express");
const gameLogic = require("../logic/gameLogic");
const withGameState = require("../logic/middlewares/withGameState");
const router = express.Router();

router.post(config.api.makeMove, async (req, res) => {
  // console.log(config.api.makeMove, "req.body", req.body);
  const { from, to, board_after_move, status } = req.body;

  withGameState(req, async ({ isNewGame, state }) => {
    if (isNewGame) RedirectToNewGameOnError(res);

    const { error, move_made } = await gameLogic.playerMove(
      { fen: state.fen }, // board_before_move
      from,
      to,
      board_after_move,
      status
    );

    if (error) {
      res.status(400).json({ error });
      return;
    }
    // Save move
    res.app.locals.gameState[state.gameId] = move_made.board_after_move.fen;

    res.json({
      board: move_made.board_after_move.fen,
      status: move_made.status,
    });
  });
});

router.get(config.api.getOpponentMove, (req, res) => {
  withGameState(req, async ({ isNewGame, state }) => {
    if (isNewGame) RedirectToNewGameOnError(res);

    const { error, move_made } = await gameLogic.opponentMove({
      fen: state.fen,
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }
    // Save move
    res.app.locals.gameState[state.gameId] = move_made.board_after_move.fen;

    res.json({
      board: move_made.board_after_move.fen,
      status: move_made.status,
    });
  });
});

router.get(config.api.getPossibleMoves, (req, res) => {
  const { from } = req.query;

  withGameState(req, ({ isNewGame, state }) => {
    if (isNewGame) RedirectToNewGameOnError(res);

    gameLogic.getPossibleMoves(state.fen, from, (err, response) => {
      if (err) {
        console.error("gRPC error:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(response.possible_moves);
    });
  });
});

function RedirectToNewGameOnError(res) {
  console.error("Game doesn't exist. Starting new one");
  res.redirect(config.pages.index);
}

module.exports = router;
