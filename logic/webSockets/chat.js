const WebSocket = require("ws");

function createWSServer() {
  const wsServer = new WebSocket.Server({ noServer: true });

  wsServer.on("connection", (ws) => {
    ws.on("error", console.error);
    ws.on("message", (data) => {
      console.log("[WS message]", data);
      for (const client of wsServer.clients) {
        if (client.readyState !== WebSocket.OPEN) continue;
        client.send(data);
      }
      console.log(`[WS][message] ${data} sended to all clients`);
    });
  });

  return wsServer;
}

function action(wsServer, request, socket, head) {
  wsServer.handleUpgrade(request, socket, head, (ws) => {
    wsServer.emit("connection", ws, request);
  });
}

module.exports = { createWSServer, action };
