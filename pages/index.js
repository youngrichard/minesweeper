import {
  GameProvider,
  useGameState,
  useGameDispatch,
} from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';

import BoardSizer from '../components/boardSizer';
import RestartButton from '../components/restartButton';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

const App = () => {
  const {
    boardSize,
    isGameInProgress,
  } = useGameState();
  const dispatch = useGameDispatch();

  const onLeftClick = () => {
    if (!isGameInProgress) {
      dispatch({ type: GameActionTypes.INITIALIZE_BOARD });
    }

    console.log('REVEAL SQUARE');
  }

  const onRightClick = e => {
    e.preventDefault();
    e.stopPropagation();

    console.log('TOGGLE FLAG');
  }

  return (
    <Layout title={`Minesweeper (active)`}>
      <BoardSizer />
      <RestartButton />
      <Desk boardSize={boardSize}>
        {[...Array(boardSize ** 2).keys()].map(i => (
          <Square key={i} onClick={onLeftClick} onContextMenu={onRightClick} />
        ))}
      </Desk>
    </Layout>
  );
}

const Index = () => {
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}

export default Index;
