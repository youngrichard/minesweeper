import gameActionTypes from '../actions/gameActions';

const gameReducer = (state, action) => {
  switch (action.type) {
    case gameActionTypes.changeBoardSize:
      return {
        ...state,
        boardSize: action.payload,
      }
    default:
      return state;
  }
};

export default gameReducer;
