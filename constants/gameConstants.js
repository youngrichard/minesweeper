import { createBoard } from '../utils/gameUtils';

const DEFAULT_BOARD_SIZE = 10;

export const BOARD_SIZE_NUM_MINES_MAP = {
  8: 10,
  9: 10,
  10: 10,
  14: 40,
  15: 40,
  16: 40,
  22: 99,
};

export const getBoardSizes = () => Object.keys(BOARD_SIZE_NUM_MINES_MAP);

export const GameStatusTypes = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  LOST: 'LOST',
  WON: 'WON',
};

export const INITIAL_STATE = {
  board: createBoard(DEFAULT_BOARD_SIZE),
  boardSize: DEFAULT_BOARD_SIZE,
  numMines: BOARD_SIZE_NUM_MINES_MAP[DEFAULT_BOARD_SIZE],
  gameStatus: GameStatusTypes.INACTIVE,
};
