import { cloneDeep, flattenDeep } from 'lodash';

import { getRandomInt } from './numberUtils';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';

/**
 * Helper functions to manipulate the game board
 */

export function createBoard(boardSize) {
  // Creates an empty board of a given size
  // x and y coordinates are added to each square
  const board = [];
  const DEFAULT_SQUARE_PROPS = {
    isMine: false,
    isFlagged: false,
    isRevealed: false,
    numNeighboringMines: 0,
  };

  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      row.push({
        ...DEFAULT_SQUARE_PROPS,
        x,
        y,
      });
    }

    board.push(row);
  }

  return board;
}

export function initializeBoard(board, boardSize, numMines, clickedSquare) {
  // Populates mines and counts on the board
  const newBoard = cloneDeep(board);
  const mineField = plantMines(newBoard, boardSize, numMines, clickedSquare);
  return countNeighboringMines(mineField, boardSize);
};

function plantMines(board, boardSize, numMines, clickedSquare) {
  // Plant mines at random locations excluding the clicked square
  const newBoard = cloneDeep(board);

  while (numMines > 0) {
    const x = getRandomInt(0, boardSize, clickedSquare.x);
    const y = getRandomInt(0, boardSize, clickedSquare.y);
    const square = newBoard[x][y];

    if (!square.isMine) {
      square.isMine = true;
      numMines -= 1;
    }
  }

  return newBoard;
}

function countNeighboringMines(board, boardSize) {
  // Counts neighboring mines for each square
  const newBoard = cloneDeep(board);

  for (let row of newBoard) {
    for (let square of row) {
      if (square.isMine) {
        const neighbors = getNeighboringSquares(newBoard, boardSize, square);
        neighbors.forEach(n => {
          n.numNeighboringMines += 1;
        });
      }
    }
  }

  return newBoard;
}

function getNeighboringSquares(board, boardSize, originSquare) {
  // Returns neighboring squares
  // Excludes origin square and out-of-bounds squares
  const neighboringSquares = [];
  const xIndexes = [
    originSquare.x - 1,
    originSquare.x,
    originSquare.x + 1,
  ];
  const yIndexes = [
    originSquare.y - 1,
    originSquare.y,
    originSquare.y + 1,
  ];

  for (let x of xIndexes) {
    for (let y of yIndexes) {
      if (x === originSquare.x && y === originSquare.y) continue;
      if (isInBounds(x, y, boardSize - 1)) neighboringSquares.push(board[x][y]);
    }
  }

  return neighboringSquares;
}

function isInBounds(x, y, max) {
  // Determines whether or not coordinates are in-bounds
  if (x < 0 || y < 0) return false;
  if (x > max || y > max) return false;
  return true;
}

export function revealNeighbors(board, boardSize, originSquare) {
  // Recursively reveals neighbors of squares with no adjacent mines
  const newBoard = cloneDeep(board);
  const neighbors = [];
  const memo = {};

  function recurse(square) {
    const neighboringSquares = getNeighboringSquares(newBoard, boardSize, square);

    for (let n of neighboringSquares) {
      const coordinates = `${n.x},${n.y}`;

      if (memo[coordinates]) continue;
      else (memo[coordinates]) = true;

      neighbors.push(n);

      if (n.numNeighboringMines === 0 && !n.isRevealed) recurse(n);
    }
  }

  recurse(originSquare);

  neighbors.forEach(neighbor => {
    neighbor.isRevealed = true;
  });

  return newBoard;
}

export function checkActiveGameStatus(board, boardSize) {
  const flatBoard = flattenDeep(cloneDeep(board));

  // If a mine is revealed, the game is lost
  for (let square of flatBoard) {
    if (square.isMine && square.isRevealed) return GameStatusTypes.LOST;
  }

  const expected = boardSize ** 2 - BOARD_SIZE_NUM_MINES_MAP[boardSize];
  const actual = flatBoard.reduce((total, current) => current.isRevealed ? total + 1 : total, 0);

  // If number of revealed = number of squares - number of mines, the game is won
  if (actual === expected) return GameStatusTypes.WON;

  // Else, the game is still active
  return GameStatusTypes.ACTIVE;
}

export function toggleFlag(board, clickedSquare) {
  // Toggle flag for clicked square

  const newBoard = cloneDeep(board);
  newBoard[clickedSquare.x][clickedSquare.y].isFlagged = !clickedSquare.isFlagged;

  return newBoard;
}

export function revealSquare(board, boardSize, clickedSquare) {
  const newBoard = cloneDeep(board);

  // Reveal clicked square
  newBoard[clickedSquare.x][clickedSquare.y].isRevealed = true;
  const updatedClickedSquare = newBoard[clickedSquare.x][clickedSquare.y];

  if (updatedClickedSquare.numNeighboringMines === 0) {
    // If clicked square does not have adjacent mines, reveal neighbors
    return revealNeighbors(newBoard, boardSize, updatedClickedSquare);
  }

  return newBoard;
}

export function revealAllSquares(board) {
  // Reveal all squares when game is over
  const newBoard = cloneDeep(board);

  for (let row of newBoard) {
    for (let square of row) {
      square.isRevealed = true;
    }
  }

  return newBoard;
}

export function countFlags(board) {
  // Counts number of flags placed
  const flatBoard = flattenDeep(cloneDeep(board));
  return flatBoard.reduce((total, current) => current.isFlagged ? total + 1 : total, 0);
}
