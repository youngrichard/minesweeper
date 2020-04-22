import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';

import {
  checkActiveGameStatus,
  countFlags,
  createBlankBoard,
  populateBoard,
  revealAllFields,
  revealField,
  toggleFlag,
} from '../utils/gameUtils';

const gameReducer = (state, action) => {
  switch (action.type) {
    case GameActionTypes.CHANGE_BOARD_SIZE: {
      const boardSize = action.payload;

      return {
        ...state,
        boardSize,
        board: createBlankBoard(boardSize),
        numMines: BOARD_SIZE_NUM_MINES_MAP[boardSize],
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.RESET_BOARD: {
      const { boardSize } = state;

      return {
        ...state,
        board: createBlankBoard(boardSize),
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.POPULATE_BOARD: {
      const coordinates = action.payload;
      const {
        board,
        boardSize,
        numMines,
      } = state;

      const tempBoard = populateBoard(board, boardSize, numMines, coordinates);
      const newBoard = revealField(tempBoard, boardSize, coordinates);

      return {
        ...state,
        board: newBoard,
        numFlags: 0,
        gameStatus: GameStatusTypes.ACTIVE,
      };
    }

    case GameActionTypes.TOGGLE_FLAG: {
      const { board } = state;
      const coordinates = action.payload;

      const newBoard = toggleFlag(board, coordinates);
      const numFlags = countFlags(newBoard);

      return {
        ...state,
        board: newBoard,
        numFlags,
      };
    }

    case GameActionTypes.REVEAL_FIELD: {
      const { board, boardSize } = state;
      const coordinates = action.payload;

      const newBoard = revealField(board, boardSize, coordinates);
      const gameStatus = checkActiveGameStatus(newBoard, boardSize)

      return {
        ...state,
        board: newBoard,
        gameStatus,
      };
    }

    case GameActionTypes.GAME_OVER: {
      const { board } = state;

      return {
        ...state,
        board: revealAllFields(board),
      };
    }

    default: {
      return state;
    }
  }
};

export default gameReducer;
