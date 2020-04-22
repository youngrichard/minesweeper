import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';

import {
  checkActiveGameStatus,
  countFlags,
  createBoard,
  initializeBoard,
  revealAllSquares,
  revealSquare,
  toggleFlag,
} from '../utils/gameUtils';

const gameReducer = (state, action) => {
  switch (action.type) {
    case GameActionTypes.CHANGE_BOARD_SIZE: {
      const boardSize = action.payload;

      return {
        ...state,
        board: createBoard(boardSize),
        boardSize,
        numMines: BOARD_SIZE_NUM_MINES_MAP[boardSize],
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.RESET_BOARD: {
      const { boardSize } = state;

      return {
        ...state,
        board: createBoard(boardSize),
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.INITIALIZE_BOARD: {
      const clickedSquare = action.payload;
      const {
        board,
        boardSize,
        numMines,
      } = state;

      const initBoard = initializeBoard(board, boardSize, numMines, clickedSquare);
      const newBoard = revealSquare(initBoard, boardSize, clickedSquare);

      return {
        ...state,
        board: newBoard,
        numFlags: 0,
        gameStatus: GameStatusTypes.ACTIVE,
      };
    }

    case GameActionTypes.TOGGLE_FLAG: {
      const { board } = state;
      const clickedSquare = action.payload;

      const newBoard = toggleFlag(board, clickedSquare);
      const numFlags = countFlags(newBoard);

      return {
        ...state,
        board: newBoard,
        numFlags,
      };
    }

    case GameActionTypes.REVEAL_SQUARE: {
      const { board, boardSize } = state;
      const clickedSquare = action.payload;

      const newBoard = revealSquare(board, boardSize, clickedSquare);
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
        board: revealAllSquares(board),
      };
    }

    default: {
      return state;
    }
  }
};

export default gameReducer;
