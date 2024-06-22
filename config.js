// SERVER config
const config = {
  isDevelopment: process.env.NODE_ENV
    ? process.env.NODE_ENV === "development"
    : true, // development by default
  isProduction: process.env.NODE_ENV !== "development",
  defaultPov: "white",
  defaultPort: 3000,
  pages: {
    index: "/",
    usersFolder: "/users",
    users: {
      index: "/",
    },
  },
  // Keep up to date with public/javascripts/config.js
  api: {
    getOpponentMove: "/getOpponentMove",
    getPossibleMoves: "/getPossibleMoves",
    makeMove: "/makeMove",
  },
  webSockets: {
    chat: "/chat",
  },
  grpcServer: "vsrstud02.informatik.tu-chemnitz.de:50051",
};

module.exports = config;
