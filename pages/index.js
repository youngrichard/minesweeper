import { GameProvider, useGameState } from '../contexts/gameContext';

import BoardResizer from '../components/boardResizer';
import Layout from '../components/layout';
import Desk from '../components/desk';
import Square from '../components/square';
import Mine from '../components/mine';
import Flag from '../components/flag';

const Index = () => {
  const { boardSize } = useGameState();

  return (
    <GameProvider>
      <Layout title={`Minesweeper (active)`}>
        <BoardResizer />
        <Desk boardSize={boardSize}>
          {[...Array(boardSize ** 2).keys()].map(i => (
            <Square key={i} disabled={i === 55 || i === 10}>
              {i === 10 && <Mine />}
              {i === 25 && <Flag />}
              {i === 77 ? '4' : ''}
            </Square>
          ))}
        </Desk>
      </Layout>
    </GameProvider>
  );
}

export default Index;
