import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { BOARD_SIZE_NUM_MINES_MAP } from '../constants/gameConstants';
import { createBoard, initializeBoard, revealAllAdjacentSquares, checkActiveGameStatus } from '../utils/boardUtils';

const gameReducer = (state, action) => {
  switch (action.type) {
    case GameActionTypes.CHANGE_BOARD_SIZE: {
      return {
        ...state,
        boardSize: action.payload,
        numMines: BOARD_SIZE_NUM_MINES_MAP[action.payload],
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.RESET_BOARD: {
      return {
        ...state,
        board: createBoard(state.boardSize),
        gameStatus: GameStatusTypes.INACTIVE,
      };
    }

    case GameActionTypes.INITIALIZE_BOARD: {
      const origin = action.payload;

      return {
        ...state,
        board: initializeBoard(state.board, state.boardSize, state.numMines, origin),
        gameStatus: GameStatusTypes.ACTIVE,
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
      let { board, boardSize } = state;
      const { x, y } = action.payload;

      const element = board[x][y];
      element.isRevealed = true;

      if (element.adjacentMineCount === 0) {
        board = revealAllAdjacentSquares(board, boardSize, x, y);
      }

      return {
        ...state,
        board,
        gameStatus: checkActiveGameStatus(board, boardSize),
      };
    }

    case GameActionTypes.GAME_OVER: {
      const { board } = state;
      board.forEach(row => {
        row.forEach(element => {
          if (element.isMine) element.isRevealed = true;
        });
      });

      return {
        ...state,
        board,
      }
    }

    default: {
      return state;
    }
  }
};

export default gameReducer;
