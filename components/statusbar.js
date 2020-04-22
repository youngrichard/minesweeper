import { useGameState } from '../contexts/gameContext';
import { GameStatusTypes } from '../constants/gameConstants';

const Statusbar = () => {
  const {
    numMines,
    numFlags,
    gameStatus,
  } = useGameState();

  return (
    <div style={{
      width: '100%',
      padding: '20px 0',
      margin: '0 auto',
    }}>
      {gameStatus === GameStatusTypes.INACTIVE &&
        <h3 style={{ textAlign: 'left' }}>
          Left-click to start
        </h3>}
      {gameStatus === GameStatusTypes.ACTIVE &&
        <h3 style={{ textAlign: 'left' }}>
          {numMines - numFlags} flags remaining
        </h3>}
      {gameStatus === GameStatusTypes.WON &&
        <h1 style={{ color: '#00BDAA', fontStyle: 'italic' }}>
          You win!
        </h1>}
      {gameStatus === GameStatusTypes.LOST &&
        <h1 style={{ color: '#FE346E', fontStyle: 'italic' }}>
          You lose...
        </h1>}
    </div>
  );
}

export default Statusbar;
