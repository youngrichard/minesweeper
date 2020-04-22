import BoardSizer from './boardSizer';
import RestartButton from './restartButton';

const Toolbar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

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
