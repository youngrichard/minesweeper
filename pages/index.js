import { useEffect } from 'react';

import {
  GameProvider,
  useGameState,
  useGameDispatch,
} from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';

import Toolbar from '../components/toolbar';
import Statusbar from '../components/statusbar';
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
    <Layout>
      <Desk boardSize={boardSize}>
        <Toolbar />
        {board.map((row, x) =>
          row.map((square, y) =>
            <Square
              key={x + ',' + y}
              square={square}
            />
          )
        )}
        <Statusbar />
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
