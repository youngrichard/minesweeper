import { GameProvider, useGameState } from '../contexts/gameContext';

import Resizer from '../components/resizer';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';

const App = () => {
  const { boardSize, mineCount } = useGameState();

  return (
    <Layout title={`Minesweeper (active)`}>
      <Resizer />
      <Desk boardSize={boardSize}>
        {[...Array(boardSize ** 2)].map(i => (
          <Square key={i} />
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
