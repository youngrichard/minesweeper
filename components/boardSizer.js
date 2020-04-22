import GameActionTypes from '../actions/gameActions';
import { getBoardSizes } from '../constants/gameConstants';
import { useGameState, useGameDispatch } from '../contexts/gameContext';

/**
 * Changes board size
 */

const BoardSizer = () => {
  const { boardSize } = useGameState();
  const dispatch = useGameDispatch();

  const selectRules = () => ({
    width: '100%',
    padding: '3px',

    borderTop: '1px solid #868A8E',
    borderLeft: '1px solid #868A8E',
    borderStyle: 'solid none none solid',
    borderRadius: '0px',

    boxShadow: '#C3C7CB -1px -1px 0px 0px inset, #000 1px 1px 0px 0px inset, #FFF 0.5px 0.5px 0px 0.5px',
    WebkitAppearance: 'none',
  });

  const chevronRules = () => ({
    width: '20px',
    height: '20px',
    padding: '6px',
    fontSize: '8px',

    position: 'absolute',
    top: '2px',
    right: '0',

    backgroundColor: '#C3C7CB',
    borderRight: '1px solid',
    borderBottom: '1px solid',

    boxShadow: '#C3C7CB 0.5px 0.7px 0px 0.7px inset, #868A8E -1px 0px 0px 1px inset, #FFF 1.5px 1.5px 0px 1.5px inset',
    pointerEvents: 'none',
  });

  const onChangeHandler = event => {
    dispatch({
      type: GameActionTypes.CHANGE_BOARD_SIZE,
      payload: Number(event.target.value),
    });
  }

  return (
    <div style={{
      width: '80px',
      height: '20px',
      position: 'relative',
    }}>
      <select value={boardSize} onChange={onChangeHandler} style={selectRules()}>
        {getBoardSizes().map((size, i) => <option key={i} value={size}>{size}</option>)}
      </select>
      <div style={chevronRules()}>&#9660;</div>
    </div>
  );
};

export default BoardSizer;
