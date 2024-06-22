import config from "./config.js";

let currentSocket;
let retryWSInterval;

function connectWS() {
  const connectionString = `${config.webSockets.protocol}://${window.location.host}${config.webSockets.chat}`;
  const socket = new WebSocket(connectionString);

  socket.addEventListener("open", (event) => {
    console.log("[WS open]");
    clearInterval(retryWSInterval);
  });

  socket.addEventListener("close", (event) => {
    console.log("[WS closed]");
    retryWS();
  });

  socket.addEventListener("error", (event) => {
    console.error("[WS error]", event);
    retryWS();
  });

  socket.addEventListener("message", async (event) => {
    const data = await event.data.text();
    console.log("[WS message]", data);

    const chatDiv = document.querySelector(".chat-wrapper");
    const msg = document.createElement("li");
    msg.classList.add("chat-message");

    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const min = currentDate.getMinutes().toString().padStart(2, "0");
    const sec = currentDate.getSeconds().toString().padStart(2, "0");
    const formattedDate = `${hours}:${min}:${sec}`;
    const time = document.createElement("span");
    time.classList.add("chat-message-time");

    const msgContent = document.createElement("span");
    msgContent.textContent = data;
    time.textContent = formattedDate;
    msg.appendChild(msgContent);
    msg.appendChild(time);
    chatDiv.insertAdjacentElement("afterbegin", msg);
  });
  return socket;
}

/**
 * To make chat automatically reconnect
 */
function retryWS() {
  if (currentSocket) {
    currentSocket.close();
    currentSocket = null;
  }
  clearInterval(retryWSInterval);

  retryWSInterval = setInterval(() => {
    console.log("[retryWS] reconnect");
    currentSocket = connectWS();
  }, config.webSockets.retryEvery);
}

// initiate WS
currentSocket = connectWS();

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  messageInput.value = "";
  if (message.trim() === "") return;
  currentSocket.send(message);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendMessage").addEventListener("click", sendMessage);
});
