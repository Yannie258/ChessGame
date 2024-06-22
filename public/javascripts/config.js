// PUBLIC Config
const config = {
  api: {
    getOpponentMove: "/getOpponentMove",
    getPossibleMoves: "/getPossibleMoves",
    makeMove: "/makeMove",
  },
  webSockets: {
    chat: "/chat",
    protocol: "ws",
    retryEvery: 3000,
  },
};

export default config;
