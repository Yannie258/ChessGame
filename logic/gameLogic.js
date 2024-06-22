const gprc = require("./gRPC/grpcClient");
const lib = require("./lib");

function renderChessboard(pov) {
  const rowsId = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const colsId = ["A", "B", "C", "D", "E", "F", "G", "H"];

  if (pov === "black") {
    rowsId.reverse();
    colsId.reverse();
  }

  let chessboardHTML = "<table class='chess-table'>";

  for (let row of rowsId) {
    chessboardHTML += "<tr>";
    for (let col of colsId) {
      chessboardHTML += `<td id="${col}${row}"></td>`;
    }
    chessboardHTML += "</tr>";
  }
  chessboardHTML += "</table>";
  return chessboardHTML;
}

function getPossibleMoves(fen, from, callback) {
  gprc.grpcClient.GetPossibleMoves({ current_board: { fen }, from }, callback);
}

async function playerMove(
  board_before_move,
  from,
  to,
  board_after_move,
  status
) {
  const move = {
    board_before_move,
    from,
    to,
    board_after_move,
    status,
  };

  // validate player state
  const isValid = await gprc.validate(move);
  console.log("[makeMove]", isValid);
  return isValid ? { error: null, move_made: move } : { error: true };
}

/**
 * computer play
 * @param board - {fen: string}
 * @returns move with new FEN
 */
async function opponentMove(board) {
  await lib.randomDelay(500, 3000);
  try {
    const move_made = await gprc.play(board);
    console.log("[opponentMove]", move_made);
    return { error: null, move_made };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  playerMove,
  opponentMove,
  getPossibleMoves,
  renderChessboard,
};
