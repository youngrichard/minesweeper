import { useGameState, useGameDispatch } from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';

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

    console.log('REVEAL SQUARE');
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    console.log('TOGGLE FLAG');
  }

  return (
    <div style={rules()} onClick={onLeftClick} onContextMenu={onRightClick}>
      {element.isMine ? '*' : element.adjacentMineCount}
    </div>
  );
}

export default Square;
