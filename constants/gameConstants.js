import { createBoard } from '../utils/boardUtils';

export const BOARD_SIZE_MINE_COUNT_MAP = {
  8: 10,
  9: 10,
  10: 10,
  14: 40,
  15: 40,
  16: 40,
  22: 99,
};

const INITIAL_BOARD_SIZE = 10;

export const INITIAL_STATE = {
  board: createBoard(INITIAL_BOARD_SIZE),
  boardSize: INITIAL_BOARD_SIZE,
  mineCount: BOARD_SIZE_MINE_COUNT_MAP[INITIAL_BOARD_SIZE],
  isGameInProgress: false,
  isGameLost: false,
};
