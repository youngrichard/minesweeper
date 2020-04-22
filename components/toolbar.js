import BoardSizer from './boardSizer';
import RestartButton from './restartButton';

const Toolbar = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      width: '100%',
      margin: '0 auto',
      padding: '30px 0',
    }}>
      <BoardSizer />
      <RestartButton />
    </div>
  );
}

export default Toolbar;
