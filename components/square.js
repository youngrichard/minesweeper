import { useState } from 'react';

import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';
import { colorPalette } from '../utils/colorUtils';

import Flag from '../components/flag';
import Mine from '../components/mine';

const Square = ({ square }) => {
  const { gameStatus, numMines, numFlags } = useGameState();
  const dispatch = useGameDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const rules = (isDisabled, isHovered, value) => ({
    width: 40,
    height: 40,
    padding: 10,

    fontSize: 20,
    lineHeight: 1,
    textAlign: 'center',

    backgroundColor: isDisabled ? '#EEE' : (isHovered ? '#A9A9A9' : '#C4C4C4'),
    borderColor: (isHovered && !isDisabled) ? '#A9A9A9 #808080 #808080 #A9A9A9' : '#F2F2F2 #808080 #808080 #F2F2F2',
    borderStyle: 'solid',
    borderWidth: '4px',

    color: colorPalette[value],
    cursor: isDisabled ? 'initial' : 'pointer',
    transition: 'all 0.05s ease-in-out',
  });

  const onLeftClick = () => {
    if (gameStatus === GameStatusTypes.WON || gameStatus === GameStatusTypes.LOST || square.isFlagged || square.isRevealed) return;

    if (gameStatus === GameStatusTypes.INACTIVE) {
      dispatch({
        type: GameActionTypes.INITIALIZE_BOARD,
        payload: square,
      });
    } else if (gameStatus === GameStatusTypes.ACTIVE) {
      dispatch({
        type: GameActionTypes.REVEAL_SQUARE,
        payload: square,
      });
    }
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if ((numMines - numFlags === 0) && !square.isFlagged) return;

    if (gameStatus === GameStatusTypes.ACTIVE && !square.isRevealed) {
      dispatch({
        type: GameActionTypes.TOGGLE_FLAG,
        payload: square,
      });
    }
  }

  const renderContent = square => {
    if (square.isFlagged) return <Flag />;

    if (square.isRevealed) {
      if (square.isMine) return <Mine />;
      if (square.numNeighboringMines !== 0) return square.numNeighboringMines;
    }
  }

  const isDisabled = square => {
    if (square.isMine || square.isFlagged) return false;
    return square.isRevealed;
  }

  return (
    <div
      style={rules(isDisabled(square), isHovered, square.numNeighboringMines)}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
      onMouseEnter={() => {
        if (square.isFlagged || (square.isMine && square.isRevealed)) return;
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}>
      {renderContent(square)}
    </div>
  );
}

export default Square;
