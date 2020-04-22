import { useState } from 'react';

import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';
import { colors } from '../utils/colorUtils';

import Flag from '../components/flag';
import Mine from '../components/mine';

const Square = ({ field }) => {
  const {
    gameStatus,
    numMines,
    numFlags,
  } = useGameState();
  const dispatch = useGameDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const coordinates = {
    x: field.x,
    y: field.y,
  };

  const rules = (isDisabled, isHovered, num) => ({
    width: 40,
    height: 40,
    padding: 10,

    color: colors[num],
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 1,

    backgroundColor: isDisabled ? '#EEE' : (isHovered ? '#A9A9A9' : '#C4C4C4'),
    borderColor: (isHovered && !isDisabled) ? '#A9A9A9 #808080 #808080 #A9A9A9' : '#F2F2F2 #808080 #808080 #F2F2F2',
    borderStyle: 'solid',
    borderWidth: '4px',

    cursor: isDisabled ? 'initial' : 'pointer',
    transition: 'all 0.05s ease-in-out',
  });

  const onLeftClick = () => {
    if (gameStatus === GameStatusTypes.WON || gameStatus === GameStatusTypes.LOST || field.isFlagged || field.isRevealed) return;

    if (gameStatus === GameStatusTypes.INACTIVE) {
      dispatch({
        type: GameActionTypes.POPULATE_BOARD,
        payload: coordinates,
      });
      return;
    }

    dispatch({
      type: GameActionTypes.REVEAL_FIELD,
      payload: coordinates,
    });
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    if ((numMines - numFlags === 0) && !field.isFlagged) return;

    if (gameStatus === GameStatusTypes.ACTIVE && !field.isRevealed) {
      dispatch({
        type: GameActionTypes.TOGGLE_FLAG,
        payload: coordinates,
      });
    }
  }

  const onHover = () =>{
    if (field.isFlagged || (field.isMine && field.isRevealed)) return;
    setIsHovered(true);
  }

  const isDisabled = field => {
    if (field.isMine || field.isFlagged) return false;
    return field.isRevealed;
  }

  const renderContent = field => {
    if (field.isFlagged) return <Flag />;

    if (field.isRevealed) {
      if (field.isMine) return <Mine />;
      if (field.numNeighboringMines !== 0) return field.numNeighboringMines;
    }
  }

  return (
    <div
      style={rules(isDisabled(field), isHovered, field.numNeighboringMines)}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
      onMouseEnter={onHover}
      onMouseLeave={() => setIsHovered(false)}>
      {renderContent(field)}
    </div>
  );
}

export default Square;
