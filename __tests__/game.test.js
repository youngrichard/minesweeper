import { cloneDeep } from 'lodash';

import {
  DEFAULT_BOARD_SIZE,
  DEFAULT_FIELD_PROPS,
  BOARD_SIZE_NUM_MINES_MAP,
} from '../constants/gameConstants';

import {
  createBlankBoard,
  plantMines,
} from '../utils/gameUtils';

describe('Game functions', () => {
  const blankBoard = createBlankBoard(DEFAULT_BOARD_SIZE);

  it('Creates a square board for a given size', () => {
    let length = 0;

    for (let x = 0; x < blankBoard.length; x++) {
      for (let y = 0; y < blankBoard[x].length; y++) {
        length++;
      }
    }

    expect(length).toBe(DEFAULT_BOARD_SIZE ** 2);
  });

  it('Field has the correct properties', () => {
    expect(Object.keys(blankBoard[0][0])).toEqual(Object.keys(DEFAULT_FIELD_PROPS));
  });

  it('Plants the correct number of mines', () => {
    const tempBoard = cloneDeep(blankBoard);
    const mineField = plantMines(tempBoard);
    let mineCount = 0;

    for (let x = 0; x < mineField.length; x++) {
      for (let y = 0; y < mineField[x].length; y++) {
        if (mineField[x][y].isMine) mineCount++
      }
    }

    expect(mineCount).toBe(BOARD_SIZE_NUM_MINES_MAP[DEFAULT_BOARD_SIZE]);
  });
});
