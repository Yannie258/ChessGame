import config from "./config.js";

async function makeMove(move) {
  console.log("[makeMove] fetch");
  try {
    const response = await fetch(config.api.makeMove, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(move),
    });
    return await response.json();
  } catch (error) {
    console.error("[makeMove] Error:", error);
  }
}

async function fetchOpponentMove() {
  console.log("[fetchOpponentMove] fetch");
  try {
    const response = await fetch(`${config.api.getOpponentMove}`);
    return await response.json();
  } catch (error) {
    console.error("[fetchOpponentMove] Error:", error);
  }
}

async function fetchPossibleMoves(squareId) {
  console.log("[fetchPossibleMoves] fetch");
  try {
    const params = new URLSearchParams({ from: squareId });
    const response = await fetch(
      `${config.api.getPossibleMoves}?${params.toString()}`
    );
    const moves = await response.json();
    return moves;
  } catch (error) {
    console.error("[fetchPossibleMoves] Error:", error);
  }
}

const apiClient = {
  makeMove,
  fetchOpponentMove,
  fetchPossibleMoves,
};

export default apiClient;
