import gameActionTypes from '../actions/gameActions';

import { BOARD_SIZES } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';

const BoardResizer = () => {
  const { boardSize } = useGameState();
  const dispatch = useGameDispatch();

  const onChangeHandler = event => dispatch({
    type: gameActionTypes.changeBoardSize,
    payload: event.target.value,
  });

  return (
    <select value={boardSize} onChange={onChangeHandler}>
      {BOARD_SIZES.map(size => <option value={size}>{size}</option>)}
    </select>
  );
};

export default BoardResizer;
