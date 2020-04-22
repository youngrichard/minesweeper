import { useState } from 'react';

import { useGameDispatch } from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';

/**
 * Resets board for new game
 */

const RestartButton = () => {
  const dispatch = useGameDispatch();
  const [isPressed, setIsPressed] = useState(false);

  const rules = (isPressed) =>({
    boxShadow: isPressed
      ? '#868A8E 0px 0px 0px 1px inset, #000 0px 0px 0px 1px'
      : '#FFF 1px 1px 0px 1px inset, #868A8E 0px 0px 0px 1px inset, #000 1px 1px 0px 0px',
    padding: isPressed ? '8px 20px 4px' : '7px 20px 5px',
    outline: isPressed ? '#000 dotted 1px' : 'none',
    outlineOffset: isPressed ? '-5px' : 'initial',

    backgroundColor: '#C3C7CB',
    borderStyle: 'none',
    fontSize: '12px',
  });

  const onClickHandler = () => dispatch({ type: GameActionTypes.RESET_BOARD });

  return (
    <button
      style={rules(isPressed)}
      onClick={onClickHandler}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}>
        Restart
      </button>
  );
}

export default RestartButton;
