import { createComponent } from 'cf-style-container';

const Desk = createComponent(({ boardSize }) => ({
  width: 40 * boardSize + 2,
  height: 40 * boardSize + 2,
  display: 'flex',
  flexWrap: 'wrap',
  margin: '40px auto',
}));

export default Desk;
