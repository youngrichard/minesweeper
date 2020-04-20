import { useGameState, useGameDispatch } from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';

import Flag from '../components/flag';
import Mine from '../components/mine';

const Square = ({ element, x, y }) => {
  const { isGameInProgress } = useGameState();
  const dispatch = useGameDispatch();

  const rules = (disabled = false) => ({
    width: 40,
    height: 40,
    padding: 10,
    cursor: disabled ? 'initial' : 'pointer',
    backgroundColor: disabled ? '#CCC' : '#FFF',
    border: `1px solid black`,
    lineHeight: 1,
    textAlign: 'center',
    fontSize: 18
  });

  const onLeftClick = () => {
    if (!isGameInProgress) {
      dispatch({
        type: GameActionTypes.INITIALIZE_BOARD,
        payload: {x, y},
      });
    }

    if (element.isFlagged || element.isRevealed) return;

    dispatch({
      type: GameActionTypes.REVEAL_SQUARE,
      payload: {x, y},
    });
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (isGameInProgress && !element.isRevealed) {
      dispatch({
        type: GameActionTypes.TOGGLE_FLAG,
        payload: {x, y},
      });
    }
  }

  return (
    <div style={rules()} onClick={onLeftClick} onContextMenu={onRightClick}>
      {element.isFlagged && <Flag />}
      {element.isRevealed && (element.isMine ? <Mine /> : element.adjacentMineCount)}
    </div>
  );
}

export default Square;
