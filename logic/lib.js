const crypto = require("crypto");

function generateId() {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Simulate delay
 * @param {number} minMs min delay >0
 * @param {number} maxMs max delay > min
 */
function randomDelay(minMs, maxMs) {
  const delayMs = minMs + Math.floor(Math.random() * (maxMs - minMs));

  return new Promise((resolve) => {
    setTimeout(() => resolve(), delayMs);
  });
}

module.exports = {
  generateId,
  randomDelay,
};
