import gameActionTypes from '../actions/gameActions';

import { BOARD_SIZE_MINE_COUNT_MAP } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';

const Resizer = () => {
  const { boardSize } = useGameState();
  const dispatch = useGameDispatch();

  const onChangeHandler = event => dispatch({
    type: gameActionTypes.changeBoardSize,
    payload: event.target.value,
  });

  return (
    <select value={boardSize} onChange={onChangeHandler}>
      {Object.keys(BOARD_SIZE_MINE_COUNT_MAP).map((size, i) => <option key={i} value={size}>{size}</option>)}
    </select>
  );
};

export default Resizer;
