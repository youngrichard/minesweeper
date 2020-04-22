import { useEffect } from 'react';

import {
  GameProvider,
  useGameState,
  useGameDispatch,
} from '../contexts/gameContext';
import GameActionTypes from '../actions/gameActions';
import { GameStatusTypes } from '../constants/gameConstants';

import Statusbar from '../components/statusbar';
import Toolbar from '../components/toolbar';
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
          row.map((field, y) =>
            <Square
              key={x + ',' + y}
              field={field}
            />
          )
        )}
        <Statusbar />
      </Desk>
    </Layout>
  );
}

const Index = () => {
  // This allows our App to consume the game context
  return (
    <GameProvider>
      <App />
    </GameProvider>
  );
}

export default Index;
