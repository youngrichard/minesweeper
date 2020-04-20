import { GameProvider, useGameState } from '../contexts/gameContext';

import BoardSizer from '../components/boardSizer';
import RestartButton from '../components/restartButton';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';

const App = () => {
  const { board, boardSize } = useGameState();

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
