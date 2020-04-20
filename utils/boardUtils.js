import { getRandomIntExcludingNum } from './numberUtils';

export function createBoard(boardSize) {
  const generateRow = () => Array(boardSize).fill(0);
  return Array(boardSize).fill().map(generateRow);
}

export function initializeBoard(board, boardSize, mineCount, origin) {
  const boardWithMines = addMines(board, boardSize, mineCount, origin);
  const boardWithCounts = addCounts(boardWithMines);
  return boardWithCounts;
};

function addMines(board, boardSize, mineCount, origin) {
  while (mineCount) {
    const x = getRandomIntExcludingNum(boardSize, origin.x);
    const y = getRandomIntExcludingNum(boardSize, origin.y);

    if (board[x][y] !== '*') {
      board[x][y] = '*';
      mineCount--;
    }
  }

  return board;
}

function addCounts(board) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === '*') {
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
      if (isInBounds(row, col, max)) {
        const element = board[row][col];

        if (isNotMine(element)) {
          board[row][col]++;
        }
      }
    }
  }
}

function isInBounds(row, col, max) {
  if (row < 0 || col < 0) return false;
  if (row > max || col > max) return false;
  return true;
}

function isNotMine(element) {
  return element !== '*';
}