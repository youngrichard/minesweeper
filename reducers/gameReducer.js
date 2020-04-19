import gameActionTypes from '../actions/gameActions';
import { BOARD_SIZE_MINE_COUNT_MAP } from '../constants/gameConstants';

const gameReducer = (state, action) => {
  switch (action.type) {
    case gameActionTypes.changeBoardSize:
      return {
        ...state,
        boardSize: action.payload,
        mineCount: BOARD_SIZE_MINE_COUNT_MAP[action.payload],
      }
    default:
      return state;
  }
};

export default gameReducer;
