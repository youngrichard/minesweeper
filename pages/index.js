import { useEffect } from 'react';

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

const App = () => {
  const {
    board,
    boardSize,
    isGameLost,
  } = useGameState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (isGameLost) dispatch({ type: GameActionTypes.GAME_OVER });
  }, [isGameLost])

  return (
    <Layout title={`Minesweeper (active)`}>
      <BoardSizer />
      <RestartButton />
      <Desk boardSize={boardSize}>
        {board.map((row, x) =>
          row.map((element, y) =>
            <Square
              key={x + y}
              element={element}
              x={x}
              y={y}
            />
          )
        )}
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
