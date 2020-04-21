import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';

import Flag from '../components/flag';
import Mine from '../components/mine';

const Square = ({ square }) => {
  const { gameStatus } = useGameState();
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
    if (gameStatus === GameStatusTypes.WON || gameStatus === GameStatusTypes.LOST || square.isFlagged || square.isRevealed) return;

    if (gameStatus === GameStatusTypes.INACTIVE) {
      dispatch({
        type: GameActionTypes.INITIALIZE_BOARD,
        payload: square,
      });
    }

    dispatch({
      type: GameActionTypes.REVEAL_SQUARE,
      payload: square,
    });
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if (gameStatus === GameStatusTypes.ACTIVE && !square.isRevealed) {
      dispatch({
        type: GameActionTypes.TOGGLE_FLAG,
        payload: square,
      });
    }
  }

  return (
    <div style={rules()} onClick={onLeftClick} onContextMenu={onRightClick}>
      {square.isFlagged && <Flag />}
      {square.isRevealed && (square.isMine ? <Mine /> : square.numNeighboringMines)}
    </div>
  );
}

export default Square;
