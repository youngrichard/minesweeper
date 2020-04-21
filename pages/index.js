import { useEffect } from 'react';

import {
  GameProvider,
  useGameState,
  useGameDispatch,
} from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';

import RestartButton from '../components/restartButton';
import BoardSizer from '../components/boardSizer';
import Layout from '../components/layout';
import Square from '../components/square';
import Desk from '../components/desk';

const App = () => {
  const {
    board,
    boardSize,
    gameStatus,
  } = useGameState();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (gameStatus === GameStatusTypes.WON || gameStatus === GameStatusTypes.LOST) {
      dispatch({ type: GameActionTypes.GAME_OVER });
    }
  }, [gameStatus]);

  return (
    <Layout title="Minesweeper">
      <BoardSizer />
      <RestartButton />
      <Desk boardSize={boardSize}>
        {board.map((row, x) =>
          row.map((square, y) =>
            <Square key={x + ',' + y} square={square} />
          )
        )}
      </Desk>
    </Layout>
  );
}

const Index = () => {
  // This allows us to wrap our App within the GameProvider
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}

export default Index;
