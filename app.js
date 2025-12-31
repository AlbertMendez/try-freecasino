const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll("[data-panel]");
const enterButtons = document.querySelectorAll("[data-enter-casino]");
const startGameButtons = document.querySelectorAll("[data-start-game]");
const gameSection = document.querySelector("[data-game-section]");
const gameGrid = document.querySelector("[data-game-grid]");
const gameStatus = document.querySelector("[data-game-status]");
const gameSubstatus = document.querySelector("[data-game-substatus]");
const gameStartButton = document.querySelector("[data-game-start]");
const gameResetButton = document.querySelector("[data-game-reset]");
const moveButtons = document.querySelectorAll("[data-move]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-selected", item === tab ? "true" : "false");
    });

    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

panels.forEach((panel) => {
  panel.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const enterCasino = () => {
  document.body.classList.add("authenticated");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

enterButtons.forEach((button) => {
  button.addEventListener("click", enterCasino);
});

const GRID_SIZE = 5;
const lanes = [
  { row: 1, direction: 1 },
  { row: 2, direction: -1 },
  { row: 3, direction: 1 },
];
let player = { row: GRID_SIZE - 1, col: Math.floor(GRID_SIZE / 2) };
let obstacles = [];
let gameTimer = null;
let isRunning = false;

const buildGrid = () => {
  if (!gameGrid) {
    return;
  }
  gameGrid.innerHTML = "";
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const cell = document.createElement("div");
      cell.classList.add("game-cell");
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      gameGrid.appendChild(cell);
    }
  }
};

const resetPlayer = () => {
  player = { row: GRID_SIZE - 1, col: Math.floor(GRID_SIZE / 2) };
};

const seedObstacles = () => {
  obstacles = lanes.map((lane) => ({
    row: lane.row,
    direction: lane.direction,
    cols: [0, 3].map((offset) => (offset + lane.row) % GRID_SIZE),
  }));
};

const renderGrid = () => {
  if (!gameGrid) {
    return;
  }
  gameGrid.querySelectorAll(".game-cell").forEach((cell) => {
    cell.classList.remove("player", "obstacle");
  });
  const playerCell = gameGrid.querySelector(
    `.game-cell[data-row="${player.row}"][data-col="${player.col}"]`
  );
  if (playerCell) {
    playerCell.classList.add("player");
  }
  obstacles.forEach((lane) => {
    lane.cols.forEach((col) => {
      const obstacleCell = gameGrid.querySelector(
        `.game-cell[data-row="${lane.row}"][data-col="${col}"]`
      );
      if (obstacleCell) {
        obstacleCell.classList.add("obstacle");
      }
    });
  });
};

const updateStatus = (main, sub) => {
  if (gameStatus) {
    gameStatus.textContent = main;
  }
  if (gameSubstatus) {
    gameSubstatus.textContent = sub;
  }
};

const tick = () => {
  obstacles = obstacles.map((lane) => {
    const nextCols = lane.cols.map((col) => (col + lane.direction + GRID_SIZE) % GRID_SIZE);
    return { ...lane, cols: nextCols };
  });
  renderGrid();
  const hit = obstacles.some(
    (lane) => lane.row === player.row && lane.cols.includes(player.col)
  );
  if (hit) {
    updateStatus("¡Choque detectado!", "Recolocamos la gallina para seguir jugando.");
    resetPlayer();
    renderGrid();
  }
};

const startGameLoop = () => {
  if (isRunning) {
    return;
  }
  isRunning = true;
  updateStatus("Ronda en marcha", "Cruza el camino sin perder ritmo.");
  gameTimer = window.setInterval(tick, 450);
};

const stopGameLoop = () => {
  if (gameTimer) {
    window.clearInterval(gameTimer);
  }
  gameTimer = null;
  isRunning = false;
};

const showGameSection = () => {
  if (!gameSection) {
    return;
  }
  gameSection.classList.add("active");
  gameSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

const movePlayer = (direction) => {
  const moves = {
    up: { row: -1, col: 0 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
  };
  const delta = moves[direction];
  if (!delta) {
    return;
  }
  const nextRow = Math.min(Math.max(player.row + delta.row, 0), GRID_SIZE - 1);
  const nextCol = Math.min(Math.max(player.col + delta.col, 0), GRID_SIZE - 1);
  player = { row: nextRow, col: nextCol };
  renderGrid();
};

const initGame = () => {
  if (!gameGrid) {
    return;
  }
  buildGrid();
  resetPlayer();
  seedObstacles();
  renderGrid();
};

initGame();

startGameButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showGameSection();
    startGameLoop();
  });
});

if (gameStartButton) {
  gameStartButton.addEventListener("click", () => {
    showGameSection();
    startGameLoop();
  });
}

if (gameResetButton) {
  gameResetButton.addEventListener("click", () => {
    resetPlayer();
    renderGrid();
    updateStatus("Posición reiniciada", "Listo para continuar tu ronda.");
  });
}

moveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    movePlayer(button.dataset.move);
  });
});

window.addEventListener("keydown", (event) => {
  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  const direction = keyMap[event.key];
  if (!direction) {
    return;
  }
  event.preventDefault();
  movePlayer(direction);
});

window.addEventListener("beforeunload", () => {
  stopGameLoop();
});
