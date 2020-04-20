import GameActionTypes from '../actions/gameActions';
import { BOARD_SIZE_MINE_COUNT_MAP } from '../constants/gameConstants';
import { createBoard, initializeBoard } from '../utils/boardUtils';

const gameReducer = (state, action) => {
  switch (action.type) {
    case GameActionTypes.CHANGE_BOARD_SIZE: {
      return {
        ...state,
        boardSize: action.payload,
        mineCount: BOARD_SIZE_MINE_COUNT_MAP[action.payload],
        isGameInProgress: false,
      };
    }

    case GameActionTypes.RESET_BOARD: {
      return {
        ...state,
        board: createBoard(state.boardSize),
        isGameInProgress: false,
      };
    }

    case GameActionTypes.INITIALIZE_BOARD: {
      const origin = action.payload;

      return {
        ...state,
        board: initializeBoard(state.board, state.boardSize, state.mineCount, origin),
        isGameInProgress: true,
      };
    }

    case GameActionTypes.TOGGLE_FLAG: {
      const {x, y} = action.payload;
      state.board[x][y].isFlagged = !state.board[x][y].isFlagged;

      return {
        ...state,
        board: state.board,
      }
    }

    case GameActionTypes.REVEAL_SQUARE: {
      const {x, y} = action.payload;
      state.board[x][y].isRevealed = true;

      return {
        ...state,
        board: state.board,
      }
    }

    default: {
      return state;
    }
  }
};

export default gameReducer;
