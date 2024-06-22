const lib = require("../lib");

function withGameState(req, onGameState) {
  const gameState = req.cookies["game-state"]; // for now only gameId
  const storedGame = req.app.locals.gameState?.[gameState];
  console.log("[withGameState]", gameState, storedGame);
  // CONTINUE GAME
  if (gameState && storedGame) {
    console.log("[withGameState] CONTINUE GAME", gameState);
    onGameState({
      isNewGame: false,
      state: { gameId: gameState, fen: storedGame },
    });
    return;
  }
  // NEW GAME
  const gameId = lib.generateId();
  const initialFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  req.app.locals.gameState = {
    ...req.app.locals.gameState,
    [gameId]: initialFen,
  };
  console.log("[withGameState] NEW_GAME", gameId);
  onGameState({ isNewGame: true, state: { gameId, fen: initialFen } });
}

module.exports = withGameState;
