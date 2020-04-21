import { useGameDispatch } from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';

/**
 * Resets board for new game
 */

const RestartButton = () => {
  const dispatch = useGameDispatch();

  const onClickHandler = () => dispatch({ type: GameActionTypes.RESET_BOARD });

  return (
    <button onClick={onClickHandler}>Restart</button>
  );
}

export default RestartButton;
