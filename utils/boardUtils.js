import { getRandomIntExcludingNum } from './numberUtils';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';

export function createBoard(boardSize) {
  const board = [];

  for (let i = 0; i < boardSize; i++) {
    const row = [];

    for (let j = 0; j < boardSize; j++) {
      row.push({
        isMine: false,
        isFlagged: false,
        isRevealed: false,
        adjacentMineCount: 0,
        x: i,
        y: j,
      });
    }

    board.push(row);
  }

  return board;
}

export function initializeBoard(board, boardSize, numMines, origin) {
  const boardWithMines = addMines(board, boardSize, numMines, origin);
  const boardWithCounts = addCounts(boardWithMines);
  return boardWithCounts;
};

function addMines(board, boardSize, numMines, origin) {
  while (numMines) {
    const x = getRandomIntExcludingNum(boardSize, origin.x);
    const y = getRandomIntExcludingNum(boardSize, origin.y);
    const element = board[x][y];

    if (!element.isMine) {
      element.isMine = true;
      numMines--;
    }
  }

  return board;
}

function addCounts(board) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y].isMine) {
        countNeighbors(board, x, y);
      }
    }
  }

  return board;
}

function countNeighbors(board, x, y) {
  const rows = [x - 1, x, x + 1];
  const cols = [y - 1, y, y + 1];
  const max = board[0].length - 1;

  for (let row of rows) {
    for (let col of cols) {
      if (isWithinBounds(row, col, max)) {
        const element = board[row][col];

        if (!element.isMine) {
          board[row][col].adjacentMineCount++;
        }
      }
    }
  }
}

function isWithinBounds(row, col, max) {
  if (row < 0 || col < 0) return false;
  if (row > max || col > max) return false;
  return true;
}

export function revealAllAdjacentSquares(board, boardSize, x, y) {
  const squares = [];
  const memo = {};

  function recurse(x, y) {
    const adjacent = getAdjacentSquares(board, boardSize, x, y);

    for (let a of adjacent) {
      if (memo[`${a.x}+${a.y}`]) continue;
      else (memo[`${a.x}+${a.y}`]) = true;

      squares.push(a);

      if (a.adjacentMineCount === 0 && !a.isRevealed) {
        recurse(a.x, a.y);
      }
    }
  }

  recurse(x, y);

  squares.forEach(square => {
    square.isRevealed = true;
  });

  return board;
}

function getAdjacentSquares(board, boardSize, x, y) {
  const adjacentSquares = [];

  const rows = [
    x - 1,
    x,
    x + 1,
  ];

  const cols = [
    y - 1,
    y,
    y + 1,
  ];

  for (let row of rows) {
    for (let col of cols) {
      if (row === x && col === y) continue;

      if (isInBounds(row, col, boardSize)) {
        const square = board[row][col];
        adjacentSquares.push(square);
      }
    }
  }

  return adjacentSquares;
}

function isInBounds(row, col, boardSize) {
  if (row < 0 || col < 0) return false;
  if (row > boardSize - 1 || col > boardSize - 1) return false;
  return true;
}

export function checkActiveGameStatus(board, boardSize) {
  const expectedRevealed = boardSize ** 2 - BOARD_SIZE_NUM_MINES_MAP[boardSize];
  let actualRevealed = 0;

  for (let row of board) {
    for (let square of row) {
      if (square.isMine && square.isRevealed) return GameStatusTypes.LOST;
      if (!square.isMine && square.isRevealed) actualRevealed++;
    }
  }

  if (actualRevealed === expectedRevealed) return GameStatusTypes.WON;

  return GameStatusTypes.ACTIVE;
}
