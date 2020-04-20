import GameActionTypes from '../actions/gameActions';
import { BOARD_SIZE_MINE_COUNT_MAP } from '../constants/gameConstants';
import { createBoard, initializeBoard } from '../utils/boardUtils';

const gameReducer = (state, action) => {
  switch (action.type) {
    case GameActionTypes.CHANGE_BOARD_SIZE:
      return {
        ...state,
        boardSize: action.payload,
        mineCount: BOARD_SIZE_MINE_COUNT_MAP[action.payload],
      };

    case GameActionTypes.RESET_BOARD:
      return {
        ...state,
        board: createBoard(state.boardSize),
      };

    case GameActionTypes.INITIALIZE_BOARD:
      return {
        ...state,
        board: initializeBoard(state.board, state.boardSize, state.mineCount),
        isGameInProgress: true,
      };

    default:
      return state;
  }
};

export default gameReducer;
