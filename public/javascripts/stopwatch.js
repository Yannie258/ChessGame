class Stopwatch extends HTMLElement {
  constructor() {
    super();
    this.running = false;
    this.intervalId = null;
    this.attachShadow({ mode: "open" });
    this.timeLeft = this.time;
    this.shadowRoot.innerHTML = this.formatTime(this.timeLeft);
  }

  get time() {
    return parseInt(this.getAttribute("time")) || 0;
  }

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  toggle() {
    this.running ? this.stop() : this.start();
  }

  start() {
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.running = true;
  }

  stop() {
    clearInterval(this.intervalId);
    this.running = false;
  }

  updateTime() {
    if (this.timeLeft <= 0) return;

    this.timeLeft--;
    this.shadowRoot.innerHTML = this.formatTime(this.timeLeft);
    if (this.timeLeft === 0) {
      this.stop();
      emitTimeUpEvent();
    }
  }

  emitTimeUpEvent() {
    this.dispatchEvent(new Event("timesup"));
  }

  reset() {
    clearInterval(this.intervalId);
    this.running = false;
    this.timeLeft = this.time;
    this.shadowRoot.innerHTML = this.formatTime(this.timeLeft);
  }
}

customElements.define("stop-watch", Stopwatch);

function toggleOpponentStopwatch() {
  console.log("[stopwatch] toggle opponent");
  document.getElementById("opponent-stopwatch")?.toggle();
}

function togglePlayerStopwatch() {
  console.log("[stopwatch] toggle player");
  document.getElementById("player-stopwatch")?.toggle();
}

function onOpponentTimeout(callback) {
  document
    .getElementById("opponent-stopwatch")
    ?.addEventListener("timesup", callback);
}

function onPlayerTimeout(callback) {
  document
    .getElementById("player-stopwatch")
    ?.addEventListener("timesup", callback);
}

function toggle(isFirstTime, playerSide) {
  if (isFirstTime) {
    if (playerSide === "white") togglePlayerStopwatch();
    else toggleOpponentStopwatch();
    return;
  }
  toggleOpponentStopwatch();
  togglePlayerStopwatch();
}

function gameover() {
  console.log("[stopwatch] stop player & opponent");
  document.getElementById("player-stopwatch")?.stop();
  document.getElementById("opponent-stopwatch")?.stop();
}

const stopwatch = {
  toggle,
  gameover,
  onPlayerTimeout,
  onOpponentTimeout,
};

export default stopwatch;
