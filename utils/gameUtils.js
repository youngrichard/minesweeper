import { cloneDeep, flattenDeep } from 'lodash';

import { getRandomInt } from './numberUtils';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';

/**
 * Helper functions to manipulate the game board
 */

export function createBlankBoard(boardSize) {
  // Creates an blank board of a given size
  // x and y coordinates are added to each field
  const board = [];
  const DEFAULT_FIELD_PROPS = {
    isMine: false,
    isFlagged: false,
    isRevealed: false,
    numNeighboringMines: 0,
  };

  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      row.push({
        ...DEFAULT_FIELD_PROPS,
        x,
        y,
      });
    }

    board.push(row);
  }

  return board;
}

export function populateBoard(board, boardSize, numMines, coordinates) {
  // Populates mines and counts on the board
  const newBoard = cloneDeep(board);
  const mineField = plantMines(newBoard, boardSize, numMines, coordinates);
  return countNeighboringMines(mineField, boardSize);
};

function plantMines(board, boardSize, numMines, coordinates) {
  // Plant mines at random locations excluding the click origin
  const newBoard = cloneDeep(board);

  while (numMines > 0) {
    const x = getRandomInt(0, boardSize, coordinates.x);
    const y = getRandomInt(0, boardSize, coordinates.y);
    const field = newBoard[x][y];

    if (!field.isMine) {
      field.isMine = true;
      numMines--;
    }
  }

  return newBoard;
}

function countNeighboringMines(board, boardSize) {
  // Counts neighboring mines for each field
  const newBoard = cloneDeep(board);

  for (let row of newBoard) {
    for (let field of row) {
      if (field.isMine) {
        const neighbors = getNeighboringFields(newBoard, boardSize, field);
        neighbors.forEach(n => {
          n.numNeighboringMines++;
        });
      }
    }
  }

  return newBoard;
}

function getNeighboringFields(board, boardSize, originField) {
  // Returns neighboring fields
  // Excludes origin field and out-of-bounds fields
  const neighboringFields = [];
  const xIndexes = [
    originField.x - 1,
    originField.x,
    originField.x + 1,
  ];
  const yIndexes = [
    originField.y - 1,
    originField.y,
    originField.y + 1,
  ];

  for (let x of xIndexes) {
    for (let y of yIndexes) {
      if (x === originField.x && y === originField.y) continue;
      if (isInBounds(x, y, boardSize - 1)) neighboringFields.push(board[x][y]);
    }
  }

  return neighboringFields;
}

function isInBounds(x, y, max) {
  // Determines whether or not coordinates are in-bounds
  if (x < 0 || y < 0) return false;
  if (x > max || y > max) return false;
  return true;
}

export function revealNeighbors(board, boardSize, originField) {
  // Recursively reveals neighbors of fields with no adjacent mines
  const newBoard = cloneDeep(board);
  const neighbors = [];
  const memo = {};

  function recurse(field) {
    const neighboringFields = getNeighboringFields(newBoard, boardSize, field);

    for (let n of neighboringFields) {
      const coordinates = `${n.x},${n.y}`;

      if (memo[coordinates]) continue;
      else (memo[coordinates]) = true;

      neighbors.push(n);

      if (n.numNeighboringMines === 0 && !n.isRevealed) recurse(n);
    }
  }

  recurse(originField);

  neighbors.forEach(neighbor => {
    neighbor.isRevealed = true;
  });

  return newBoard;
}

export function checkActiveGameStatus(board, boardSize) {
  const flatBoard = flattenDeep(cloneDeep(board));

  // If a mine is revealed, the game is lost
  for (let field of flatBoard) {
    if (field.isMine && field.isRevealed) return GameStatusTypes.LOST;
  }

  const expected = boardSize ** 2 - BOARD_SIZE_NUM_MINES_MAP[boardSize];
  const actual = flatBoard.reduce((total, current) => current.isRevealed ? total + 1 : total, 0);

  // If number of revealed = area - number of mines, the game is won
  if (actual === expected) return GameStatusTypes.WON;

  // Else, the game is still active
  return GameStatusTypes.ACTIVE;
}

export function toggleFlag(board, coordinates) {
  const newBoard = cloneDeep(board);

  // Toggle flag for clicked field
  const field = newBoard[coordinates.x][coordinates.y];
  field.isFlagged = !field.isFlagged;

  return newBoard;
}

export function revealField(board, boardSize, coordinates) {
  const newBoard = cloneDeep(board);

  // Reveal clicked field
  newBoard[coordinates.x][coordinates.y].isRevealed = true;
  const updatedField = newBoard[coordinates.x][coordinates.y];

  if (updatedField.numNeighboringMines === 0) {
    // If clicked field does not have adjacent mines, reveal neighbors
    return revealNeighbors(newBoard, boardSize, updatedField);
  }

  return newBoard;
}

export function revealAllFields(board) {
  // Reveal all fields when game is over
  const newBoard = cloneDeep(board);

  for (let row of newBoard) {
    for (let field of row) {
      field.isRevealed = true;
    }
  }

  return newBoard;
}

export function countFlags(board) {
  // Counts number of flags placed
  const flatBoard = flattenDeep(cloneDeep(board));
  return flatBoard.reduce((total, current) => current.isFlagged ? total + 1 : total, 0);
}
