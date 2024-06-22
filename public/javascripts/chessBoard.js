import apiClient from "./apiClient.js";
import stopwatch from "./stopwatch.js";

//#region UI

//#region placePieces
export function placePieces(fen) {
  const boardSize = 8;
  const rows = fen.split("/");

  for (let i = 0; i < boardSize; i++) {
    const expandedRow = expandRow(rows[i]);
    for (let j = 0; j < boardSize; j++) {
      const cell = expandedRow[j];
      const piece = cell.match(/[prnbqkPRNBQK]/) ? getChessPiece(cell) : "";
      const cellId = `${"ABCDEFGH"[j]}${8 - i}`;
      const cellElement = document.getElementById(cellId);
      cellElement.innerHTML = piece;
    }
  }
}

function expandRow(row) {
  return row.replace(/\d/g, (digit) => " ".repeat(digit)).split("");
}

function getChessPiece(char) {
  const pieces = {
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    p: "♟",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
    P: "♙",
  };
  return `<span class="chess-piece">${pieces[char]}</span>`;
}
//#endregion

let selectedSquare = null; // Currently selected grid
function selectSquareUI(squareId) {
  clearSelectedSquareUI();
  clearHighlightedMoves();

  document.getElementById(squareId)?.classList.add("selected");
  selectedSquare = squareId;
  console.log("[selectSquareUI]", selectedSquare);
}

function clearSelectedSquareUI() {
  document.getElementById(selectedSquare)?.classList.remove("selected");
  selectedSquare = null;
}

function highlightPossibleMoves(moves) {
  if (!Array.isArray(moves)) {
    console.error("Invalid moves data:", moves);
    return;
  }

  moves.forEach((move) => {
    document.getElementById(move.toUpperCase())?.classList.add("highlight");
  });
}

function clearHighlightedMoves() {
  document.querySelectorAll(".highlight").forEach((cell) => {
    cell.classList.remove("highlight");
  });
}

function toggleBoardDisablity() {
  document.querySelector(".chess-table").classList.toggle("opponent-move");
}

//#endregion

//#region Logic
let lastMoves = [];

async function clickSquare(squareId) {
  // move
  const move = lastMoves.find((x) => x.to === squareId);
  if (move) {
    // player
    console.log("[clickSquare] move", selectedSquare, squareId);
    clearHighlightedMoves();
    clearSelectedSquareUI();
    const playerMove = await apiClient.makeMove(move);
    // console.log("[clickSquare] move", board, selectedSquare);
    placePieces(playerMove.board);
    lastMoves = [];
    toggleBoardDisablity();
    if (playerMove.status === "Checkmate") {
      gameover("Player win");
      return;
    }
    stopwatch.toggle();

    // opponent
    const opponentMove = await apiClient.fetchOpponentMove();
    placePieces(opponentMove.board);
    if (opponentMove.status === "Checkmate") {
      gameover("Opponent win");
      return;
    }
    stopwatch.toggle();
    toggleBoardDisablity();
    return;
  }

  // get moves
  selectSquareUI(squareId);
  const moves = await apiClient.fetchPossibleMoves(squareId);
  console.log("[squareClicked] moves", moves);
  lastMoves = moves;
  highlightPossibleMoves(lastMoves.map((move) => move.to.toUpperCase()));
}

function gameover(winner) {
  setTimeout(() => alert(`Gameover! ${winner}`), 0);
  stopwatch.gameover();
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".chess-table")
    .addEventListener("click", async (event) => {
      const pressedCell = event.target.closest("td");
      console.group("[.chess-table click]", pressedCell.id);
      await clickSquare(pressedCell.id);
      console.groupEnd();
    });
  // initial game start
  stopwatch.toggle(true, "white");
  stopwatch.onPlayerTimeout(() => gameover("Timeout, Opponent win"));
  stopwatch.onOpponentTimeout(() => gameover("Timeout, Player win"));
});
//#endregion
