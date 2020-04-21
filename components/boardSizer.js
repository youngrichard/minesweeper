import GameActionTypes from '../actions/gameActions';
import { getBoardSizes } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';

const BoardSizer = () => {
  const { boardSize } = useGameState();
  const dispatch = useGameDispatch();

  const onChangeHandler = event => {
    dispatch({
      type: GameActionTypes.CHANGE_BOARD_SIZE,
      payload: Number(event.target.value),
    });

    dispatch({ type: GameActionTypes.RESET_BOARD });
  }

  return (
    <select value={boardSize} onChange={onChangeHandler}>
      {getBoardSizes().map((size, i) => <option key={i} value={size}>{size}</option>)}
    </select>
  );
};

export default BoardSizer;
